import { Body, Controller, Post } from "@nestjs/common";
import { UserLoginDto } from "./dto/login-user.dto";
import { LoginHrPortalService } from "./service";

@Controller("login")
export class LoginHrPortalController {
    constructor(
        private loginHrPortalService: LoginHrPortalService
    ) {

    }

    @Post("create")
    async createnewUser(@Body() body: UserLoginDto) {
        try {
            await this.loginHrPortalService.createUser(body).then((res) => {
                console.log(res);
            });

            return "OK"
        } catch (error) {
            throw error;
        }
    }
}