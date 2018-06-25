const isNonSecurePath = (path) => {
  var nonSecurePaths = ['/auth'];
  return nonSecurePaths.some(nonSecurePath => path.includes(nonSecurePath));
}
export default isNonSecurePath;