/* eslint-disable prettier/prettier */
import { Document, Schema } from "mongoose"

export interface User extends Document{
    name: string
}

export const userSchema = new Schema({
    name: String
})