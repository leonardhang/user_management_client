export interface UserListModel {
    id: string;
    name: string;
    nickName: string;
    phoneNumber: string;
    email: string;
    gender: number;
    birthday: Date;
    status: number;
    createTime: Date;
}

export enum UserStatus {
    Locked = 0,
    Normal = 1,
    Deleted = 2,
}

export enum UserGender {
    Girl = 0,
    Boy = 1,
}

export interface UserFilterModel {
    searchText: string;
    gender: number;
    page: number;
}