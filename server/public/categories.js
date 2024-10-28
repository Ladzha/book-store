const body = document.querySelector(".container")
const wrapper = document.querySelector(".wrapper")

const url = "http://localhost:3000/categories"

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

function createCategoryCard(category){
    const card = document.createElement('div')
    card.classList.add("card")

    const nameField = document.createElement('p')
    nameField.classList.add("name")
    const nameFieldText = document.createTextNode(category.name)
    nameField.appendChild(nameFieldText)

    card.appendChild(nameField)

    if(category.genresId.length){
        const genresField = document.createElement('div')
        genresField.classList.add("list")

        console.log(category.genresId);

        category.genresId.forEach((genreId) => {
            const genreNameField = document.createElement('p')
            const genreNameFieldText = document.createTextNode(genreId)
            genreNameField.appendChild(genreNameFieldText)
            genresField.appendChild(genreNameField)
        })  

        card.appendChild(genresField)
    }

    wrapper.appendChild(card)
}

async function displayCategories(){
    const categories = await fetchData(url)
    if(categories){
        categories.forEach((category) =>{
            createCategoryCard(category)
        })
    }
}

displayCategories()
