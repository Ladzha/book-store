const body = document.querySelector(".container")
const wrapper = document.querySelector(".wrapper")
const dataBlock = document.querySelector(".dataBlock")
const title = document.querySelector(".title")

const registrationButton = document.querySelector(".registrationButton")
const loginButton = document.querySelector(".loginButton")
const categoriesButton = document.querySelector(".categoriesButton")
const genresButton = document.querySelector(".genresButton")
const authorsButton = document.querySelector(".authorsButton")
const booksButton = document.querySelector(".booksButton")
const usersButton =document.querySelector(".usersButton")

categoriesButton.addEventListener("click", () => displayElementsList("categories"))
genresButton.addEventListener("click", () => displayElementsList("genres"))
authorsButton.addEventListener("click", () => displayElementsList("authors"))
booksButton.addEventListener("click", () => displayElementsList("books"))
usersButton.addEventListener("click", () => displayElementsList("users"))


async function fetchAllElements(elements){
    const allElementsUrl = `http://localhost:3000/${elements}`
    try {
        const response = await fetch(allElementsUrl)
        if(!response.ok){
            throw new Error (`Response status: ${response.status}`)
        }
        const jsonData = await response.json() 
        return jsonData     
    } catch (error) {
        console.log(error.message);    
    }
}

async function fetchOneElementById(elements, elementId){
    const oneElementByIdUrl = `http://localhost:3000/${elements}/${elementId}`
    try {
        const response = await fetch(oneElementByIdUrl)
        if(!response.ok){
            throw new Error (`Response status: ${response.status}`)
        }
        const jsonData = await response.json() 
        return jsonData     
    } catch (error) {
        console.log(error.message);    
    }
}

async function updateElementById(elements, elementId){
    const oneElementByIdUrl = `http://localhost:3000/${elements}/${elementId}`
    try {
        const response = await fetch(oneElementByIdUrl)
        if(!response.ok){
            throw new Error (`Response status: ${response.status}`)
        }
        const jsonData = await response.json() 
        return jsonData     
    } catch (error) {
        console.log(error.message);    
    }
}

async function deleteElementById(elements, elementId){
    const oneElementByIdUrl = `http://localhost:3000/${elements}/${elementId}`
    try {
        const response = await fetch(oneElementByIdUrl, {
            method: 'DELETE',
        })
        if(response.ok){
            console.log('Item deleted successfully');
        }else{
            const errorData = await response.json();
            console.error('Error:', errorData.message); 
        }
    } catch (error) {
        console.log(error.message);    
    }
}


async function displayElementsList(elements){
    dataBlock.innerHTML = null
    const elementsData = await fetchAllElements(elements)
    if(!elementsData) return
    if(elementsData){
        elementsData.forEach((element) =>{
            createElementCard(element)
        })
    }
    // createButton("Add", dataBlock, handleAdd)
}

function handleDelete(elements, id){
    deleteElementById(elements, id)
    console.log("DELETED");
}

function handleUpdate(){
    console.log("UPDATE");
}

function handleAdd(){
    console.log("ADDED");
}

function createButton(buttonName, parent, handleFunction){
    const newButton = document.createElement('button');
    newButton.classList.add("button");
    newButton.innerHTML = buttonName;
    newButton.addEventListener("click", handleFunction)
    parent.appendChild(newButton)
}

function createActionButtonBlock(){
    const actionButtonBlock = document.createElement('div');
    actionButtonBlock.classList.add("actionButtonBlock");
    createButton("Update", actionButtonBlock, handleUpdate)
    createButton("Delete", actionButtonBlock, handleDelete)
    dataBlock.appendChild(actionButtonBlock)
}



function createElementCard(element){
    const card = document.createElement('div');
    card.classList.add("card");

    const nameField = document.createElement('p');
    nameField.classList.add("name");
    const nameFieldText = document.createTextNode(element.name);
    nameField.appendChild(nameFieldText);
    card.appendChild(nameField);


    // const bookAmountField = document.createElement('p')
    // const bookAmountFieldText = document.createTextNode(`Books amount online: ${author.bookAmount}`)
    // bookAmountField.appendChild(bookAmountFieldText)

    // card.appendChild(bookAmountField)    

    // if(author.booksId.length){
    //     const booksField = document.createElement('div')
    //     booksField.classList.add("list")

    //     author.booksId.forEach((bookId) => {
    //         const bookTitleField = document.createElement('p')
    //         const bookTitleText = document.createTextNode(bookId)
    //         bookTitleField.appendChild(bookTitleText)
    //         booksField.appendChild(bookTitleField)
    //     })  

    //     card.appendChild(booksField)
    // }

    dataBlock.appendChild(card)

    // createActionButtonBlock()
 
}