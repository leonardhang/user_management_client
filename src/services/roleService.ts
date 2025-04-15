import { RoleModel } from "../models/roleModel";
import axios from "../utils/axios";

export const getRoleListByPage = async (pageIndex: number) => {
    const userResult = await axios.get(`api/roles/page/${pageIndex}`);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Get Role List Failed');
    }
}

export const addRole = async (role: RoleModel) => {
    const userResult = await axios.post('api/roles', role);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Add Role Failed');
    }
}

export const deleteRole = async (roleId: number) => {
    const userResult = await axios.delete(`api/roles/${roleId}`);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Delete Role Failed');
    }
}

export const updateRole = async (role: RoleModel) => {
    const userResult = await axios.put(`api/roles`, role);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Update Role Failed');
    }
}