const body = document.querySelector(".container")
const wrapper = document.querySelector(".wrapper")

const url = "http://localhost:3000/wishlists"

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

function createWishlistCard(wishlist){
    const card = document.createElement('div')
    card.classList.add("card")

    const itemAmountField = document.createElement('p')
    itemAmountField.classList.add("name")
    const itemAmountFieldText = document.createTextNode(`Books: ${wishlist.itemAmount}`)
    itemAmountField.appendChild(itemAmountFieldText)

    const totalPriceField = document.createElement('p')
    const totalPriceText = document.createTextNode(`Total price: ${wishlist.totalPrice}`)
    totalPriceField.appendChild(totalPriceText)

    const statusField = document.createElement('p')
    const statusText = document.createTextNode(`Wishlist status: ${wishlist.status}`)
    statusField.appendChild(statusText)

    card.appendChild(itemAmountField)

    if(wishlist.booksId.length){
        const booksField = document.createElement('div')
        booksField.classList.add("list")

        wishlist.booksId.forEach((bookId) => {
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

async function displayWishlists(){
    const wishlists = await fetchData(url)
    if(wishlists){
        wishlists.forEach((wishlist) =>{
            createWishlistCard(wishlist)
        })
    }
}

displayWishlists()
