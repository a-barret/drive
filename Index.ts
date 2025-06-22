// Notes about running this in the terminal
// To compile this to JS: "npx tsc" with "-w" allowing constant compiling
// To run the JS: "node [filname]" (The javascript file is what is actually run)
// Use "ts-node [filename]" to run the typesript file directly

import * as readline from 'readline';
import { Vehicle } from "./Vehicle";

let garage: Vehicle[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    let invalidInput = true;
    while (invalidInput) {
        console.log(`
--- VEHICLE GARAGE MENU ---
1. Add a vehicle
2. View a vehicle
3. Add an entry to a vehicle
4. Exit
`);
        rl.question('Select an option: ', (answer) => {
            switch (answer.trim()) {
                case '1':
                    addVehicle();
                    invalidInput = false;
                    break;
                case '2':
                    viewVehicle();
                    invalidInput = false;
                    break;
                case '3':
                    addEntryToVehicle();
                    invalidInput = false;
                    break;
                case '4':
                    rl.close();
                    invalidInput = false;
                    break;
                default:
                    console.log('Invalid option.');
                    invalidInput = true;
                    break;
            }
        });
    }
}

function addVehicle() {
    rl.question('Enter year: ', (yearStr) => {
        rl.question('Enter make: ', (make) => {
            rl.question('Enter model: ', (model) => {
                rl.question('Enter current odometer: ', (odoStr) => {
                    rl.question('Enter current fuel level: ', (fuelStr) => {
                        const year = parseInt(yearStr);
                        const odometer = parseFloat(odoStr);
                        const fuel = parseFloat(fuelStr);
                        if (isNaN(year) || isNaN(odometer) || isNaN(fuel)) {
                            console.log('Invalid input. Please try again.');
                        } else {
                            garage.push(new Vehicle(year, make, model, odometer, fuel));
                            console.log('Vehicle added!');
                        }
                        mainMenu();
                    });
                });
            });
        });
    });
}

function viewVehicle() {
    if (garage.length === 0) {
        console.log('No vehicles in garage.');
        return mainMenu();
    }
    listVehicles();
    rl.question('Select vehicle number to view: ', (numStr) => {
        const i = parseInt(numStr) - 1;
        if (i >= 0 && i < garage.length) {
            console.log(garage[i].display());
        } else {
            console.log('Invalid selection.');
        }
        mainMenu();
    });
}

function addEntryToVehicle() {
    if (garage.length === 0) {
        console.log('No vehicles in garage.');
        return mainMenu();
    }
    listVehicles();
    rl.question('Select vehicle number to add entry: ', (numStr) => {
        const i = parseInt(numStr) - 1;
        if (i >= 0 && i < garage.length) {
            rl.question('Enter odometer: ', (odoStr) => {
                rl.question('Enter fuel level: ', (fuelStr) => {
                    rl.question('Enter description (optional): ', (desc) => {
                        const odometer = parseFloat(odoStr);
                        const fuel = parseFloat(fuelStr);
                        if (isNaN(odometer) || isNaN(fuel)) {
                            console.log('Invalid input.');
                        } else {
                            garage[i].addEntry(new Date(), odometer, fuel, desc);
                            console.log('Entry added!');
                        }
                        mainMenu();
                    });
                });
            });
        } else {
            console.log('Invalid selection.');
            mainMenu();
        }
    });
}

function listVehicles() {
    for (const [index, vehicle] of garage.entries()) {
        console.log(`${index + 1}. ${vehicle['display']().split('\n')[1]}`); // Show year/make/model line
    }
}

mainMenu();