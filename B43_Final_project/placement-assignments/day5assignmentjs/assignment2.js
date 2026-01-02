const obj = {
  name: 'John',
  address: {
    city: 'NYC',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  hobbies: ['reading', 'gaming']
};

function flattenObject(input, parentKey = '', result = {}) {
  for (let key in input) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof input[key] === 'object' &&
      input[key] !== null
    ) {
      flattenObject(input[key], newKey, result);
    } else {
      result[newKey] = input[key];
    }
  }
  return result;
}

console.log(flattenObject(obj));
