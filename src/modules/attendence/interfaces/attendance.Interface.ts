export interface IAttendance {
    id: string,
    clockInTime: string,
    clockOutTime: string,
    dateTime: string,
    isClockedOut?: boolean
}