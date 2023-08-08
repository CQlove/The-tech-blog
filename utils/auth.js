const withAuth = (req, res, next) => {
    // To check if user is logged in, if not redirect the user to the login page
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
