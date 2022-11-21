function resetErrors(inputs, errorText, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorText.length; i++) {
        errorText[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;

}

function checkTextLengthRange(value, min, max) {
    // && min <> 0?
    if (min === 0 && !value) {
        return true;
    }

    if (!value) {
        return false;
    }

    value = value.toString().trim();

    const length = value.length;

    if (max && length > max) {
        return false;
    }

    if (min && length < min) {
        return false;
    }

    return true;
}

function checkNumber(value) {
    if (!value) {
        return false;
    }
    return true;
}

function checkNumberRange(value, min, max) {
    if (!checkNumber(value)) {
        return false;
    }

    val = value.value;

    if (val > max) {
        return false;
    }
    if (val < min) {
        return false;
    }
    return true;
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function checkDateIsAfter(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }
    if (!pattern.test(compareTo)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() < compareToDate.getTime()) {
        return false;
    }
    return true;
}