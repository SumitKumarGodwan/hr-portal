import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { UpdatedLoginDto, UserLoginDto } from "./dto/login-user.dto";
import { LoginHrPortalService } from "./service";

const prefix = "[USER_LOGIN_CONTROLLER]"

@Controller("login")
export class LoginHrPortalController {
    constructor(
        private loginHrPortalService: LoginHrPortalService
    ) {

    }

    @Post("create")
    async createnewUser(@Body() body: UserLoginDto) {
        try {
            const res = await this.loginHrPortalService.createUser(body);

            return res;
        } catch (error) {
            throw error;
        }
    }

    // Need to update to JWT token
    @Get("")
    async getUserDetails(
        @Query("userName") userName: string,
        @Query("password") password: string
    ) {
        console.log(`${prefix} (getUserDetails) get details for userName: ${userName} and password: ${password}`);
        try {
            const res = await this.loginHrPortalService.getUser({userName, password});
            console.log(`${prefix} (getUserDetails) user details ${res}`);

            return res;
        } catch (error) {
            throw error;
        }
    }

    @Patch("update-password")
    async updatePassword(@Body() body: UpdatedLoginDto) {
        console.log(`${prefix} (updateUserNameAndPassword) Initiating update Password for emailId: ${body.filter}`);

        try {
            console.log(`${prefix} (updateUserNameAndPassword) body for updating user password: ${JSON.stringify(body)}`);
            const res = await this.loginHrPortalService.updatePassword(body);
            console.log(`${prefix} (updateUserNameAndPassword) successfully updated user password for emailId: ${body.filter}`);

            return res;
        } catch (error) {
            throw error;
        }

    }

}