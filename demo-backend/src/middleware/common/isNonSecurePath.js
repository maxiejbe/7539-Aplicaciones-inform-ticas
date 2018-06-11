const isNonSecurePath = (path) => {
  var nonSecurePaths = ['/auth'];
  return nonSecurePaths.some(path => path.includes(path));
}
export default isNonSecurePath;