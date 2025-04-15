import { useState} from 'react';
import LoginForm from './loginForm';
import RegistryForm from './registryForm';
import logo from '../../assets/logo.png';
import bgImage from '../../assets/bg_login.jpg';
import './login.css';

const LoginPage: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    return (
        <>
            <div className='login-container' style={{ backgroundImage: `url(${bgImage})` }}>
                <div className='login-form-container'>
                    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <img className='login-form-logo' src={logo}></img>
                        <div className='login-form-title'>用户管理系统</div>
                    </div>
                    {isLoginMode && <LoginForm></LoginForm>}
                    {!isLoginMode && <RegistryForm onRegistrySuccess={()=> setIsLoginMode(true)}></RegistryForm>}
                    <div className='login-form-footer'>
                        <a onClick={()=> setIsLoginMode(!isLoginMode)}>{isLoginMode ? '没有账号，注册一个吧' : '已有账号，快去登录吧'}</a>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginPage;