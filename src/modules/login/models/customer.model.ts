import { Document, Schema } from "mongoose"
import { UserTypeEnum } from "../enums/enum";

export interface IUser extends Document {
    username: string,
    emailId: string,
    password: string,
    type: UserTypeEnum
}

export const userSchema = new Schema({
    username: {
        type: String
    },
    emailId:  {
        type: String
    },
    password:  {
        type: String
    },
    type: {
        type: String,
        enum: Object.values(UserTypeEnum)
    }
},
{
    timestamps: true
});