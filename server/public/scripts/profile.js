const body = document.querySelector(".container")
const wrapper = document.querySelector(".wrapper")

async function fetchData(url){
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw new Error (`Response status: ${response.status}`)
        }
        const jsonData = await response.json() 
        return jsonData     
    } catch (error) {
        console.log(error.message);    
    }
}

function createUserCard(user){
    const card = document.createElement('div')
    card.classList.add("card")

    const nameField = document.createElement('p')
    nameField.classList.add("name")
    const nameFieldText = document.createTextNode(`${user.firstName} ${user.lastName}`)
    nameField.appendChild(nameFieldText)

    const emailField = document.createElement('p')
    const emailText = document.createTextNode(user.email)
    emailField.appendChild(emailText)

    card.appendChild(nameField)
    card.appendChild(emailField)

    wrapper.appendChild(card)
}

async function displayUsers(id){
    const url = `http://localhost:3000/users/${id}`
    const user = await fetchData(url)
    createUserCard(user)
}

displayUsers(1)
