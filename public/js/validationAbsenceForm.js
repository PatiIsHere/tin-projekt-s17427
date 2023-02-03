function validateForm(isDateValidated) {
    //sprawdzic czy jest pusty string jako id z formularza i jak jest to zalaczyc walidacje dat
    //jak nie to przejsc

    //dodac to argumentow funkcji dwa parametry - currenct DateFrom/ currentDateTo i jak sa rozne to walidacja
    //a jak takie same to nie uruchamiaj walidacji

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

    const formError = document.getElementById('errorMessage-default-form').innerText;
    const reqError = document.getElementById('errorMessage-required_value').innerText;
    const dateToBeforeDateFromError = document.getElementById('errorMessage-dateToBeforeDateFrom').innerText;
    const dateFormatError = document.getElementById('errorMessage-dateFormat').innerText;
    const dateFromPastError = document.getElementById('errorMessage-dateFromPast').innerText;

    resetErrors([reasonNameInput, dateFromInput, dateToInput, employeeInput, isAcceptedInput]
        , [errorReasonName, errorDateFrom, errorDateTo, errorEmployee, errorIsAccepted], errorSummary);

    let valid = true;

    if (!checkRequired(reasonNameInput.value)) {
        valid = false;
        reasonNameInput.classList.add("error-input");
        errorReasonName.innerText = reqError;
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

    if (isDateValidated) {

        if (!checkRequired(dateFromInput.value)) {
            valid = false;
            dateFromInput.classList.add("error-input");
            errorDateFrom.innerText = reqError;
        } else if (!checkDate(dateFromInput.value)) {
            valid = false;
            dateFromInput.classList.add("error-input");
            errorDateFrom.innerText = dateFormatError;
        } else if (!checkDateIsAfter(dateFromInput.value, nowString)) {
            valid = false;
            dateFromInput.classList.add("error-input");
            errorDateFrom.innerText = dateFromPastError;
        }
    }
    if (!checkRequired(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqError;
    } else if (!checkDate(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = dateFromPastError;
    } else if (!checkDateIsAfter(dateToInput.value, dateFromInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = dateToBeforeDateFromError;
    }


    if (!checkRequired(employeeInput.value)) {
        valid = false;
        employeeInput.classList.add("error-input");
        errorEmployee.innerText = reqError;
    }

    if (!checkRequired(isAcceptedInput.value)) {
        valid = false;
        isAcceptedInput.classList.add("error-input");
        errorIsAccepted.innerText = reqError;
    }

    if (!valid) {
        errorSummary.innerText = formError;
    }

    return valid;
}