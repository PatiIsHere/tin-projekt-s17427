function validateForm() {

    const reasonNameInput = document.getElementById('Name');
    const salaryPercentageInput = document.getElementById('SalaryPercentage');

    const errorReasonName = document.getElementById('errorReasonName');
    const errorSalaryPercentage = document.getElementById('errorSalaryPercentage');
    const errorSummary = document.getElementById('errorsSummary');

    resetErrors([reasonNameInput, salaryPercentageInput], [errorReasonName, errorSalaryPercentage], errorSummary);

    let valid = true;

    if (!checkRequired(reasonNameInput.value)) {
        valid = false;
        reasonNameInput.classList.add("error-input");
        errorReasonName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(reasonNameInput.value, 2, 50)) {
        valid = false;
        reasonNameInput.classList.add("error-input");
        errorReasonName.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if (!checkRequired(salaryPercentageInput.value)) {
        valid = false;
        salaryPercentageInput.classList.add("error-input");
        errorSalaryPercentage.innerText = "Pole jest wymagane";
    } else if (!checkNumber(salaryPercentageInput)) {
        valid = false;
        salaryPercentageInput.classList.add("error-input");
        errorSalaryPercentage.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(salaryPercentageInput, 0, 100)) {
        valid = false;
        salaryPercentageInput.classList.add("error-input");
        errorSalaryPercentage.innerText = "Pole powinno być liczbą w zakresie 0.00 do 1.00";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}