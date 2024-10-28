const body = document.querySelector(".container")
const wrapper = document.querySelector(".wrapper")

const url = "http://localhost:3000/authors"

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

function createAuthorCard(author){
    const card = document.createElement('div')
    card.classList.add("card")

    const nameField = document.createElement('p')
    nameField.classList.add("name")
    const nameFieldText = document.createTextNode(author.name)
    nameField.appendChild(nameFieldText)

    const bookAmountField = document.createElement('p')
    const bookAmountFieldText = document.createTextNode(`Books amount online: ${author.bookAmount}`)
    bookAmountField.appendChild(bookAmountFieldText)

    card.appendChild(nameField)
    card.appendChild(bookAmountField)    

    if(author.booksId.length){
        const booksField = document.createElement('div')
        booksField.classList.add("list")

        author.booksId.forEach((bookId) => {
            const bookTitleField = document.createElement('p')
            const bookTitleText = document.createTextNode(bookId)
            bookTitleField.appendChild(bookTitleText)
            booksField.appendChild(bookTitleField)
        })  

        card.appendChild(booksField)
    }

    wrapper.appendChild(card)
}

async function displayAuthors(){
    const authors = await fetchData(url)
    if(authors){
        authors.forEach((author) =>{
            createAuthorCard(author)
        })
    }
}

displayAuthors()
