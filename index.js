import { menuArray } from "./data.js"

document.addEventListener("click", function(event){
    if (event.target.dataset.addBtn) {
        !document.getElementById("order-items") ? renderOrder() : null
        handleAddBtnClick(event.target.dataset.addBtn)
    } else if (event.target.dataset.removeBtn) {
        handleRemoveBtnClick(event.target.dataset.removeBtn)
    } else if (event.target.id === "order-btn") {
        renderModal()
    } else if (event.target.id === "1" || event.target.id === "2" || event.target.id === "3" ||event.target.id === "4" || event.target.id === "5") {
        renderFeedback(event.target.id)
    }
})

document.getElementById("order-form").addEventListener("submit", function(event){
    handlePayBtnClick(event)
})

function renderOrder() { 
    document.getElementById("order-section").innerHTML = 
    `
    <div class="order-container" id="order-container">
        <h2 class="order-title">Your order</h2>
        <div class="order-items" id="order-items"></div>
        <div class="total-price">
            <h3 class="item-title">Total price:</h3>
            <p class="item-price" id="item-price">$0</p>
        </div>
        <button class="order-btn" id="order-btn">Complete order</button>    
    </div>
    `
}

function handleAddBtnClick(itemId) {
    const menuItem = menuArray.filter(item => 
        item.id == itemId
    )[0]
    
    if (!document.getElementById(`item-title-${menuItem.id}`)) {
        Array.from(document.getElementsByClassName("padding-bottom")).forEach(div => 
            div.classList.remove("padding-bottom")
        )
        
        document.getElementById("order-items").innerHTML += 
    `
    <div class="order-list padding-bottom">
        <h3 class="item-title" id="item-title-${menuItem.id}">${menuItem.name}</h3>
        <button 
            class="remove-item-btn" 
            data-remove-btn="${menuItem.id}">remove
        </button>
        <p class="item-price">$${menuItem.price}</p>
    </div>
    `
    }
    
    calculateTotalPrice()
}

function calculateTotalPrice() {
    const priceElements = document.getElementById("order-items").getElementsByClassName("item-price")
    const priceArr = Array.from(priceElements).map(element => 
        parseInt(element.textContent.split("$")[1])
    )
    const totalPrice = priceArr.reduce((total, currentPrice) => total + currentPrice)
    
    renderTotalPrice(totalPrice)
}

function renderTotalPrice(totalPrice) {
    document.getElementById("item-price").textContent = `$${totalPrice}`
}

function handleRemoveBtnClick(itemId) {
    document.getElementById(`item-title-${itemId}`).parentElement.remove()
    if (Array.from(document.getElementsByClassName("order-list")).length > 0) {
        const lastElement = Array.from(document.getElementsByClassName("order-list")).slice(-1)[0]
        !lastElement.classList.contains("padding-bottom") ? 
        lastElement.classList.add("padding-bottom") : null
        calculateTotalPrice()
    } else {
        document.getElementById("order-container").remove()
    }
}

function renderModal() {
    document.getElementById("modal-container").classList.remove("no-display")
}

function handlePayBtnClick(event) {
    event.preventDefault()
    document.getElementById("modal-container").classList.add("no-display")
    renderReceipt(document.getElementById("name").value)
    document.getElementById("order-form").reset()
}

function renderReceipt(name) {
    const nameTitleCase = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()
    document.getElementById("order-section").innerHTML = 
    `<div class="order-receipt">
        <h2 class="user-receipt">Thanks, ${nameTitleCase}! Your order is on it's way!</h2>
    </div>`
    renderReview()
}

function renderReview() {
    document.getElementById("order-section").innerHTML += 
    `
    <h2 class="rate" id="rate">Rate our service</h2>
    <div class="order-review">
        <i class="fa-regular fa-star" id="1"></i>
        <i class="fa-regular fa-star" id="2"></i>
        <i class="fa-regular fa-star" id="3"></i>
        <i class="fa-regular fa-star" id="4"></i>
        <i class="fa-regular fa-star" id="5"></i>
    </div>
    `
}

function renderFeedback(starNumber) {
    const stars = Array.from(document.getElementsByClassName("fa-star"))
    stars.forEach((star, index) => {
        if (star.classList.contains("fa-solid")) {
            star.classList.remove("fa-solid")
            star.classList.add("fa-regular")
        }
          
        if (index < parseInt(starNumber)) {
            star.classList.remove("fa-regular")
            star.classList.add("fa-solid")
        }
    })
    document.getElementById("rate").textContent = "Thanks for the feedback!" 
}

function getAllMenuItems() {
    return menuArray.map(item => {
        const {name, ingredients, id, price, emoji} = item
        return `
        <div class="item-container">
            <p class="item-graphic">${emoji}</p>
            <div class="food-container">
                <h2 class="item-title">${name}</h2>
                <p class="item-desc">${ingredients}</p>
                <p class="item-price">$${price}</p>
            </div>
            <button class="add-btn" data-add-btn="${id}">+</button>
        </div>
        `
    }).join('')
}

function renderMenuItems() {
    document.getElementById("menu-section").innerHTML = getAllMenuItems()
}

renderMenuItems()