import React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Flex, theme } from 'antd';
import { routes } from '../router/routes';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';
import './mainLayout.css';
import AvatarComponent from '../components/avatar';
import { useEffect } from 'react';
import { RouteModel } from '../models/routeModel';

const { Header, Content, Sider } = Layout;


const MainLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('userinfo');

    const getLeafRoutes = (routeConfig: RouteModel[]): RouteModel[] => {
        return routeConfig.flatMap(route => {
            if (route.children && route.children.length > 0) {
                return getLeafRoutes(route.children);
            }
            return [route];
        });
    };
    const leafRouters = getLeafRoutes(routes)

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [navigate]);

    const breadcrumbItems = leafRouters
        .filter(r => location.pathname == r.path || r.children?.some(c => location.pathname == c.path))
        .map(r => ({
            title: (
                <span style={{ cursor: 'pointer' }} onClick={() => navigate(r.path)}>
                    {r.title}
                </span>
            ),
        }));

    const menus: MenuProps['items'] = routes.map((route) => {
        const item: any = {
            key: route.key,
            icon: route.icon,
            label: route.title,
            onClick: () => !route.children && navigate(route.path),
        };

        if (route.children && route.children.length > 0) {
            item.children = route.children.map((subRoute) => ({
                key: subRoute.key,
                icon: subRoute.icon,
                label: subRoute.title,
                onClick: () => navigate(subRoute.path),
            }));
        }

        return item;
    });

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header >
                <Flex>
                    <div className="header-left" >
                        <img className='header-logo' src={logo}></img>
                        <label className='logo-system-name'>用户管理系统</label>
                    </div>
                    {currentUser && <div className="header-right" >
                        <AvatarComponent />
                    </div>}
                </Flex>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menus}
                    />
                </Sider>
                <Layout style={{ padding: '0 12px 12px 12px' }}>
                    <Breadcrumb
                        items={breadcrumbItems}
                        style={{ margin: '16px 0' }}
                    />
                    <Content
                        style={{
                            padding: 14,
                            margin: 0,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1, overflow: 'auto'
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;