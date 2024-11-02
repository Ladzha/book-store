const body = document.querySelector(".container")
const wrapper = document.querySelector(".wrapper")

const url = "http://localhost:3000/genres"

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

function createGenreCard(genre){
    const card = document.createElement('div')
    card.classList.add("card")

    const nameField = document.createElement('p')
    nameField.classList.add("name")
    const nameFieldText = document.createTextNode(genre.name)
    nameField.appendChild(nameFieldText)

    card.appendChild(nameField)

    if(genre.booksId.length){
        const booksField = document.createElement('div')
        booksField.classList.add("list")

        genre.booksId.forEach((bookId) => {
            const bookTitleField = document.createElement('p')
            const bookTitleText = document.createTextNode(bookId)
            bookTitleField.appendChild(bookTitleText)
            booksField.appendChild(bookTitleField)
        })  

        card.appendChild(booksField)
    }

    wrapper.appendChild(card)
}

async function displayGenres(){
    const genres = await fetchData(url)
    if(genres){
        genres.forEach((genre) =>{
            createGenreCard(genre)
        })
    }
}

displayGenres()
