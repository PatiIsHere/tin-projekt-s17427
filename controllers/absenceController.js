const AbsenceRepository = require('../repository/sequelize/AbsenceRepository')
const EmployeeRepository = require('../repository/sequelize/EmployeeRepository')
const ReasonRepository = require('../repository/sequelize/ReasonRepository')

exports.showAbsenceList = (req, res, next) => {
    AbsenceRepository.getAbsences()
        .then(absences => {
            res.render('pages/absence/list', {
                absences: absences,
                navLocation: 'absence',
                listMode: ''
            });
        });
}

exports.showAbsenceListAfterDel = (req, res, next) => {
    AbsenceRepository.getAbsences()
        .then(absences => {
            res.render('pages/absence/list', {
                absences: absences,
                navLocation: 'absence',
                listMode: 'showInfo',
                infoType: 'deleted'
            });
        });
}

exports.showAbsenceListAfterUpd = (req, res, next) => {
    AbsenceRepository.getAbsences()
        .then(absences => {
            res.render('pages/absence/list', {
                absences: absences,
                navLocation: 'absence',
                listMode: 'showInfo',
                infoType: 'updated'
            });
        });
}

exports.showAbsenceListAfterAdd = (req, res, next) => {
    AbsenceRepository.getAbsences()
        .then(absences => {
            res.render('pages/absence/list', {
                absences: absences,
                navLocation: 'absence',
                listMode: 'showInfo',
                infoType: 'added'
            });
        });
}

exports.showAddAbsenceForm = (req, res, next) => {
    let allEmps, allReasons;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return ReasonRepository.getReasons();
        })
        .then(reasons => {
            allReasons = reasons;
            res.render('pages/absence/form', {
                absence: {},
                pageTitle: req.__('absence.form.add.pageTitle'),
                formMode: 'createNew',
                allEmps: allEmps,
                allReasons: allReasons,
                btnLabel: req.__('absence.form.add.btnLabel'),
                formAction: '/absence/add',
                navLocation: 'absence',
                validationErrors: []
            });
        });
}

exports.showAbsenceDetails = (req, res, next) => {
    const absenceId = req.params.IdAbsence;
    let allEmps, allReasons;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return ReasonRepository.getReasons();
        })
        .then(reasons => {
            allReasons = reasons;
            AbsenceRepository.getAbsenceById(absenceId)
                .then(absence => {
                    res.render('pages/absence/form', {
                        absence: absence,
                        formMode: 'showDetails',
                        pageTitle: req.__('absence.form.details.pageTitle'),
                        allEmps: allEmps,
                        allReasons: allReasons,
                        possibleIsAcceptedValues: AbsenceRepository.getPossibleAcceptance(),
                        formAction: '',
                        navLocation: 'absence',
                        validationErrors: []
                    });
                });
        });
}

exports.showAbsenceEditForm = (req, res, next) => {
    const absenceId = req.params.IdAbsence;
    let allEmps, allReasons;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return ReasonRepository.getReasons();
        })
        .then(reasons => {
            allReasons = reasons;
            AbsenceRepository.getAbsenceById(absenceId)
                .then(absence => {
                    res.render('pages/absence/form', {
                        absence: absence,
                        formMode: 'edit',
                        pageTitle: req.__('absence.form.edit.pageTitle'),
                        allEmps: allEmps,
                        allReasons: allReasons,
                        btnLabel: req.__('absence.form.edit.btnLabel'),
                        formAction: '/absence/edit',
                        navLocation: 'absence',
                        validationErrors: []
                    });
                });
        });
}

//przy add i update trzeba bedzie kombinowac pewnie troche

exports.addAbsence = (req, res, next) => {
    const absenceData = {...req.body};
    let allEmps, allReasons;

    AbsenceRepository.createAbsence(absenceData)
        .then(result => {
            res.redirect('/absence/added');
        })
        .catch(err => {
            EmployeeRepository.getEmployees()
                .then(emps => {
                    allEmps = emps;
                    return ReasonRepository.getReasons();
                })
                .then(reasons => {
                    allReasons = reasons;
                    res.render('pages/absence/form', {
                        absence: absenceData,
                        pageTitle: req.__('absence.form.add.pageTitle'),
                        formMode: 'createNew',
                        allEmps: allEmps,
                        allReasons: allReasons,
                        btnLabel: req.__('absence.form.add.btnLabel'),
                        formAction: '/absence/add',
                        navLocation: 'absence',
                        validationErrors: err.errors
                    });
                });
        })
}
//
exports.updateAbsence = (req, res, next) => {
    const absenceId = req.body.IdAbsence;
    const absenceData = {...req.body};
    AbsenceRepository.updateAbsence(absenceId, absenceData)
        .then(result => {
            res.redirect('/absence/updated');
        })
}

exports.deleteAbsence = (req, res, next) => {
    const absenceId = req.params.IdAbsence;
    AbsenceRepository.deleteAbsence(absenceId)
        .then(result => {
            res.redirect('/absence/deleted');
        })
}