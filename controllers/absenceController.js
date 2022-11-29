const AbsenceRepository = require('../repository/sequelize/AbsenceRepository')
const EmployeeRepository = require('../repository/sequelize/EmployeeRepository')
const ReasonRepository = require('../repository/sequelize/ReasonRepository')

exports.showAbsenceList = (req, res, next) => {
    AbsenceRepository.getAbsences()
        .then(absences => {
            res.render('pages/absence/list', {
                absences: absences,
                navLocation: 'absence'
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
                pageTitle: 'Nowa nieobecność',
                formMode: 'createNew',
                allEmps: allEmps,
                allReasons: allReasons,
                btnLabel: 'Dodaj nieobecność',
                formAction: '/absence/add',
                navLocation: 'absence',
                validationErrors: []
            });
        });
}

exports.showAbsenceDetails = (req, res, next) => {
    const absenceId = req.params.IdAbsence;
    console.log(AbsenceRepository.getPossibleAcceptance())
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
                        pageTitle: 'Szczegóły nieobecności',
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
                        pageTitle: 'Edycja nieobecności',
                        allEmps: allEmps,
                        allReasons: allReasons,
                        btnLabel: 'Edytuj nieobecność',
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
            res.redirect('/absence');
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
                        pageTitle: 'Nowa nieobecność',
                        formMode: 'createNew',
                        allEmps: allEmps,
                        allReasons: allReasons,
                        btnLabel: 'Dodaj nieobecność',
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
            res.redirect('/absence');
        })
}

exports.deleteAbsence = (req, res, next) => {
    const absenceId = req.params.IdAbsence;
    console.log(absenceId)
    AbsenceRepository.deleteAbsence(absenceId)
        .then(result => {
            res.redirect('/absence');
        })
}