import { UserFilterModel } from "../models/userModel";
import axios from "../utils/axios";

export const getUserListByPage = async (pageIndex: number) => {
    const userResult = await axios.get(`api/users/page/${pageIndex}`);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Get User List Failed');
    }
}

export const addUser = async (user: any) => {
    const userResult = await axios.post('api/users', user);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Add User Failed');
    }
}

export const deleteUser = async (userId: string) => {
    const userResult = await axios.delete(`api/users/${userId}`);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Delete User Failed');
    }
}

export const updateUser = async (user: any) => {
    const userResult = await axios.put(`api/users`, user);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Update User Failed');
    }
}

export const filterUserList = async (option: UserFilterModel) => {
    const userResult = await axios.post('api/users/filter', option);
    if (userResult.status === 200) {
        return userResult.data;
    }else {
        throw new Error('Get User Failed');
    }
}