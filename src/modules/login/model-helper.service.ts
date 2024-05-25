import { Inject, Injectable } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
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
        if(input.username) {
            query.username = input.username
        }
        if(input.emailId){
            query.emailId = input.emailId;
        }
        if(input.password) {
            query.password = input.password
        }
        return this.userLogin.findOne(query).lean();
    }

    async updateDetails(filter: FilterQuery<IUser>, updeObj: UpdateQuery<IUser>) {
        return this.userLogin.updateOne(filter, updeObj)
    }
}