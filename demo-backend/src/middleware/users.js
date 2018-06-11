export default (routes) => {
  routes.use('/api/users', function(req, res, next){
    next();
  });
};
