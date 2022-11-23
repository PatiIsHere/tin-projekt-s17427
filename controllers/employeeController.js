const EmployeeRepository = require('../repository/sequelize/EmployeeRepository')

exports.showEmployeeList = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list', {
                emps: emps,
                navLocation: 'emp'
            });
        });
}

exports.showAddEmployeeForm = (req, res, next) => {
    res.render('pages/employee/create', {navLocation: 'emp'});
}

exports.showEmployeeDetails = (req, res, next) => {
    res.render('pages/employee/details', {navLocation: 'emp'});
}

exports.showEmployeeEditForm = (req, res, next) => {
    res.render('pages/employee/edit', {navLocation: 'emp'});
}

exports.showDeleteEmployeeForm = (req, res, next) => {
    res.render('pages/employee/delete', {navLocation: 'emp'});
}