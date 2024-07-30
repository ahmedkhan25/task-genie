Here's how you can define such a function in TypeScript:

```ts
function addTwoNumbers(num1: number, num2: number): number {
    return num1 + num2;
}
```

In this function, `num1` and `num2` are the two input parameters and both are of type `number`. The `: number` after the parentheses means that this function returns a number. Finally, the function calculates the sum of the two input numbers with `num1 + num2` and returns the result.

You can call this function with two numbers to get their sum. For example:

```ts
let sum = addTwoNumbers(5, 7);
console.log(sum); // Outputs: 12
```