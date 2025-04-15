import React, { useEffect } from 'react';
import { Input, Button, Form, Col, Row, Drawer, FormInstance } from 'antd';
import { RoleModel } from '../../models/roleModel';

interface UserFormProps {
    form: FormInstance
    open: boolean;
    isNew: boolean;
    targetRole: RoleModel | null;
    hideDrawer: () => void;
    onFinish: (values: any) => void;
}
const RoleForm: React.FC<UserFormProps> = ({ form, open, isNew, targetRole, hideDrawer, onFinish }) => {
    useEffect(() => {
        if (targetRole != null) {
            form.setFieldsValue({
                ...targetRole,
            });
        } else {
            form.resetFields();
        }
    }, [targetRole]);

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Drawer
                title={isNew ? "新增角色" : "编辑角色"}
                width={360}
                open={open}
                onClose={hideDrawer}
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
                                label="角色名"
                                rules={[{ required: true, message: '请输入新角色名' }]}
                            >
                                <Input placeholder="请输入新角色名" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="memo"
                                label="备注"
                            >
                                <Input.TextArea placeholder="请输入备注" />
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
                            <Button onClick={hideDrawer}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default RoleForm;