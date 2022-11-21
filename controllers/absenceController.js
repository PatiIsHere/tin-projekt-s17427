exports.showAbsenceList = (req, res, next) => {
    res.render('pages/absence/list', {navLocation: 'absence'});
}

exports.showAddAbsenceForm = (req, res, next) => {
    res.render('pages/absence/form-create', {navLocation: 'absence'});
}

exports.showAbsenceDetails = (req, res, next) => {
    res.render('pages/absence/form-details', {navLocation: 'absence'});
}