import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { USER_LOGIN } from "src/common/database/database.constants";
import { IUser } from "./models/customer.model";
import { IuserLogin } from "./interfaces/interfaces";

@Injectable()
export class LoginPortalModelhelperService {
    constructor(
        @Inject(USER_LOGIN)
        private userLogin: Model<IUser>
    ){}

    async createUser(data: IuserLogin) {

        return this.userLogin.create(data)
    }

    async getUserDetails(input: IuserLogin) {
        const query: any = {}
        query.username = input.username
        query.emailId = input.emailId;
        query.password = input.password
        return this.userLogin.findOne(query).lean();
    }
}