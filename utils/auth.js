const withAuth = (req, res, next) => {
    // To check if user is logged in, if not redirect the user to the login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
