import { UserTypeEnum } from "../enums/enum";

export interface IuserLogin {
    username: string,
    emailId: string,
    password: string,
    type: UserTypeEnum
}