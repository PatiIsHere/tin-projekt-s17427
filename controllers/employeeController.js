const EmployeeRepository = require('../repository/sequelize/EmployeeRepository')

exports.showEmployeeList = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list', {
                emps: emps,
                navLocation: 'emp',
                listMode: ''
            });
        });
}

exports.showEmployeeListAfterDel = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list', {
                emps: emps,
                navLocation: 'emp',
                listMode: 'showInfo',
                infoType: 'deleted'
            });
        });
}

exports.showEmployeeListAfterUpd = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list', {
                emps: emps,
                navLocation: 'emp',
                listMode: 'showInfo',
                infoType: 'updated'
            });
        });
}

exports.showEmployeeListAfterAdd = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list', {
                emps: emps,
                navLocation: 'emp',
                listMode: 'showInfo',
                infoType: 'added'
            });
        });
}

exports.showAddEmployeeForm = (req, res, next) => {
    res.render('pages/employee/form', {
        emp: {},
        pageTitle: req.__('employee.form.add.pageTitle'),
        btnLabel: req.__('employee.form.add.btnLabel'),
        formMode: 'createNew',
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
                pageTitle: req.__('employee.form.details.pageTitle'),
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
                pageTitle: req.__('employee.form.edit.pageTitle'),
                btnLabel: req.__('employee.form.edit.btnLabel'),
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
            res.redirect('/employee/added');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('Email') && e.type == 'unique violation') {
                    e.message = req.__('error.uniqueEmail');
                }
            });
            res.render('pages/employee/form', {
                emp: empData,
                pageTitle: req.__('employee.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('employee.form.add.btnLabel'),
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
            res.redirect('/employee/updated');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('Email') && e.type == 'unique violation') {
                    e.message = "Podany adres email jest już używany";
                }
            });
            EmployeeRepository.getEmployeeById(empId)
                .then(emp => {
                    res.render('pages/employee/form', {
                        emp: emp,
                        formMode: 'edit',
                        pageTitle: req.__('employee.form.edit.pageTitle'),
                        btnLabel: req.__('employee.form.edit.btnLabel'),
                        formAction: '/employee/edit',
                        navLocation: 'emp',
                        validationErrors: err.errors
                    });
                })
        })
}

exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.IdEmployee;
    console.log(empId)
    EmployeeRepository.deleteEmployee(empId)
        .then(result => {
            res.redirect('/employee/deleted');
        })
}