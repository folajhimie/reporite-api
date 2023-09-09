




export class HelpFunction {
    static timeToSeconds(value: number, unit: string): number {
        const timeValues: Record<string, number> = {
            seconds: 1,
            minutes: 60,
            hours: 60 * 60,
            days: 60 * 60 * 24,
            weeks: 60 * 60 * 24 * 7,
            years: 60 * 60 * 24 * 365.25,
        };
      
        return parseFloat(value.toString()) * timeValues[unit];
    }

    static multiplyDate(value: number){
        let converted_date = value * 1000;
        return converted_date.toString()
    }

    static dateFormat(date: string | undefined): string {
        if (!date) return "-";

        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        const goodDate = new Date(date);
        return goodDate.toLocaleDateString("en-US", options);
    }
}