const form = document.getElementById('form')
const studentid_input = document.getElementById('studentid-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

const message = document.getElementById("msg")
const strengthMessage = document.getElementById("strength")

//validation submit button
form.addEventListener('submit', (e) => {
    let errors = [] //storing errors

    if(studentid_input){ //determine which is signup or login

        errors = getSignupFormErrors(studentid_input.value, email_input.value, password_input.value, repeat_password_input.value)
    }

    else{
        
        errors = getLoginFormErrors(email_input.value, password_input.value)
    }

    if(errors.length > 0){
        //if there are any errors then prevent submission
        e.preventDefault()
        error_message.innerText = errors.join(". ") //for joining multiple strings of array
    }else {
        alert("data successfully sent!")
    }
})

function getSignupFormErrors(studentid, email, password, repeatPassword){
    let errors = [] //storing errors

    if(studentid === '' || studentid == null){ //if user did not type anything
        errors.push('Studentid is required')
        studentid_input.parentElement.classList.add('incorrect') //assigning the class to change css design
    }
    if(email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password.length < 8){
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password !== repeatPassword){
        errors.push('Password does not match repeated password')
        password_input.parentElement.classList.add('incorrect')
        repeat_password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

function getLoginFormErrors(email, password){
    let errors = []

    if(email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password.length < 8){
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}

//password strength checker
password_input.addEventListener('input', () => {

    //conditions with reg expressions to select
    const containSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password_input.value)
    const containCapitals = /[A-Z]/.test(password_input.value)
    const containNumber = /[0-9]/.test(password_input.value)

    let strength = 0
    if (containSymbols){
        strength += 1
    }
    if (containCapitals){
        strength += 1
    }
    if (containNumber){
        strength += 1
    }

    //show the text
    if(password_input.value.length > 0){
        message.style.display = 'block'
    }
    else{
        message.style.display = 'none'
    }

    if (strength === 0){
        strengthMessage.innerHTML = 'very weak'
        message.style.color = 'red'
    } else if (strength === 1){
        strengthMessage.innerHTML = 'weak'
        message.style.color = '#ff5925'
    } else if (strength === 2){
        strengthMessage.innerHTML = 'medium'
        message.style.color = '#aca90b'
    } else if(strength === 3){
        strengthMessage.innerHTML = 'strong'
        message.style.color = '#26d730'
    }

})






const allInputs = [studentid_input, email_input, password_input, repeat_password_input].filter(input => input != null) //filter array fix putting eventlisteners in unknown elements for login page

//if there is an input then the error styling will go away
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
        input.parentElement.classList.remove('incorrect')
        error_message.innerText = '' //removes error messages
        }
    })
})
