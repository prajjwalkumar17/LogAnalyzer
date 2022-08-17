/** @format */

exports.removeduplicates = (array) => {
  Object.keys(array).forEach((i) => {
    Object.keys(array[i]).forEach(
      (k) =>
        (array[i][k] &&
          typeof array[i][k] === "object" &&
          removeEmptyOrNull(array[i][k])) ||
        (!array[i][k] && array[i][k] !== undefined && delete array[i][k])
    );
  });
  return array;
};
