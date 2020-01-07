//check Input fields for letters whitespaces only
export function checkInputLetters(value: string): boolean {
    return /^[A-zäöüÄÖÜß ]+$/.test(value);
}
//check Input fields for numbers only
export function checkInputNumbers(number: string): boolean {
    return /^\d+(\.\d+)?$/.test(number);
}
