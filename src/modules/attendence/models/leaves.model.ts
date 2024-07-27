import { Document, Schema } from "mongoose";
import { LEAVES_TYPE } from "../enums/attendance.enum";

export interface ILeaves extends Document {
    id: string,
    leaves: ILeaveObject[]
}

export interface ILeaveObject {
    type: LEAVES_TYPE,
    availableLeaves: number,
    accuredLeaves: number,
    creditedFromLastYear: number,
    annualLeaves: number,
    usedLeaves: number
}

const leaveObjectSchema = new Schema({
    type: {
        type: String,
        enum: Object.values(LEAVES_TYPE),
        required: true
    },
    availableLeaves: Number,
    accuredLeaves: Number,
    creditedFromLastYear: Number,
    annualLeaves: Number,
    usedLeaves: Number
});

const leaveSchema = new Schema({
    id: {
        type: String,
        require: true,
        index: true
    },
    leaves: [leaveObjectSchema]
},{
    timestamps: true
});

export {leaveSchema}