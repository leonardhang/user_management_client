import { RoleModel } from "../models/roleModel";
import axios from "../utils/axios";

export const getRoleListByPage = async (pageIndex: number) => {
    const roleResult = await axios.get(`api/roles/page/${pageIndex}`);
    if (roleResult.status === 200) {
        return roleResult.data;
    }else {
        throw new Error('Get Role List Failed');
    }
}

export const addRole = async (role: RoleModel) => {
    const roleResult = await axios.post('api/roles', role);
    if (roleResult.status === 200) {
        return roleResult.data;
    }else {
        throw new Error('Add Role Failed');
    }
}

export const deleteRole = async (roleId: number) => {
    const roleResult = await axios.delete(`api/roles/${roleId}`);
    if (roleResult.status === 200) {
        return roleResult.data;
    }else {
        throw new Error('Delete Role Failed');
    }
}

export const updateRole = async (role: RoleModel) => {
    const roleResult = await axios.put(`api/roles`, role);
    if (roleResult.status === 200) {
        return roleResult.data;
    }else {
        throw new Error('Update Role Failed');
    }
}