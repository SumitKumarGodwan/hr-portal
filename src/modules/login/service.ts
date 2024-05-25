import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginPortalModelhelperService } from "./model-helper.service";
import { IUserPasswordUpdate, IuserLogin } from "./interfaces/interfaces";

const prefix = "USER_LOGIN_SERVICE"
@Injectable()
export class LoginHrPortalService {
    constructor(
        private loginModelhelperService: LoginPortalModelhelperService
    ) {

    }

    async createUser(data: IuserLogin) {
        try {

            // 1. Check is user already present
            const isUserPresent = await this.loginModelhelperService.getUserDetails(data);

            if (isUserPresent) {
                return "already registered user";
            }
            await this.loginModelhelperService.createUser(data);

            console.log(`successfully user created with ${JSON.stringify(data)}`);

            return "registered";
        } catch (error) {
            console.error(`failed to create user | Error: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    async getUser({ userName, password }: {
        userName: string,
        password: string
    }) {
        try {
            const result = await this.loginModelhelperService.getUserDetails({ username: userName, password });

            if (!result) {
                return new BadRequestException({
                    "message": "user not found",
                    "error": "user not found",
                    "statusCode": 400,
                })
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updatePassword(body: IUserPasswordUpdate) {
        try {

            const {filter, userName, newPassword} = body;
            let updateObj: any = {
                $set: {password: newPassword}
            };
            const result = await this.loginModelhelperService.updateDetails({emailId: filter, username: userName}, updateObj);

            if(!result) {
                throw new BadRequestException({
                    "message": "not updated password successfully",
                    "error": "not updated password successfully",
                    "statusCode": 400,
                });
            }
            return result;
        } catch (error) {
            console.log(`${prefix} (updateUserNameAndPassword) failed to update password for username: ${body.userName} | Error: ${error.message}`);
            throw error;
        }
    }
}