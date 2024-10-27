const body = document.querySelector(".container")
const wrapper = document.querySelector(".wrapper")

const url = "http://localhost:3000/books"

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

function createBookCard(book){
    const card = document.createElement('div')
    card.classList.add("card")

    const titleField = document.createElement('p')
    titleField.classList.add("name")
    const titleFieldText = document.createTextNode(book.title)
    titleField.appendChild(titleFieldText)

    const authorField = document.createElement('p')
    authorField.classList.add("author")
    const authorFieldText = document.createTextNode(book.author)
    authorField.appendChild(authorFieldText)

    const descriptionField = document.createElement('p')
    const descriptionFieldText = document.createTextNode(book.description)
    descriptionField.appendChild(descriptionFieldText)

    const pagesField = document.createElement('p')
    const pagesFieldText = document.createTextNode(`Pages: ${book.pages}`)
    pagesField.appendChild(pagesFieldText)

    const publishedField = document.createElement('p')
    const publishedAtFieldText = document.createTextNode(`Published: ${book.publishedAt}`)
    publishedField.appendChild(publishedAtFieldText)

    const priceField = document.createElement('p')
    priceField.classList.add("price")
    const priceFieldText = document.createTextNode(`Price: ${book.price}`)
    priceField.appendChild(priceFieldText)

    const stockField = document.createElement('p')
    const stockFieldText = document.createTextNode(`Left: ${book.stock}`)
    stockField.appendChild(stockFieldText)

    card.appendChild(titleField)
    card.appendChild(authorField)
    card.appendChild(descriptionField)
    card.appendChild(pagesField)
    card.appendChild(publishedField)
    card.appendChild(priceField)
    card.appendChild(stockField)

    wrapper.appendChild(card)
}

async function displayBooks(){
    const books = await fetchData(url)
    if(books){
        books.forEach((book) =>{
            createBookCard(book)
        })
    }
}

displayBooks()
