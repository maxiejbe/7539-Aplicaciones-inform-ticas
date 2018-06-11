const isNonSecurePath = (path) => {
  var nonSecurePaths = [];
  return nonSecurePaths.some(path => path.includes(path));
}
export default isNonSecurePath;