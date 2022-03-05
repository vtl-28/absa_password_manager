module.exports = {
    index: (req, res) => {
        res.render('index', { success: req.flash('success'), 
        message: req.flash('error')});
    },
    vault: (req, res, next) => {
        res.render('vault_landing_page', { update_success: req.flash('update_success')});
    },
    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }

}