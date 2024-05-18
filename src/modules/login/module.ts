import { Global, Module } from "@nestjs/common";
import { LoginHrPortalController } from "./controller";
import { LoginHrPortalService } from "./service";
import { LoginHrPortalhelperService } from "./helper.service";
import { LoginPortalModelhelperService } from "./model-helper.service";

@Global()
@Module({
    controllers: [LoginHrPortalController],
    providers: [LoginHrPortalService, LoginHrPortalhelperService, LoginPortalModelhelperService],
    exports: [LoginHrPortalService, LoginHrPortalhelperService, LoginPortalModelhelperService],
    imports: []
})

export class LoginPortalModule {}