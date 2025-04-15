import { useState } from 'react';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { registry } from '../../services/authService';

type FieldType = {
    username?: string;
    password?: string;
    phonenumber?: string;
};

interface ChildComponentProps {
    onRegistrySuccess: () => void;
}

const RegistryForm: React.FC<ChildComponentProps> = ({ onRegistrySuccess }) => {
    const [phonenumber, setPhoneNumber] = useState('');
    const [registryStatus, setRegistryStatus] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            setPhoneNumber(newValue);
        }
    }

    const onFinish = (values: any) => {
        registry(values.username, values.password, phonenumber).then(() => {
            setRegistryStatus(true);
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
                name="registry"
                labelAlign='left'
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

                <Form.Item<FieldType>
                    name="phonenumber"
                    rules={[{ required: false }]}
                >
                    <Input prefix={<PhoneOutlined />} type='number' value={phonenumber} onChange={handleChange} placeholder='手机号' />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button className='btn-submit' type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
                {
                    registryStatus && <Form.Item style={{ textAlign: 'center' }}>
                        <a onClick={onRegistrySuccess} >已注册成功，去登录吧！</a>
                    </Form.Item>
                }

            </Form>
        </>
    );
};

export default RegistryForm;