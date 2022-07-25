module.exports = {
    //handler to access home page
    index: (req, res) => {
        res.render('index', { success: req.flash('success'), 
        message: req.flash('error')});
    },
    //handler to access vault of authenticated user
    vault: (req, res, next) => {
        res.render('vault_landing_page', { update_success: req.flash('update_success'), 
        add_password_success: req.flash('add_password_success'), app_pass: req.flash('app_pass')});
    },
    //handler to logout authenticated user
    logout: (req, res, next) => {
        req.logout((error) => {
            if (error) { return next(error); }
            res.redirect('/');
        });
        
    }

}