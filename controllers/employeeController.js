exports.showEmployeeList = (req, res, next) => {
    res.render('pages/employee/list', {navLocation: 'emp'});
}

exports.showAddEmployeeForm = (req, res, next) => {
    res.render('pages/employee/form-create', {navLocation: 'emp'});
}

exports.showEmployeeDetails = (req, res, next) => {
    res.render('pages/employee/form-details', {navLocation: 'emp'});
}

exports.showDeleteEmployeeForm = (req, res, next) => {
    res.render('pages/employee/form-delete', {navLocation: 'emp'});
}