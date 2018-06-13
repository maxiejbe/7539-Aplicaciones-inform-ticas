import passport from 'passport'
import isNonSecurePath from './isNonSecurePath';

const isAuthenticated = () => {
  return (req, res, next) =>{
    if (isNonSecurePath(req.path)) return next();

    return passport.authenticate('jwt', { session: false })(req, res, next);
  }
}
export default isAuthenticated;