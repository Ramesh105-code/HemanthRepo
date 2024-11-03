Array.prototype.customMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (i in this) { 
            result.push(callback(this[i], i, this));
        }
    }
    return result;
};
Array.prototype.customFilter = function(predicate) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (i in this && predicate(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};
Array.prototype.customReduce = function(reducer, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < this.length; i++) {
        if (i in this) {
            accumulator = reducer(accumulator, this[i], i, this);
        }
    }
    return accumulator;
};

// Example Usage
const arr = [1, 2, 3, 4, 5];

// Using custom higher-order functions
console.log(arr.customMap(x => x * 2));        
console.log(arr.customFilter(x => x % 2 === 0)); 
console.log(arr.customReduce((acc, cur) => acc + cur, 0)); 