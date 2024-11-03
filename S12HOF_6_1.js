function extractEvenNumbers(input) {
    if (!input.trim()) return "Error: Please enter a list of integers.";
    
    const numbers = input.split(",").map(Number); 
    if (numbers.some(isNaN)) return "Error: Invalid input. Please enter only integers.";
    
    const evenNumbers = numbers.filter(num => num % 2 === 0); 
    console.log(evenNumbers);
  }
  