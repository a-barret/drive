export class Entry {
    private date: Date;
    private odometer: number;
    private fuelLevel: number;
    private description?: string;

    public constructor(date: Date, odometer: number, fuelLevel: number, description?: string) {
        this.date = date;
        this.odometer = odometer;
        this.fuelLevel = fuelLevel;
        this.description = description;
    }

    public display(): string {
        if (this.description == null)
            return `Date: ${this.date.toLocaleDateString()}, Odometer: ${this.odometer}, Fuel Level: ${this.fuelLevel} gal, Description: ${this.description}`;

        return `Date: ${this.date.toLocaleDateString()}, Odometer: ${this.odometer}, Fuel Level: ${this.fuelLevel} gal, Description: ${this.description}`;
    }

    public getOdometer(): number {
        return this.odometer;
    }

    public getFuelLevel(): number {
        return this.fuelLevel;
    }
}