

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

    static getFormattedDay(date: any): any {
        if (date > 3 && date < 21) return date + 'th';
        switch (date % 10) {
            case 1:  return date + 'st';
            case 2:  return date + 'nd';
            case 3:  return date + 'rd';
            default: return date + 'th';
        }
    }

    static getFullDateForUser(): any {

        let options = { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        };

        let dayOfUser = this.getFormattedDay(new Date().getDate());

        // let today = new Date().toLocaleDateString('en-US', options);

        // let today = new Date().toLocaleDateString('en-US', options);
        let dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        let dayOfMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
        let dayOfYear = new Date().toLocaleDateString('en-US', { year: 'numeric' });
        
        let fullDate = `${dayOfWeek} ${dayOfUser}, ${dayOfMonth} ${dayOfYear}`;
        return fullDate;
    }

    static getFullTimeForUser(): any {

        let options = { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        };

        // let today = new Date().toLocaleDateString('en-US', options);
        let time = new Date().toLocaleTimeString('en-US');

        return time;
        
        // console.log(dayOfWeek + " " + dayOfUser + ", " + dayOfMonth + " " + dayOfYear + " " + time)
    }

    static multiplyDate(value: number) {
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

    static addZeroToSingleDigit(number: number): string | number {
        if (number >= 0 && number <= 9) {
            return `0${number + 1}`;
        } else {
            return number.toString();
        }
    }
    static addNumberToFirstLetter(inputString: string, numberToAdd: number): string {
        // Check if the input string is empty or null
        if (!inputString) {
            return inputString;
        }

        // Extract the first character from the input string
        const firstChar = inputString.charAt(0);

        // Check if the first character is a number between 0 and 9
        if (/[0-9]/.test(firstChar) && parseInt(firstChar) >= 0 && parseInt(firstChar) <= 9) {
            // Add the specified number to the parsed first character
            const resultNumber = parseInt(firstChar) + numberToAdd;

            // Replace the first character in the input string with the modified number
            return resultNumber.toString() + inputString.slice(1);
        }

        // If the first character is not a number between 0 and 9, return the input string unchanged
        return inputString;
        // Example usage:
        //   const input1 = "5abc"; // First character is a number between 0 and 9
        //   const output1 = addNumberToFirstLetter(input1, 3); // Output: "8abc"

        //   const input2 = "Axyz"; // First character is not a number
        //   const output2 = addNumberToFirstLetter(input2, 5); // Output: "Axyz"

        //   const input3 = ""; // Empty string
        //   const output3 = addNumberToFirstLetter(input3, 2); // Output: ""
    }



}






