import {CalendarDate} from "../models/Date.js";

class DateHelper {
    private monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    private days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    public getDate(){
        return new Date();
    }

    public parseDate(date: string): CalendarDate{
        const dateFormat = new Date(date);
        return {
            day: this.days[dateFormat.getDay()],
            date: dateFormat.getDate().toString(),
            month: dateFormat.getMonth().toString(),
            monthName: this.monthNames[dateFormat.getMonth()],
            year: dateFormat.getFullYear().toString()
        };
    }

    public getDay(){
        return this.getDate().getDate();
    }

    public getMonth(){
        return this.getDate().getMonth();
    }
    public getYear(){
        return this.getDate().getFullYear();
    }

    public getMonthName(month: number){
        return this.monthNames[month];
    }
    public getMonthNumber(month: string){
        return this.monthNames.indexOf(month)+1;
    }
}
export const dateHelper = new DateHelper();
