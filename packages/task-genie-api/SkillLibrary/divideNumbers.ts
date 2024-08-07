function divideNumbers(num1: number, num2: number): number | string {
    if(num2 === 0) {
       return 'Error: Division by zero';
    }
    return num1 / num2;
}