const registrationForm  = document.getElementById("registration-form")

function submitRegisterForm(event){
    event.preventDefault()
        const formData = new FormData(registrationForm);
        const data = {}
        formData.forEach((value, key) => {
        data[key] = value;
        });

        fetch('http://localhost:3000/users/registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),        
        })
        .then((response) => response.json())
        .then((data)=>{
            console.log("Response data:", data);
            registrationForm.reset();
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
}

registrationForm.addEventListener("submit", submitRegisterForm)
