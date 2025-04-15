import React from 'react';
import { Modal } from 'antd';
import { UserListModel } from '../../models/userModel';

interface DeleteUserDialogProps {
    open: boolean;
    deleteUser: UserListModel | null;
    confirmLoading: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}
const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, deleteUser, confirmLoading, handleOk, handleCancel }) => {

    return (
        <>
            <Modal
                title="删除用户"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>您确定要删除{deleteUser == null ? '' : deleteUser.name}吗</p>
            </Modal>
        </>
    );
};

export default DeleteUserDialog;