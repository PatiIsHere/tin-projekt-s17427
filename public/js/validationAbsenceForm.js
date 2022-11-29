function validateForm() {

    const reasonNameInput = document.getElementById('IdReason');
    const dateFromInput = document.getElementById('DateFrom');
    const dateToInput = document.getElementById('DateTo');
    const employeeInput = document.getElementById('IdEmployee');
    const isAcceptedInput = document.getElementById('IsAccepted');


    const errorReasonName = document.getElementById('errorReasonName');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorDateTo');
    const errorEmployee = document.getElementById('errorEmployee');
    const errorIsAccepted = document.getElementById('errorIsAccepted');
    const errorSummary = document.getElementById('errorsSummary');

    resetErrors([reasonNameInput, dateFromInput, dateToInput, employeeInput, isAcceptedInput]
        , [errorReasonName, errorDateFrom, errorDateTo, errorEmployee, errorIsAccepted], errorSummary);

    let valid = true;

    if (!checkRequired(reasonNameInput.value)) {
        valid = false;
        reasonNameInput.classList.add("error-input");
        errorReasonName.innerText = "Pole jest wymagane";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = '' + nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd";
    } else if (!checkDateIsAfter(dateFromInput.value, nowString)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data nie może być z przeszłości";
    }

    if (!checkRequired(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd";
    } else if (!checkDateIsAfter(dateToInput.value, dateFromInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Data zakończenia nie może być przed datą rozpoczęcia";
    }

    if (!checkRequired(employeeInput.value)) {
        valid = false;
        employeeInput.classList.add("error-input");
        errorEmployee.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(isAcceptedInput.value)) {
        valid = false;
        isAcceptedInput.classList.add("error-input");
        errorIsAccepted.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}