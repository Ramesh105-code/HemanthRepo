Mapping Array Elements

function doubleNumbers(input){
    if (!input.trim())
    return "Error: Please enter a list of numbers.";
    const numbers = input.split(" ").map(number);
    if(number.some(isNan))
        return "Error: Invalid input. Please enter only numbers.";
    const doubled = numbers.map(num => num * 2);
    console.log(doubled);
}

