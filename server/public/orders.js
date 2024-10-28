const body = document.querySelector(".container")
const wrapper = document.querySelector(".wrapper")

const url = "http://localhost:3000/orders"

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

function createOrderCard(order){
    const card = document.createElement('div')
    card.classList.add("card")

    const itemAmountField = document.createElement('p')
    itemAmountField.classList.add("name")
    const itemAmountFieldText = document.createTextNode(`Books: ${order.itemAmount}`)
    itemAmountField.appendChild(itemAmountFieldText)

    const totalPriceField = document.createElement('p')
    const totalPriceText = document.createTextNode(`Total price: ${order.totalPrice}`)
    totalPriceField.appendChild(totalPriceText)

    const statusField = document.createElement('p')
    const statusText = document.createTextNode(`Order status: ${order.status}`)
    statusField.appendChild(statusText)

    card.appendChild(itemAmountField)

    if(order.booksId.length){
        const booksField = document.createElement('div')
        booksField.classList.add("list")

        order.booksId.forEach((bookId) => {
            const bookTitleField = document.createElement('p')
            const bookTitleText = document.createTextNode(bookId)
            bookTitleField.appendChild(bookTitleText)
            booksField.appendChild(bookTitleField)
        }) 
        card.appendChild(booksField)

    }
    card.appendChild(totalPriceField)
    card.appendChild(statusField)

    wrapper.appendChild(card)
}

async function displayOrders(){
    const orders = await fetchData(url)
    if(orders){
        orders.forEach((order) =>{
            createOrderCard(order)
        })
    }
}

displayOrders()
