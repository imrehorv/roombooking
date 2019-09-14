import { User } from './iuser';

export interface Row {
    startdate: Date,
    enddate: Date,
    bookedbyuser: User[]
}