import React, { useState } from 'react';
import { Input, Button, Form, Col, Row, Select, DatePicker, Drawer, FormInstance, TreeSelect, TreeDataNode } from 'antd';

interface UserFormProps {
    form: FormInstance
    open: boolean;
    departmentTree: TreeDataNode[] | [];
    hideAddUserDrawer: () => void;
    onFinish: (values: any) => void;
}
const NewUserForm: React.FC<UserFormProps> = ({ form, open, departmentTree, hideAddUserDrawer, onFinish }) => {
    const [topDepValue, setValue] = useState<number>(1);

    const onChange = (newValue: number) => {
        setValue(topDepValue);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Drawer
                title="新增用户"
                width={360}
                open={open}
                onClose={hideAddUserDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="姓名"
                                rules={[{ required: true, message: '请输入新用户姓名' }, { whitespace: true, message: '用户名不能包含空格' }]}
                            >
                                <Input placeholder="请输入新用户姓名" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="nickName"
                                label="昵称"
                            >
                                <Input placeholder="请输入新用户昵称" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="phoneNumber"
                                label="电话"
                            >
                                <Input type='number' placeholder="请输入新用户电话" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="gender"
                                label="性别"
                                initialValue={'1'}
                            >
                                <Select placeholder="请选择新用户性别">
                                    <Select.Option value="1">男</Select.Option>
                                    <Select.Option value="0">女</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="birthday"
                                label="生日"
                            >
                                <DatePicker style={{ width: '100%' }} getPopupContainer={(trigger) => trigger.parentElement!} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="departmentId"
                                label="部门"
                                rules={[{ required: true, message: '请选择部门' }]}
                            >
                                <TreeSelect
                                    showSearch
                                    style={{ width: '100%' }}
                                    value={topDepValue}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    onChange={onChange}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                    treeData={departmentTree}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="password"
                                label="密码"
                                rules={[{ required: true, message: '请输入新用户密码' }, { min: 3, message: '密码最少3个字符' }, { pattern: /^[^\s]+$/, message: '不能包含空格' }]}
                            >
                                <Input.Password placeholder="请输入新用户密码" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="passwordConfirm"
                                label="确认密码"
                                rules={[{ required: true, message: '请再次确认新用户密码' }, ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次输入的密码不一致'));
                                    },
                                }),]}
                            >
                                <Input.Password placeholder="请再次输入新用户密码" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button onClick={hideAddUserDrawer}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default NewUserForm;