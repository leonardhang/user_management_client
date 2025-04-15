import React, { useEffect } from 'react';
import { Input, Button, Form, Col, Row, Select, DatePicker, Drawer, FormInstance, Switch } from 'antd';
import { UserListModel } from '../../models/userModel';
import dayjs from 'dayjs';

interface EditUserFormProps {
    form: FormInstance
    open: boolean;
    editUser: UserListModel | null;
    hideEditUserDrawer: () => void;
    onFinish: (values: any) => void;
}
const EditUserForm: React.FC<EditUserFormProps> = ({ form, open, editUser, hideEditUserDrawer, onFinish }) => {
    useEffect(() => {
        if (editUser) {
          form.setFieldsValue({
            ...editUser,
            birthday: editUser.birthday ? dayjs(editUser.birthday) : null,
            gender: editUser?.gender !== undefined ? String(editUser.gender) : '1'
          });
        } else {
          form.resetFields();
        }
      }, [editUser]);

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Drawer
                title="编辑用户"
                width={360}
                open={open}
                onClose={hideEditUserDrawer}
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
                                initialValue={editUser?.name}
                                rules={[{ required: true, message: '用户姓名不能为空' }]}
                            >
                                <Input placeholder="请输入用户姓名" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="nickName"
                                label="昵称"
                                initialValue={editUser?.nickName}
                            >
                                <Input placeholder="请输入用户昵称" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="phoneNumber"
                                label="电话"
                                initialValue={editUser?.phoneNumber}
                            >
                                <Input type='number' placeholder="请输入用户电话" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="gender"
                                label="性别"
                                initialValue={editUser?.gender !== undefined ? String(editUser.gender) : '1'}
                            >
                                <Select placeholder="请选择用户性别">
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
                                initialValue={editUser?.birthday ? dayjs(editUser.birthday) : null}
                            >
                                <DatePicker style={{ width: '100%' }} getPopupContainer={(trigger) => trigger.parentElement!} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="status"
                                label="状态"
                                initialValue={editUser?.status}
                            >
                                <Switch />
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
                            <Button onClick={hideEditUserDrawer}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default EditUserForm;