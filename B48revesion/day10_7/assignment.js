//  Custom myMap
function myMap(array, callback) {
  if (!Array.isArray(array)) throw new Error("First argument must be an array");
  if (typeof callback !== "function") throw new Error("Second argument must be a function");

  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[result.length] = callback(array[i], i, array);
  }
  return result;
}

  // Custom myFilter 

function myFilter(array, callback) {
  if (!Array.isArray(array)) throw new Error("First argument must be an array");
  if (typeof callback !== "function") throw new Error("Second argument must be a function");

  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result[result.length] = array[i];
    }
  }
  return result;
}

// Custom mySlice
function mySlice(array, start = 0, end = array.length) {
  if (!Array.isArray(array)) throw new Error("First argument must be an array");

  let result = [];
  let len = array.length;


  // Handle negative indices
  if (start < 0) start = Math.max(len + start, 0);
  if (end < 0) end = Math.max(len + end, 0);

  // Clamp values
  start = Math.min(Math.max(start, 0), len);
  end = Math.min(Math.max(end, 0), len);

  for (let i = start; i < end; i++) {
    result[result.length] = array[i];
  }
  return result;
}

// Custom mySplit
function mySplit(str, separator) {
  if (typeof str !== "string") throw new Error("First argument must be a string");

  let result = [];
  let current = "";

  // If separator is undefined → return whole string in array
  if (separator === undefined) return [str];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === separator) {
      result[result.length] = current;
      current = "";
    } else {
      current += str[i];
    }
  }
  // push last piece
  result[result.length] = current; 
  return result;
}
