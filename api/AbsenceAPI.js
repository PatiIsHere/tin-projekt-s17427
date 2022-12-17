const AbsenceRepository = require('../repository/sequelize/AbsenceRepository')

exports.getAbsences = (req, res, next) => {
    AbsenceRepository.getAbsences()
        .then(absences => {
            res.status(200).json(absences);
        })
        .catch(err => {
            console.log(err)
        })
};

exports.getAbsenceById = (req, res, next) => {
    const absenceId = req.params.IdAbsence;
    AbsenceRepository.getAbsenceById(absenceId)
        .then(absence => {
            if (!absence) {
                res.status(404).json({
                    message: 'Absence with id: ' + absenceId + ' not found'
                })
            } else {
                res.status(200).json(absence)
            }
        })
}

exports.createAbsence = (req, res, next) => {
    AbsenceRepository.createAbsence(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateAbsence = (req, res, next) => {
    const absenceId = req.params.IdAbsence;
    AbsenceRepository.updateAbsence(absenceId, req.body)
        .then(result => {
            res.status(200).json({message: 'Absence updated!', absence: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteAbsence = (req, res, next) => {
    const absenceId = req.params.IdAbsence;
    AbsenceRepository.deleteAbsence(absenceId)
        .then(result => {
            res.status(200).json({message: 'Removed absence', absence: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};