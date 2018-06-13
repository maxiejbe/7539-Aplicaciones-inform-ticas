import passport from 'passport'
import isNonSecurePath from './isNonSecurePath';

const isAuthenticated = (req, res, next) => {
  if (isNonSecurePath(req.path)) return next();
  passport.authenticate('jwt', function(err, user, info) {
    if (err || !user) { return res.status(401).json({ auth: false }); }
    return next();

  })(req, res, next);
}
export default isAuthenticated;