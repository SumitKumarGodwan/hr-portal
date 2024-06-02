import { Document, Schema } from "mongoose";

export interface IAttendence extends Document {
    id: string,
    clockInTime: string,
    clockOutTime: string,
    dateTime: string,
    isClockedOut: boolean
}

export const attendenceSchema = new Schema ({
    id: String,
    clockInTime: String,
    clockOutTime: String,
    dateTime: String,
    isClockedOut: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})