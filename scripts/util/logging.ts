/**
 * Utility file to wrap `chalk` console log coloring and standardize warnings and errors produced by scripts.
 */

import chalk from 'chalk';
import readline from 'readline/promises';


export function info(message: string) {
    console.log(`${chalk.green('[INFO]')}: ${message}`)
}

export function warn(message: string) {
    console.warn(`${chalk.yellow('[WARNING]')}: ${message}`);
}

export function error(message: string) {
    console.error(`${chalk.red('[ERROR]')}: ${message}`);
}

export async function prompt(message: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    })
    return rl.question(`↳ ${message} `).then(res => {
        rl.close();
        return res;
    });
}
