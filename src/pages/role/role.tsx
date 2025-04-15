import React, { useState, useEffect, ReactNode } from 'react';
import { Space, Table, Flex, Button, Form, notification } from 'antd';
import type { TableProps } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { RoleModel } from '../../models/roleModel';
import { addRole, deleteRole, getRoleListByPage, updateRole } from '../../services/roleService';
import RoleForm from './roleForm';
import DeleteRoleDialog from './deleteRoleDialog';

const RolePage: React.FC = () => {
    const [roleList, setRoleList] = useState<RoleModel[]>([]);
    const [isShowRoleDrawer, setIsShowRoleDrawer] = useState(false);
    const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);
    const [targetRole, setTargetRole] = useState<RoleModel | null>(null);
    const [isShowDeleteConfirmLoading, setIsShowDeleteConfirmLoading] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        total: 1,
        onChange: (page: number) => {
            fetchRoleList(page);
        }
    });

    const columns: TableProps<RoleModel>['columns'] = [
        {
            title: '角色',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            render: (name) => <label>{name}</label>,
        },
        {
            title: '备注',
            dataIndex: 'memo',
            key: 'memo',
            width: '70%',
            render: (memo) => <label>{memo}</label>,
        },
        {
            title: '操作',
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showEditRoleForm(record)}>编辑</a>
                    <a onClick={() => showDeleteRoleDialog(record)}>删除</a>
                </Space>
            ),
        },
    ];
    const [api, contextHolder] = notification.useNotification();
    const [roleForm] = Form.useForm();
    const fetchRoleList = async (page: number): Promise<void> => {
        try {
            const res = await getRoleListByPage(page);
            setPagination({
                ...pagination,
                current: page,
                total: res.totals,
            });
            setRoleList(res.data);
        } catch (error) {
            console.error('Error fetching role list:', error);
        }
    };
    useEffect(() => {
        fetchRoleList(1);
    }, []);

    const showRoleDrawer = () => {
        setIsNew(true);
        setIsShowRoleDrawer(true);
    }
    const hideRoleDrawer = () => {
        setIsShowRoleDrawer(false);
        roleForm.resetFields();
    }
    const showEditRoleForm = (record: RoleModel) => {
        setIsNew(false);
        setIsShowRoleDrawer(true);
        setTargetRole(record);
        console.log('Edit role:', record);
    }
    const saveRole = async (values: RoleModel) => {
        if (isNew) {
            const addResult = await addRole(values);
            if (addResult > 0) {
                setIsShowRoleDrawer(false);
                openNotification("添加角色成功", "", <SmileOutlined></SmileOutlined>);
                roleForm.resetFields();
                await fetchRoleList(pagination.current);

            } else {
                openNotification("添加角色失败", "请检查数据，重新再试一次。", <SmileOutlined></SmileOutlined>);
            }
        } else {
            if (targetRole) {
                targetRole.name = values.name;
                targetRole.memo = values.memo;
                const updateResult = await updateRole(targetRole);
                if (updateResult > 0) {
                    setIsShowRoleDrawer(false);
                    openNotification("编辑角色成功", "", <SmileOutlined></SmileOutlined>);
                    roleForm.resetFields();
                    await fetchRoleList(pagination.current);

                } else {
                    openNotification("编辑角色失败", "请检查数据，重新再试一次。", <SmileOutlined></SmileOutlined>);
                }
            }
        }

    }
    const showDeleteRoleDialog = (record: RoleModel) => {
        setIsShowDeleteDialog(true);
        setTargetRole(record);
        console.log('Delete role:', record);
    }
    const handleDelete = () => {
        console.log('Delete role:', targetRole);
        setIsShowDeleteConfirmLoading(true);
        deleteRole(targetRole!.id).then(res => {
            if (res > 0) {
                setIsShowDeleteConfirmLoading(false);
                setIsShowDeleteDialog(false);
                setTargetRole(null);
                openNotification("删除角色成功", "", <SmileOutlined></SmileOutlined>);
                fetchRoleList(pagination.current);
            } else {
                openNotification("删除角色失败", "请重新再试一次。", <SmileOutlined></SmileOutlined>);
            }
        }).catch(err => {
            console.error('Error deleting role:', err);
            setIsShowDeleteConfirmLoading(false);
            openNotification("删除角色失败", "请重新再试一次。", <SmileOutlined></SmileOutlined>);
        });

    }
    const handleDeleteCancel = () => {
        setIsShowDeleteDialog(false);
        setTargetRole(null);
    }

    const openNotification = (message: string, description: string, icon: ReactNode) => {
        api.open({
            message: message,
            description:
                description,
            icon: icon,
            duration: 2,
            placement: 'topRight',
        });
    };

    return (
        <>
            {contextHolder}
            <Flex gap="middle" style={{ marginBottom: '16px' }}>
                <Button type="primary" onClick={showRoleDrawer}>添加角色</Button>
            </Flex>
            <Table<RoleModel> columns={columns} dataSource={roleList} pagination={pagination} />
            <RoleForm form={roleForm} open={isShowRoleDrawer} isNew={isNew} targetRole={targetRole} hideDrawer={hideRoleDrawer} onFinish={saveRole}></RoleForm>
            <DeleteRoleDialog open={isShowDeleteDialog} deleteRole={targetRole} confirmLoading={isShowDeleteConfirmLoading} handleOk={handleDelete} handleCancel={handleDeleteCancel}></DeleteRoleDialog>
        </>
    );
};

export default RolePage;