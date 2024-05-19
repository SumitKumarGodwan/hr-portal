import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UserLoginDto } from "./dto/login-user.dto";
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

}