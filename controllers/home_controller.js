module.exports = {
    index: (req, res) => {
        res.render('index', { success: req.flash('success')});
    },
    vault: (req, res, next) => {
        res.render('vault_landing_page');
    }

}