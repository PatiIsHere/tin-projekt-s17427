const ReasonRepository = require('../repository/sequelize/ReasonRepository')

exports.showReasonList = (req, res, next) => {
    ReasonRepository.getReasons()
        .then(reasons => {
            res.render('pages/reason/list', {
                reasons: reasons,
                navLocation: 'reason',
                listMode: ''
            });
        });
}

exports.showReasonListAfterDel = (req, res, next) => {
    ReasonRepository.getReasons()
        .then(reasons => {
            res.render('pages/reason/list', {
                reasons: reasons,
                navLocation: 'reason',
                listMode: 'showInfo',
                infoType: 'deleted'
            });
        });
}

exports.showReasonListAfterUpd = (req, res, next) => {
    ReasonRepository.getReasons()
        .then(reasons => {
            res.render('pages/reason/list', {
                reasons: reasons,
                navLocation: 'reason',
                listMode: 'showInfo',
                infoType: 'updated'
            });
        });
}

exports.showReasonListAfterAdd = (req, res, next) => {
    ReasonRepository.getReasons()
        .then(reasons => {
            res.render('pages/reason/list', {
                reasons: reasons,
                navLocation: 'reason',
                listMode: 'showInfo',
                infoType: 'added'
            });
        });
}

exports.showAddReasonForm = (req, res, next) => {
    res.render('pages/reason/form', {
        reason: {},
        pageTitle: req.__('reason.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('reason.form.add.btnLabel'),
        formAction: '/reason/add',
        navLocation: 'reason',
        validationErrors: []
    });
}

exports.showReasonDetails = (req, res, next) => {
    const reasonId = req.params.IdReason;

    ReasonRepository.getReasonById(reasonId)
        .then(reason => {
            res.render('pages/reason/form', {
                reason: reason,
                formMode: 'showDetails',
                pageTitle: req.__('reason.form.details.pageTitle'),
                formAction: '',
                navLocation: 'reason',
                validationErrors: []
            });
        })
}

exports.showReasonEditForm = (req, res, next) => {
    const reasonId = req.params.IdReason;
    ReasonRepository.getReasonById(reasonId)
        .then(reason => {
            res.render('pages/reason/form', {
                reason: reason,
                formMode: 'edit',
                pageTitle: req.__('reason.form.edit.pageTitle'),
                btnLabel: req.__('reason.form.edit.btnLabel'),
                formAction: '/reason/edit',
                navLocation: 'reason',
                validationErrors: []
            });
        })

}

exports.addReason = (req, res, next) => {
    const reasonData = {...req.body};
    console.log(reasonData)
    ReasonRepository.createReason(reasonData)
        .then(result => {
            res.redirect('/reason/added');
        })
        .catch(err => {
            res.render('pages/reason/form', {
                reason: reasonData,
                pageTitle: req.__('reason.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('reason.form.add.btnLabel'),
                formAction: '/reason/add',
                navLocation: 'reason',
                validationErrors: err.errors
            })
        })
}

exports.updateReason = (req, res, next) => {
    const reasonId = req.body.IdReason;
    const reasonData = {...req.body};
    ReasonRepository.updateReason(reasonId, reasonData)
        .then(result => {
            res.redirect('/reason/updated');
        })
}

exports.deleteReason = (req, res, next) => {
    const reasonId = req.params.IdReason;
    console.log(reasonId)
    ReasonRepository.deleteReason(reasonId)
        .then(result => {
            res.redirect('/reason/deleted');
        })
}