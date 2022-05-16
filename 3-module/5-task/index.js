function getMinMax(str) {
  let numbers = str.split(' ').filter(el => !isNaN(el));
  let result = {
      min: Math.min.apply(null,numbers),
      max: Math.max.apply(null,numbers)
}
  return result;
}
