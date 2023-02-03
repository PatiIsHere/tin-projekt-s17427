const EmployeeRepository = require('../repository/sequelize/EmployeeRepository')
const authUtil = require('../util/authUtils')

exports.login = (req, res, next) => {
    const email = req.body.Email;
    const password = req.body.Password;

    EmployeeRepository.findByEmail(email)
        .then(emp => {
            if (!emp) {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('error.login')
                })
            } else if (authUtil.comparePassword(password, emp.Password)) {
                req.session.loggedUser = emp;
                res.redirect('/')
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('error.login')
                })
            }
        })
        .catch(err => {
            console.log(err)
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}