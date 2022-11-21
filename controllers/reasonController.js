exports.showReasonList = (req, res, next) => {
    res.render('pages/reason/list', {navLocation: 'reason'});
}

exports.showAddReasonForm = (req, res, next) => {
    res.render('pages/reason/form-create', {navLocation: 'reason'});
}

exports.showReasonDetails = (req, res, next) => {
    res.render('pages/reason/form-details', {navLocation: 'reason'});
}