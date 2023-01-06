function validateForm() {

    const reasonNameInput = document.getElementById('Name');
    const salaryPercentageInput = document.getElementById('SalaryPercentage');

    const errorReasonName = document.getElementById('errorReasonName');
    const errorSalaryPercentage = document.getElementById('errorSalaryPercentage');
    const errorSummary = document.getElementById('errorsSummary');

    const formError = document.getElementById('errorMessage-default-form').innerText;
    const reqError = document.getElementById('errorMessage-required_value').innerText;
    const len2_50Error = document.getElementById('errorMessage-required_2-50signs').innerText;
    const numberError = document.getElementById('errorMessage-required_number').innerText;
    const numberBetween0And1Error = document.getElementById('errorMessage-required_numberBetween0And1').innerText;


    resetErrors([reasonNameInput, salaryPercentageInput], [errorReasonName, errorSalaryPercentage], errorSummary);

    let valid = true;

    if (!checkRequired(reasonNameInput.value)) {
        valid = false;
        reasonNameInput.classList.add("error-input");
        errorReasonName.innerText = reqError;
    } else if (!checkTextLengthRange(reasonNameInput.value, 2, 50)) {
        valid = false;
        reasonNameInput.classList.add("error-input");
        errorReasonName.innerText = len2_50Error;
    }

    if (!checkRequired(salaryPercentageInput.value)) {
        valid = false;
        salaryPercentageInput.classList.add("error-input");
        errorSalaryPercentage.innerText = reqError;
    } else if (!checkNumber(salaryPercentageInput.value)) {
        valid = false;
        salaryPercentageInput.classList.add("error-input");
        errorSalaryPercentage.innerText = numberError;
    } else if (!checkNumberRange(salaryPercentageInput.value, 0, 1)) {
        valid = false;
        salaryPercentageInput.classList.add("error-input");
        errorSalaryPercentage.innerText = numberBetween0And1Error;
    }

    if (!valid) {
        errorSummary.innerText = formError;
    }

    return valid;
}