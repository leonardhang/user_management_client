import { Flex, Button, notification, Form, Tree, Menu, Dropdown } from 'antd';
import DepartmentForm from './departmentForm';
import { DepartmentModel } from '../../models/departmentModel';
import { ReactNode, useEffect, useState } from 'react';
import { addDepartment, getAllDepartment, updateDepartment, deleteDepartment } from '../../services/departmentService';
import type { TreeDataNode, TreeProps } from 'antd';
import { DownOutlined, SmileOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const DepartmentPage: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const [departmentList, setDepartmentList] = useState<DepartmentModel[]>([]);
    const [departmentTree, setDepartmentTree] = useState<TreeDataNode[]>([]);
    const [isShowDrawer, setIsShowDrawer] = useState(false);
    const [targetDep, setTargetDep] = useState<DepartmentModel | null>(null);
    const [isNew, setIsNew] = useState(true);
    const [contextMenuPos, setContextMenuPos] = useState<{ pageX: number; pageY: number } | null>(null);
    const [depForm] = Form.useForm();
    const showDepartmentDrawer = () => {
        setIsShowDrawer(true);
    };

    const fetchDepartmentList = async (): Promise<void> => {
        try {
            const res = await getAllDepartment();
            setDepartmentList(res);
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


    const editDepart = () => {
        setIsShowDrawer(true);
        setIsNew(false);
    };

    const deleteDepart = () => {
        console.log('Delete role:', targetDep);
        deleteDepartment(targetDep!.id).then(res => {
            if (res > 0) {
                setTargetDep(null);
                openNotification("删除成功", "", <SmileOutlined></SmileOutlined>);
                fetchDepartmentList();
            } else {
                openNotification("删除失败", "请重新再试一次。", <SmileOutlined></SmileOutlined>);
            }
        }).catch(err => {
            console.error('Error deleting:', err);
            openNotification("删除失败", err.response.data, <SmileOutlined></SmileOutlined>);
        });

    };

    const menu = (
        <Menu>
            <Menu.Item key="edit" icon={<EditOutlined />} onClick={editDepart}>编辑</Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={deleteDepart}>删除</Menu.Item>
        </Menu>
    );

    const hideDrawer = () => {
        setIsShowDrawer(false);
        depForm.resetFields();
    };

    const saveDepartment = async (values: DepartmentModel) => {
        if (isNew) {
            addDepartment(values).then(addResult => {
                if (addResult > 0) {
                    setIsShowDrawer(false);
                    openNotification("添加部门成功", "", <SmileOutlined></SmileOutlined>);
                    depForm.resetFields();
                    fetchDepartmentList();

                } else {
                    openNotification("添加失败", "请检查数据，重新再试一次。", <SmileOutlined></SmileOutlined>);
                }
            }).catch(err => {
                openNotification("添加角色失败", err.response.data, <SmileOutlined></SmileOutlined>);
            });

        } else {
            if (targetDep) {
                targetDep.name = values.name;
                targetDep.memo = values.memo;
                targetDep.parentId = values.parentId;
                const updateResult = await updateDepartment(targetDep);
                if (updateResult > 0) {
                    setIsShowDrawer(false);
                    openNotification("编辑成功", "", <SmileOutlined></SmileOutlined>);
                    depForm.resetFields();
                    await fetchDepartmentList();

                } else {
                    openNotification("编辑失败", "请检查数据，重新再试一次。", <SmileOutlined></SmileOutlined>);
                }
            }
        }
    };

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const findDepNode = (depList: DepartmentModel[], targetId: number): DepartmentModel | null => {
        for (const child of depList) {
            if (child.id === targetId) {
                return child;
            }
            if (child.children && child.children.length > 0) {
                const found = findDepNode(child.children, targetId);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    };

    const handleRightClick = ({ event, node }: { event: React.MouseEvent; node: TreeDataNode }) => {
        event.preventDefault();
        console.log(node);
        if(node.key == 1) return;
        const targetNode = findDepNode(departmentList, Number(node.key));
        setTargetDep(targetNode);
        setContextMenuPos({ pageX: event.pageX, pageY: event.pageY });
    };

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
            <div onClick={() => setContextMenuPos(null)} style={{ width: '100%', height: '100%' }}>

                <Flex gap="middle" style={{ marginBottom: '16px' }}>
                    <Button type="primary" onClick={showDepartmentDrawer}>添加部门</Button>
                </Flex>
                <Tree
                    showLine
                    switcherIcon={<DownOutlined />}
                    autoExpandParent
                    defaultExpandAll
                    onSelect={onSelect}
                    onRightClick={handleRightClick}
                    treeData={departmentTree}
                />
                {contextMenuPos && (
                    <div style={{ position: 'absolute', top: contextMenuPos.pageY, left: contextMenuPos.pageX, zIndex: 9999 }}>
                        <Dropdown overlay={menu} open>
                            <div />
                        </Dropdown>
                    </div>
                )}
                <DepartmentForm form={depForm} open={isShowDrawer} isNew={isNew} departmentTree={departmentTree} targetDep={targetDep} hideDrawer={hideDrawer} onFinish={saveDepartment}></DepartmentForm>
            </div>
        </>
    );
}

export default DepartmentPage;