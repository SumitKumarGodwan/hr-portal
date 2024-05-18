import { IsEnum, IsString, isString } from "class-validator";
import { UserTypeEnum } from "../enums/enum";

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