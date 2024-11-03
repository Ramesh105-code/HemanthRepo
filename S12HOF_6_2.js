function sumNumbers(input) {
   
    if (!input.trim()) return "Error: Please enter a series of numbers.";
    
    const numbers = input.split(";").map(Number);
    if (numbers.some(isNaN)) return "Error: Invalid input. Please enter only numbers.";
    
    const sum = numbers.reduce((acc, num) => acc + num, 0); 
    console.log(sum);
  }