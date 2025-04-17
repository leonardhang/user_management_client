export interface DepartmentModel {
    id: number;
    name: string;
    parentId: number | null;
    memo: string,
    createTime: Date,
    children: Array<DepartmentModel>
}
