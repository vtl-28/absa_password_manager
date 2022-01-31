module.exports = {
    index: (req, res) => {
        res.render('index', { success: req.flash('success')});
    }
}