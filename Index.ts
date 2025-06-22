// Notes about running this in the terminal
// To compile this to JS: "npx tsc" with "-w" allowing constant compiling
// To run the JS: "node [filname]" (The javascript file is what is actually run)
// Use "ts-node [filename]" to run the typesript file directly

import * as readline from 'readline';  // Import Node.js readline module for CLI input
import { Vehicle } from "./Vehicle";   // Import the Vehicle class

let garage: Vehicle[] = []; // Array to store all vehicles

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
// Presents a list of actions the user can take to manage their vehicles
    console.log(`
--- DRIVE PROGRAM MENU ---
1. Add a vehicle
2. View a vehicle
3. Add an entry to a vehicle
4. Exit
`);
    rl.question('Select an option: ', (answer) => {
    // Prompt user for menu selection
        switch (answer.trim()) {
            case '1':
                addVehicle();
                break;
            case '2':
                viewVehicle();
                break;
            case '3':
                addEntryToVehicle();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid option.');
                mainMenu();
        }
    });
}


function addVehicle() {
// This function collects a series of details from the user and creates a vehicle object with those attributes
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
// This function will get the user's selection of a vehicle and then display its details
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
// Prompts the user to select a vehicle and then adds a logbook entry to it
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
// List all vehicles in the garage with a number for selection and their name
    let count = 1;
    for (const vehicle of garage) {
        console.log(`${count}. ${vehicle.getVehicleName()}`);
        count++;
    }
}

mainMenu();