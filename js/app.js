class Store {
    constructor() {

        // track how many items are in the cart and the subtotal of the items
        this.itemInCart = {
            itemCount: 0,
            subtotal: 0,
            price: 0,
            subTimeQty: 0,
            tax: 0,
            deliveryFee: 6,
            total: 0
        }

        this.menu = {

            item1: {
                id: 1,
                dish: "steak & garlic potatoes",
                imgUrl: "images/steak.jpeg",
                alt: "steak and garlic potatoes",
                desc: "A tender juicy steak with roasted delicious garlic potatoes on the side.",
                price: 15.99,
                qty: 0
            },
            item2: {
                id: 2,
                dish: "cajun pasta",
                imgUrl: "images/cajun.jpeg",
                alt: "cajun pasta",
                desc: "Spicy cajun pasta with sausage, shrimp, and chicken covered in creamy cheesy sauce.",
                price: 14.99,
                qty: 0
            },
            item3: {
                id: 3,
                dish: "creamy mushroom chicken",
                imgUrl: "images/mushroom.jpeg",
                alt: "creamy mushroom with grilled chicken",
                desc: "Pan cooked seasoned chicken with mushrooms, and spinach all coated with a creamy savory sauce.",
                price: 10.99,
                qty: 0
            },
            item4: {
                id: 4,
                dish: "chicken avacado wrap",
                imgUrl: "images/chicken_avacado.jpeg",
                alt: "sliced chicken with avacado",
                desc: "Burrito wrapped sliced chicken stuffed with avacado.",
                price: 9.99,
                qty: 0
            }, 
            item5: {
                id: 5,
                dish: "beef nachos",
                imgUrl: "images/beef_nachos.jpeg",
                alt: "beef nachos with melted cheese",
                desc: "Cooked beef on top of chips, coated with stringy melted cheese, jalapenos, and salsa.",
                price: 10.99,
                qty: 0
            },
            item6: {
                id: 6,
                dish: "bacon cheese burger",
                imgUrl: "images/cheese_burger.jpeg",
                alt: "juicy bacon cheese burger",
                desc: "Double stacked patties on buttered toasted buns with cheese, bacon, ketchup, and other tops of your choice.",
                price: 12.99,
                qty: 0
            },
            item7: {
                id: 7,
                dish: "honey lemon pepper wings",
                imgUrl: "images/lemon_pepper_wings.jpeg",
                alt: "honey lemon pepper wings",
                desc: "10 piece wings coated in lemony honey sauce with a kick of hot sauce.",
                price: 10.99,
                qty: 0
            },
            item8: {
                id: 8,
                dish: "spicy fried chicken sandwich",
                imgUrl: "images/spicy_chicken.jpeg",
                alt: "spicy chicken sandwich",
                desc: "Cripsy spicy fried chicken sandwich with a special sauce, cheese, tomato, and lettuce.",
                price: 7.99,
                qty: 0
            }
        }
    }

    init() {
        // console.log("initialized")
        this.loadItems()
        this.addToCart()
        this.checkout()
        this.homeSwitch()
        this.confirmOrder()
    }
    
    loadItems() {
        const itemDiv = document.getElementById('itemDiv')
        
        /**
         *  for in loop
         * 
         *  for in loop loops through properties of an object
         */
        for (const key in this.menu) {
            const item = this.menu[key]

            const product = document.createElement('div')
            product.className = 'col'
            product.setAttribute('id', `item-${item.id}`)

            product.innerHTML = `
                <figure class="figure item-figure">
                    <img src="${item.imgUrl}" alt="${item.alt}" class="img-fluid image item-image figure-img">
                    <figcaption class="figure-caption item-caption">${item.dish}
                        <span class="item-price" id="itemPrice">${item.price}</span>
                    </figcaption>
                    <p class="item-desc" id="itemDesc">${item.desc}</p>
                    <button class="btn menu-btn btn-danger text-capitalize" id="menuBtn" data-id="${item.id}">add to cart</button>
                </figure>
            `
            itemDiv.appendChild(product)
        }
    }

    addToCart() {
        const menuButtons = document.querySelectorAll('.menu-btn')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        const deliveryValue = document.getElementById('deliveryValue')
        const checkoutItemCount = document.getElementById('checkoutItemCount')
        let taxRate = .07
        const totalValue = document.getElementById('totalValue')

        //loop through this.menu
        for (const key in this.menu) {
            const item = this.menu[key]

            // loop through buttons
            menuButtons.forEach(button => {
                button.addEventListener('click', ()=> {
                    if (button.dataset['id'] == item.id) {
                        this.itemInCart.itemCount++
                        this.itemInCart.price+= item.price
                        this.itemInCart.subtotal = this.itemInCart.price

                        item.qty++

                        this.itemInCart.subTimeQty = (item.price * item.qty).toFixed(2)
                        this.itemInCart.tax = this.itemInCart.subtotal * taxRate
                        this.itemInCart.total = (this.itemInCart.subtotal + this.itemInCart.tax + this.itemInCart.deliveryFee).toFixed(2)
                    }


                    // sending to DOM
                    cartItems.innerText = this.itemInCart.itemCount
                    cartSubtotal.innerText = this.itemInCart.price.toFixed(2)
                    subtotalValue.innerText = this.itemInCart.subtotal.toFixed(2)
                    deliveryValue.innerText = this.itemInCart.deliveryFee.toFixed(2)
                    taxValue.innerText = this.itemInCart.tax.toFixed(2)
                    totalValue.innerText = this.itemInCart.total

                    if (this.itemInCart.itemCount == 1) {
                        checkoutItemCount.innerText = `${this.itemInCart.itemCount} item`
                    } else {
                        checkoutItemCount.innerText = `${this.itemInCart.itemCount} items` 
                    }
                })
            })
        }
    }

    checkout() {
        const cartBtn = document.getElementById('cartBtn')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')
        const tableBody = document.getElementById('tbody')

        let subTimeQty = 0

        cartBtn.addEventListener('click', ()=> {
            // console.log('click')
            if (menuSection.classList.contains('d-none')) return

            checkoutPage.classList.remove('d-none')
            menuSection.classList.add('d-none')

            for (const key in this.menu) {
                const item = this.menu[key]

                if (item.qty > 0) {
                    subTimeQty = (item.qty * item.price).toFixed(2)

                    const tableRow =  document.createElement('tr')
                    tableRow.className = 'item-checkout'

                    tableRow.innerHTML+= `
                        <td id="itemImg">
                            <img src= "${item.imgUrl}" alt="${item.alt}" class="img-fluid item-img />"
                        </td>
                        <td class="unit-price">${item.price.toFixed(2)}</td>
                        <td class="item-quantity>${item.qty}</td>
                        <td class="item-subtotal">${subTimeQty}</td>
                    `

                    tableBody.appendChild(tableRow)
                }
            }
        })
    }

    homeSwitch() {
        const homeSwitch = document.querySelector('.home-switch')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')

        homeSwitch.style.cursor = 'pointer'

        homeSwitch.addEventListener('click', ()=> {
            // console.log('clicked')
            menuSection.classList.remove('d-none')
            checkoutPage.classList.add('d-none')

            const tableBody = document.getElementById('tbody')
            tableBody.innerHTML = ''
        })
    }

    confirmOrder() {
        const confirmBtn = document.getElementById('confirmBtn')
        const tableBody = document.getElementById('tbody')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        const totalValue = document.getElementById('totalValue')

        confirmBtn.addEventListener('click', ()=> {
            // this.itemInCart.itemCount = 0
            // this.itemInCart.subtotal = 0
            for (const key in this.itemInCart) {
                const item = this.itemInCart[key]
            }



            tableBody.innerHTML = '<h2>Your order has been confirmed!</h2>'

            cartItems.innerText = this.itemInCart.itemCount
            cartSubtotal.innerText = this.itemInCart.subtotal.toFixed(2)
            subtotalValue.innerText = 0
            taxValue.innerText = 0
            totalValue.innerText = 0

            for (const key in this.itemInCart) {
                if(key != 'deliveryFee') {
                    this.itemInCart[key] = 0
                }
            
            }
            console.log(this.itemInCart)
        })
    }
}

const restaurant = new Store()

restaurant.init()

