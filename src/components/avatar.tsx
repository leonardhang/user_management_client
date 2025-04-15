import boy from '../assets/boy.png';
import { MenuProps, Dropdown, Space } from 'antd';
import { LogoutOutlined, InfoOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AvatarComponent: React.FC = () => {
    const currentUser = JSON.parse(localStorage.getItem('userinfo') || '');
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <label style={{ cursor: 'pointer' }}>
                    个人中心
                </label>
            ),
            icon: <InfoOutlined />,
            onClick: () => console.log('个人中心'),
        },
        {
            key: '2',
            label: (
                <label style={{ cursor: 'pointer' }}>
                    退出登录
                </label>
            ),
            icon: <LogoutOutlined />,
            onClick: () => {
                localStorage.removeItem('userinfo');
                localStorage.removeItem('token');
                navigate('/login');
            }
        },
    ];

    return (
        <>
            <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {currentUser && <img src={boy} alt="Default Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />}
                            <span style={{ marginLeft: '10px', color: '#FFFFFF' }}>{currentUser && currentUser.name}</span>
                        </div>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>

        </>
    );
};

export default AvatarComponent;