import { IsEnum, IsOptional, IsString, isString } from "class-validator";
import { UserTypeEnum, UpdatingFieldEnum } from "../enums/enum";

export class UserLoginDto {
    @IsString()
    username: string;

    @IsString()
    emailId: string;

    @IsString()
    password: string;

    @IsEnum(UserTypeEnum)
    type: UserTypeEnum
}

export class UpdatedLoginDto {
    @IsString()
    newPassword: string;

    @IsString()
    userName: string

    @IsEnum(UpdatingFieldEnum)
    @IsOptional()
    updatingFeild: UpdatingFieldEnum

    @IsString()
    filter: string;
}