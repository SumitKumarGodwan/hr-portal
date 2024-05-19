import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginPortalModelhelperService } from "./model-helper.service";
import { IuserLogin } from "./interfaces/interfaces";

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
}