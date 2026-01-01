Array.prototype.myForEach = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      callback.call(thisArg, this[i], i, this);
    }
  }
};
