const ReasonRepository = require('../repository/sequelize/ReasonRepository')

exports.getReasons = (req, res, next) => {
    ReasonRepository.getReasons()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err)
        })
};

exports.getReasonById = (req, res, next) => {
    const reasonId = req.params.IdReason;
    ReasonRepository.getReasonById(reasonId)
        .then(reason => {
            if (!reason) {
                res.status(404).json({
                    message: 'Reason with id: ' + reasonId + ' not found'
                })
            } else {
                res.status(200).json(reason)
            }
        })
}

exports.createReason = (req, res, next) => {
    ReasonRepository.createReason(req.body)
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

exports.updateReason = (req, res, next) => {
    const reasonId = req.params.IdReason;
    ReasonRepository.updateReason(reasonId, req.body)
        .then(result => {
            res.status(200).json({message: 'Reason updated!', reason: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteReason = (req, res, next) => {
    const reasonId = req.params.IdReason;
    ReasonRepository.deleteReason(reasonId)
        .then(result => {
            res.status(200).json({message: 'Removed reason', reason: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};