import { UpdatingFieldEnum, UserTypeEnum } from "../enums/enum";

export interface IuserLogin {
    username: string,
    emailId?: string,
    password: string,
    type?: UserTypeEnum
}

export interface IUserPasswordUpdate {
    filter: string,
    newPassword: string,
    userName: string,
    updatingFeild: UpdatingFieldEnum
}