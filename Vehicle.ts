import { Entry } from "./Entry";

export class Vehicle {
    private year: number;
    private make: string;
    private model: string;
    private logbook: Entry[]

    public constructor(year: number, make: string, model: string, currentOdometer: number, currentFuelLevel: number) {
        this.year = year;
        this.make = make;
        this.model = model;
        this.logbook = [];
        this.addEntry(new Date(), currentOdometer, currentFuelLevel, "First entry")
    }

    public display(): string {
        let logbookString = "";
        for (const entry of this.logbook) {
            logbookString += "\n" + entry.display()
        }
        return ` --- ${this.year} ${this.make} ${this.model} ---
Odometer: ${this.getRecentOdometer()}
Fuel Level: ${this.getRecentFuelLevel()}

 --- LOGBOOK ---${logbookString}
 ---   END   ---
`
    }

    public getRecentOdometer(): number {
        return this.logbook[0].getOdometer();
    }

    public getRecentFuelLevel(): number {
        return this.logbook[0].getFuelLevel();
    }

    public addEntry(date: Date, odometer: number, fuelLevel: number, description?: string): void {
        this.logbook.unshift(new Entry(date, odometer, fuelLevel, description))
    }
}