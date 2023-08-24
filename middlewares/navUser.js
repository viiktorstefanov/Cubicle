module.exports = () => (req, res, next) => {
    res.locals.hasUser = req.user != undefined;
    if(req.user) {
        res.locals.isAdmin = req.user.roles.includes('admin');
    }
    
    next();
}