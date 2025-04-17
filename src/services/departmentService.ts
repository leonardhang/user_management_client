import { DepartmentModel } from "../models/departmentModel";
import axios from "../utils/axios";

export const getAllDepartment = async () => {
    const depResult = await axios.get(`api/department`);
    if (depResult.status === 200) {
        return depResult.data;
    }else {
        throw new Error('Get department List Failed');
    }
}

export const addDepartment = async (dep: DepartmentModel) => {
    const depResult = await axios.post('api/department', dep);
    if (depResult.status === 200) {
        return depResult.data;
    }else {
        throw new Error('Add Department Failed');
    }
}

export const deleteDepartment = async (departmentId: number) => {
    const depResult = await axios.delete(`api/department/${departmentId}`);
    if (depResult.status === 200) {
        return depResult.data;
    }else {
        throw new Error('Delete Department Failed');
    }
}

export const updateDepartment = async (dep: DepartmentModel) => {
    const depResult = await axios.put(`api/department`, dep);
    if (depResult.status === 200) {
        return depResult.data;
    }else {
        throw new Error('Update Department Failed');
    }
}