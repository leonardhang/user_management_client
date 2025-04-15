import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
};

const LoginForm: React.FC = () => {
const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        login(values.username, values.password).then((res) => {
            console.log('Login successful!');
            localStorage.setItem('userinfo', JSON.stringify(res));
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <>
            <Form
                name="login"
                labelAlign='left'
                style={{ maxWidth: 360 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder='用户名' />
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='密码' />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Flex justify="space-between" align="center">
                        <Checkbox>Remember me</Checkbox>
                        <a href="" className='login-form-forgot'>忘记密码</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button className='btn-submit' type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;