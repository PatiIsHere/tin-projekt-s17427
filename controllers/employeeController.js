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
    res.render('pages/employee/form', {
        emp: {},
        pageTitle: 'Nowy pracownik',
        formMode: 'createNew',
        btnLabel: 'Dodaj pracownika',
        formAction: '/employee/add',
        navLocation: 'emp',
        validationErrors: []
    });
}

exports.showEmployeeDetails = (req, res, next) => {
    const empId = req.params.IdEmployee;
    console.log(empId)
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employee/form', {
                emp: emp,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły pracownika',
                formAction: '',
                navLocation: 'emp',
                validationErrors: []
            });
        })
}

exports.showEmployeeEditForm = (req, res, next) => {
    const empId = req.params.IdEmployee;
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employee/form', {
                emp: emp,
                formMode: 'edit',
                pageTitle: 'Edycja pracownika',
                btnLabel: 'Edytuj pracownika',
                formAction: '/employee/edit',
                navLocation: 'emp',
                validationErrors: []
            });
        })

}

exports.showDeleteEmployeeForm = (req, res, next) => {
    res.render('pages/employee/delete', {navLocation: 'emp'});
}

exports.addEmployee = (req, res, next) => {
    const empData = {...req.body};
    console.log(empData)
    EmployeeRepository.createEmployee(empData)
        .then(result => {
            res.redirect('/employee');
        })
        .catch(err => {
            res.render('pages/employee/form', {
                emp: empData,
                pageTitle: 'Nowy pracownik',
                formMode: 'createNew',
                btnLabel: 'Dodaj pracownika',
                formAction: '/employee/add',
                navLocation: 'emp',
                validationErrors: err.errors
            })
        })
}

exports.updateEmployee = (req, res, next) => {
    const empId = req.body.IdEmployee;
    const empData = {...req.body};
    EmployeeRepository.updateEmployee(empId, empData)
        .then(result => {
            res.redirect('/employee');
        })
}

exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.IdEmployee;
    console.log(empId)
    EmployeeRepository.deleteEmployee(empId)
        .then(result => {
            res.redirect('/employee');
        })
}