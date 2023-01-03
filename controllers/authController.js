const EmployeeRepository = require('../repository/sequelize/EmployeeRepository')

exports.login = (req, res, next) => {
    const email = req.body.Email;
    const password = req.body.Password;

    EmployeeRepository.findByEmail(email)
        .then(emp => {
            console.log("dupa")
            console.log(emp)
            if (!emp) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if (emp.Password == password) {
                req.session.loggedUser = emp;
                res.redirect('/')
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
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