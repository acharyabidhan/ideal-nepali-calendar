const days = [
    "आइतवार", "सोमवार", "मङ्गलवार", "बुधवार", "बिहिवार", "शुक्रवार", "शनिवार"
];
const monthNames = [
    "वैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत"
];
const numbers = {
    "0": "o",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९"
}

class NepaliCalendar {
    constructor(container, year, monthDays, startingDay) {
        this.mainContainer = document.querySelector(container);
        this.year = year;
        this.monthDays = monthDays;
        this.startingDay = startingDay;
    }

    getNepaliDigits(num) {
        if (num === null) return num;
        const stringnum = num.toString();
        let nepDigit = "";
        for (let i = 0; i < stringnum.length; i++) {
            nepDigit += numbers[stringnum.charAt(i)];
        }
        return nepDigit;
    }

    createCalendar() {
        for (let i = 0; i < this.monthDays.length; i++) {
            const parent = document.createElement("div");
            parent.className = "monthContainer";
            const calendarHeader = document.createElement("div")
            calendarHeader.className = "calendarHeader";
            const monthName = document.createElement("span");
            monthName.className = "monthName";
            monthName.innerText = this.getNepaliDigits(this.year) + " - " + monthNames[i];
            calendarHeader.appendChild(monthName);
            parent.appendChild(calendarHeader);
            const table = document.createElement("table");
            const tableHead = document.createElement("thead");
            const thtr = document.createElement("tr");
            for (let j = 0; j < days.length; j++) {
                const day = document.createElement("th");
                day.className = j === 6 ? "holiday" : null;
                day.innerText = days[j];
                thtr.appendChild(day);
            }
            tableHead.appendChild(thtr);
            table.appendChild(tableHead);
            const tableBody = document.createElement("tbody");
            let dayCount = 1;
            let extraDays = 0;
            for (let k = 0; k < 6; k++) {
                if (dayCount > this.monthDays[i]) break;
                const tr = document.createElement("tr");
                for (let l = 1; l < days.length + 1; l++) {
                    if (this.startingDay === 8) continue;
                    const td = document.createElement("td");
                    td.className = l === 7 ? "holiday" : null;
                    if (l >= this.startingDay) {
                        const dayText = dayCount <= this.monthDays[i] ? dayCount : null;
                        if (dayText === null) {
                            extraDays++;
                        }
                        td.innerText = this.getNepaliDigits(dayText);
                        dayCount++;
                    }
                    tr.appendChild(td);
                }
                this.startingDay = 1;
                tableBody.appendChild(tr);
            }
            table.appendChild(tableBody)
            this.mainContainer.append(parent, table);
            this.startingDay = 7 - (extraDays - 1);
        }
    }
}

const year = 2080;
// number of days in each month
const monthDays = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30];
const startingDay = 6; // first day of the year, here 6 means 6th day of week which is friday
const calendar = new NepaliCalendar("#mainContainer", year, monthDays, startingDay);
calendar.createCalendar();

// Made with 💖 by Bidhan Acharya