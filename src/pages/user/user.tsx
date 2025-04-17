import React, { useState, useEffect, ReactNode } from 'react';
import { Space, Table, Tag, Flex, Input, Dropdown, Typography, Button, Form, notification } from 'antd';
import type { TableProps, TreeDataNode } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { UserFilterModel, UserListModel, UserStatus } from '../../models/userModel';
import { formatDate } from '../../utils/common';
import { getUserListByPage, addUser, deleteUser, updateUser, filterUserList } from '../../services/userService';
import boy from '../../assets/boy.png';
import girl from '../../assets/girl.png';
import './user.css';
import NewUserForm from './addUserForm';
import EditUserForm from './editUserForm';
import DeleteUserDialog from './deleteUserDialog';
import { getAllDepartment } from '../../services/departmentService';
import { DepartmentModel } from '../../models/departmentModel';

const genderItems: { key: number; label: string }[] = [
    {
        key: -1,
        label: '全部',
    },
    {
        key: 1,
        label: '男',
    },
    {
        key: 0,
        label: '女',
    },
];
const { Search } = Input;

const UserListPage: React.FC = () => {
    const [userList, setUserList] = useState<UserListModel[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [genderSelected, setGenderSelected] = useState<string>('全部');
    const [showAddUserDrawer, setShowAddUserDrawer] = useState(false);
    const [isShowDeleteUserDialog, setIsShowDeleteUserDialog] = useState(false);
    const [targetUser, setTargetUser] = useState<UserListModel | null>(null);
    const [isShowDeleteUserConfirmLoading, setIsShowDeleteUserConfirmLoading] = useState(false);
    const [showEditUserDrawer, setShowEditUserDrawer] = useState(false);
    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        total: 1,
        onChange: (page: number) => {
            fetchUserList(page);
        }
    });
    const [departmentTree, setDepartmentTree] = useState<TreeDataNode[]>([]);
    const fetchDepartmentList = async (): Promise<void> => {
        try {
            const res = await getAllDepartment();
            const results: TreeDataNode[] = [];
            res.forEach((dep: DepartmentModel) => {
                results.push({
                    key: dep.id,
                    value: dep.id,
                    title: dep.name,
                    children: dep.children ? dep.children.map(child => ({
                        key: child.id,
                        value: child.id,
                        title: child.name,
                        children: child.children ? child.children.map(grandChild => ({
                            key: grandChild.id,
                            value: grandChild.id,
                            title: grandChild.name,
                            children: []
                        })) : []
                    })) : []
                } as TreeDataNode);
            });
            setDepartmentTree(results);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    useEffect(() => {
        fetchDepartmentList();
    }, []);
    const columns: TableProps<UserListModel>['columns'] = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (name) => <a>{name}</a>,
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
            render: (nickname) => <label>{nickname}</label>,
        },
        {
            title: '电话',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (phone) => <label>{phone}</label>,
        },
        {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (birthday) => <label>{formatDate(birthday)}</label>,
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => {
                let imgUrl = gender == 0 ? girl : boy;
                return (
                    <img src={imgUrl} className='user-gender-tag' />
                );
            },
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let color = status == UserStatus.Normal ? 'green' : 'red';
                return (
                    <Tag color={color} key={status}>
                        {UserStatus[status]}
                    </Tag>
                );
            },
        },
        {
            title: '部门',
            dataIndex: 'departmentName',
            key: 'departmentName',
            render: (departmentName) => <label>{departmentName}</label>,
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showEditUserForm(record)}>编辑</a>
                    <a onClick={() => showDeleteUserDialog(record)}>删除</a>
                </Space>
            ),
        },
    ];
    const [api, contextHolder] = notification.useNotification();
    const [newUserForm] = Form.useForm();
    const [editUserForm] = Form.useForm();
    const fetchUserList = async (page: number): Promise<void> => {
        try {
            if (searchText.trim().length > 0 || genderSelected != "全部") {
                const selectedGender = genderItems.find(item => item.label === genderSelected);
                filterUser(searchText.trim(), selectedGender?.key ?? -1, page);
            } else {
                const res = await getUserListByPage(page);
                setPagination({
                    ...pagination,
                    current: page,
                    total: res.totals,
                });
                setUserList(res.data);
            }
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };
    useEffect(() => {
        fetchUserList(1);
    }, []);

    const onSearch = async (value: string) => {
        console.log(value);
        setSearchText(value);
        const selectedGender = genderItems.find(item => item.label === genderSelected);
        filterUser(value.trim(), selectedGender?.key ?? -1, 1);
    };

    const genderChaneged = async (value: string) => {
        console.log(value);
        const selectedItem = genderItems.find(item => item.key === Number(value));
        setGenderSelected(selectedItem?.label || '全部');
        filterUser(searchText, selectedItem?.key ?? -1, 1);
    }

    const filterUser = async (searchText: string, gender: number, page: number): Promise<void> => {
        try {
            let filterOption = createFilter(searchText, gender, page);
            const res = await filterUserList(filterOption);
            setPagination({
                ...pagination,
                current: page,
                total: res.totals,
            });
            setUserList(res.data);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    const createFilter = (searchText: string, gender: number, page: number): UserFilterModel => {
        return { searchText, gender, page };
    }

    const showNewUserDrawer = () => {
        setShowAddUserDrawer(true);
    }
    const hideAddUserDrawer = () => {
        setShowAddUserDrawer(false);
        newUserForm.resetFields();
    }
    const saveNewUser = async (values: any) => {
        if (values.birthday) {
            values.birthday = values.birthday.format('YYYY-MM-DD');
        }
        const addResult = await addUser(values);
        if (addResult > 0) {
            setShowAddUserDrawer(false);
            openNotification("添加用户成功", "", <SmileOutlined></SmileOutlined>);
            newUserForm.resetFields();
            await fetchUserList(pagination.current);

        } else {
            openNotification("添加用户失败", "请检查数据，重新再试一次。", <SmileOutlined></SmileOutlined>);
        }
    }
    const showDeleteUserDialog = (record: UserListModel) => {
        setIsShowDeleteUserDialog(true);
        setTargetUser(record);
        console.log('Delete user:', record);
    }
    const handleDelete = () => {
        console.log('Delete user:', targetUser);
        setIsShowDeleteUserConfirmLoading(true);
        deleteUser(targetUser!.id).then(res => {
            if (res > 0) {
                setIsShowDeleteUserConfirmLoading(false);
                setIsShowDeleteUserDialog(false);
                setTargetUser(null);
                openNotification("删除用户成功", "", <SmileOutlined></SmileOutlined>);
                fetchUserList(pagination.current);
            } else {
                openNotification("删除用户失败", "请重新再试一次。", <SmileOutlined></SmileOutlined>);
            }
        }).catch(err => {
            console.error('Error deleting user:', err);
            setIsShowDeleteUserConfirmLoading(false);
            openNotification("删除用户失败", "请重新再试一次。", <SmileOutlined></SmileOutlined>);
        });

    }
    const handleDeleteCancel = () => {
        setIsShowDeleteUserDialog(false);
        setTargetUser(null);
    }
    const showEditUserForm = (record: UserListModel) => {
        setShowEditUserDrawer(true);
        setTargetUser(record);
        console.log('Edit user:', record);
    }
    const handleEditUserCancel = () => {
        setShowEditUserDrawer(false);
        setTargetUser(null);
        editUserForm.resetFields();
    }
    const handleEditUser = async (values: any) => {
        if (values.birthday) {
            values.birthday = values.birthday.format('YYYY-MM-DD');
        }
        targetUser!.birthday = values.birthday;
        targetUser!.name = values.name;
        targetUser!.nickName = values.nickName;
        targetUser!.phoneNumber = values.phoneNumber;
        targetUser!.gender = values.gender;
        targetUser!.status = values.status ? 1 : 0;
        targetUser!.departmentId = values.departmentId;
        const editResult = await updateUser(targetUser);
        if (editResult > 0) {
            setShowEditUserDrawer(false);
            openNotification("编辑用户成功", "", <SmileOutlined></SmileOutlined>);
            editUserForm.resetFields();
            setTargetUser(null);
            await fetchUserList(pagination.current);
        } else {
            openNotification("编辑用户失败", "请检查数据，重新再试一次。", <SmileOutlined></SmileOutlined>);
        }
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
                <Search placeholder="请输入检索内容" allowClear onSearch={onSearch} style={{ width: 200 }} />
                <Dropdown
                    menu={{
                        items: genderItems,
                        selectable: true,
                        defaultSelectedKeys: ['-1'],
                        onClick: ({ key }) => genderChaneged(key)
                    }}
                >
                    <Typography.Link style={{ backgroundColor: '#f1f1f1', padding: '0 12px', borderRadius: '12px', color: '#4c4c4c' }} className='drop-down-default'>
                        <Space>
                            性别：{genderSelected}
                            <DownOutlined />
                        </Space>
                    </Typography.Link>
                </Dropdown>
                <Button type="primary" onClick={showNewUserDrawer}>添加用户</Button>
            </Flex>
            <Table<UserListModel> columns={columns} dataSource={userList} pagination={pagination} />
            <NewUserForm form={newUserForm} open={showAddUserDrawer} departmentTree={departmentTree} hideAddUserDrawer={hideAddUserDrawer} onFinish={saveNewUser}></NewUserForm>
            <DeleteUserDialog open={isShowDeleteUserDialog} deleteUser={targetUser} confirmLoading={isShowDeleteUserConfirmLoading} handleOk={handleDelete} handleCancel={handleDeleteCancel}></DeleteUserDialog>
            <EditUserForm open={showEditUserDrawer} departmentTree={departmentTree} editUser={targetUser} form={editUserForm} hideEditUserDrawer={handleEditUserCancel} onFinish={handleEditUser}></EditUserForm>
        </>
    );
};

export default UserListPage;