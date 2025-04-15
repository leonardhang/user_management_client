import React from 'react';
import { Modal } from 'antd';
import { RoleModel } from '../../models/roleModel';

interface DeleteRoleDialogProps {
    open: boolean;
    deleteRole: RoleModel | null;
    confirmLoading: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}
const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({ open, deleteRole, confirmLoading, handleOk, handleCancel }) => {

    return (
        <>
            <Modal
                title="删除角色"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>您确定要删除{deleteRole == null ? '' : deleteRole.name}吗</p>
            </Modal>
        </>
    );
};

export default DeleteRoleDialog;