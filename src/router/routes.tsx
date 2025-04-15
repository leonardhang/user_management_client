// router/routes.tsx
import React, { lazy } from 'react';
import { RouteModel } from '../models/routeModel';
import { HomeOutlined, UserOutlined } from '@ant-design/icons'; 

const Home = lazy(() => import('../pages/home/home'));
const User = lazy(() => import('../pages/user/user'));
const Role = lazy(() => import('../pages/role/role'));
const Department = lazy(() => import('../pages/department/department'));

export const routes: RouteModel[] = [
  {
    key: '1',
    path: '/',
    title: '首页',
    icon: React.createElement(HomeOutlined),
    element: <Home />,
  },
  {
    key: '2',
    path: '/permission',
    title: '权限管理',
    icon: React.createElement(UserOutlined),
    children: [
      {
        key: '2-1',
        path: '/permission/user',
        title: '用户管理',
        element: <User />,
      },
      {
        key: '2-2',
        path: '/permission/role',
        title: '角色管理',
        element: <Role />,
      },
      {
        key: '2-3',
        path: '/permission/department',
        title: '部门管理',
        element: <Department />,
      },
    ],
  },
];
