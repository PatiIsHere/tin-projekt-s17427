const EmployeeRepository = require('../repository/sequelize/EmployeeRepository')

exports.getEmployees = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err)
        })
};