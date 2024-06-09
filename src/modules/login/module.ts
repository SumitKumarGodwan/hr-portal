import { Global, Module } from "@nestjs/common";
import { LoginHrPortalController } from "./controller";
import { LoginHrPortalService } from "./service";
import { LoginPortalModelhelperService } from "./model-helper.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./helper.service";

@Global()
@Module({
    controllers: [LoginHrPortalController],
    providers: [LoginHrPortalService, LoginPortalModelhelperService],
    exports: [LoginHrPortalService, LoginPortalModelhelperService],
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
          }),
    ]
})

export class LoginPortalModule {}