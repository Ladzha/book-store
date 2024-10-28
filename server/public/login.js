const loginForm  = document.getElementById("login-form")

function submitLoginForm(event){
    event.preventDefault()

        const formData = new FormData(loginForm);

        const data = {}

        formData.forEach((value, key) => {
        data[key] = value;
        });

        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),        
        })
        .then((response) => response.json())
        .then((data)=>{
            console.log("Response data:", data);
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
}

loginForm.addEventListener("submit", submitLoginForm)

