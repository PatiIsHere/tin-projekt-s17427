function validateForm() {

    const firstNameInput = document.getElementById('Name');
    const secondNameInput = document.getElementById('SecondName');
    const lastNameInput = document.getElementById('Surname');
    const emailInput = document.getElementById('Email');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorSecondName = document.getElementById('errorSecondName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, secondNameInput, lastNameInput, emailInput], [errorFirstName, errorSecondName, errorLastName, errorEmail], errorSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 50)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if (!checkTextLengthRange(secondNameInput.value, 0, 50)) {
        valid = false;
        secondNameInput.classList.add("error-input");
        errorSecondName.innerText = "Pole powinno zawierać do 50 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 100)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 100 znaków";
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(emailInput.value, 6, 100)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 6 do 100 znaków";
    }

    if (!valid) {
        errorSummary.classList.add("error-input")
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}