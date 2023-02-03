function validateForm(isPasswordValidated) {

    const firstNameInput = document.getElementById('Name');
    const secondNameInput = document.getElementById('SecondName');
    const lastNameInput = document.getElementById('Surname');
    const emailInput = document.getElementById('Email');
    const passwordInput = document.getElementById('Password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorSecondName = document.getElementById('errorSecondName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorSummary = document.getElementById('errorsSummary');

    const formError = document.getElementById('errorMessage-default-form').innerText;
    const reqError = document.getElementById('errorMessage-required_value').innerText;
    const len2_50Error = document.getElementById('errorMessage-required_2-50signs').innerText;
    const len2_100Error = document.getElementById('errorMessage-required_2-100signs').innerText;
    const len6_100Error = document.getElementById('errorMessage-required_6-100signs').innerText;
    const emailError = document.getElementById('errorMessage-required_email').innerText;

    if (!isPasswordValidated) {
        resetErrors([firstNameInput, secondNameInput, lastNameInput, emailInput], [errorFirstName, errorSecondName, errorLastName, errorEmail], errorSummary);
    } else {
        resetErrors([firstNameInput, secondNameInput, lastNameInput, emailInput, passwordInput], [errorFirstName, errorSecondName, errorLastName, errorEmail, errorPassword], errorSummary);
    }

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqError;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 50)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = len2_50Error;
    }

    if (!checkTextLengthRange(secondNameInput.value, 0, 50)) {
        valid = false;
        secondNameInput.classList.add("error-input");
        errorSecondName.innerText = len2_50Error;
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqError;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 100)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = len2_100Error;
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqError;
    } else if (!checkTextLengthRange(emailInput.value, 6, 100)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = len6_100Error;
    }
    if (isPasswordValidated) {
        if (!checkRequired(passwordInput.value)) {
            valid = false;
            passwordInput.classList.add("error-input");
            errorPassword.innerText = reqError
        }
    }

    if (!valid) {
        errorSummary.classList.add("error-input")
        errorSummary.innerText = formError
    }

    return valid;
}