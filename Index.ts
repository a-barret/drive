// Notes about running this in the terminal
// To compile this to JS: "npx tsc" with "-w" allowing constant compiling
// To run the JS: "node [filname]" (The javascript file is what is actually run)
// Use "ts-node [filename]" to run the typesript file directly

import { Vehicle } from "./Vehicle";

let garage = [];
garage.push(new Vehicle(2018, "Chevrolet", "Equinox", 59000, 7/8));

console.log(garage[0].display());



