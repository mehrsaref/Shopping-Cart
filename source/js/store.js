let allProducts = [
    { id: 1, title: 'Angels Share By Kilian', price: 12.93, img: 'Images/Angels Share.webp' ,count:0 , offer: false ,special:false, soldOut:false},
    { id: 2, title: 'Mon Paris Eau de Parfum', price: 21, img: 'Images/ysl p.webp' ,count:0, offer: false ,special:true, soldOut:false},
    { id: 3, title: 'La Belle Eau de Parfum', price: 33, img: 'Images/je.webp' ,count:0, offer: 23 ,special:false, soldOut:false},
    { id: 4, title: 'Donna Born in Roma', price: 41.98, img: 'Images/valentino.webp' ,count:0, offer: false ,special:false, soldOut:false},
    { id: 5, title: 'Alien Goddess by Mugler', price: 98, img: 'Images/Mugler.webp' ,count:0, offer: false ,special:false, soldOut:false},
    { id: 6, title: 'Yves Saint Laurent Libre', price: 65.33, img: 'Images/ysl.webp' ,count:0, offer: false ,special:false, soldOut:true},
]
let userCart = []
let deletedItem

let $ = document
const shopItemsContainer = $.querySelector('.shop-items')
let cartItems = $.querySelector('.cart-items')
let totalPrice = $.querySelector('.cart-total-price')

window.addEventListener('load',function(){
    if(JSON.parse(this.localStorage.getItem('shoppingCart'))){
        userCart = JSON.parse(this.localStorage.getItem('shoppingCart'))
        console.log(userCart);
        showCart()
    }
    showProducts()
})

function showProducts(){
    shopItemsContainer.innerHTML = ''
    allProducts.forEach(function(product){
        caculateCount(product)
    
        let productContainer = $.createElement('div')
        productContainer.classList.add('shop-item')
    
        let productTitleSpan = $.createElement('span')
        productTitleSpan.classList.add('shop-item-title')
        productTitleSpan.innerHTML = product.title
    
        let productImageElem = $.createElement('img')
        productImageElem.classList.add('shop-item-image')
        productImageElem.setAttribute('src', product.img)
    
        let productDetailsContainer = $.createElement('div')
        productDetailsContainer.classList.add('shop-item-details')
    
        let productPriceSpan = $.createElement('span')
        productPriceSpan.innerHTML = '$' + product.price
        productPriceSpan.classList.add('shop-item-price')
        if(product.offer){
            productPriceSpan.style.textDecoration = 'line-through'
            productPriceSpan.style.color = 'grey'
            let offerPrice = $.createElement('span')
            offerPrice.innerHTML = product.offer + ' $'
            offerPrice.style.color = 'red'
            productDetailsContainer.append(offerPrice)
        }
    
        let prodcutAddButton = $.createElement('button')
        if(product.soldOut){
        prodcutAddButton.innerHTML = 'Sold Out'
        prodcutAddButton.style.backgroundColor = 'grey'
        } else{
            prodcutAddButton.innerHTML = 'ADD TO CART'
            prodcutAddButton.addEventListener('click', addBtnPushed)
        }
        prodcutAddButton.className = 'btn btn-primary shop-item-button'
    
        let productQuantity = $.createElement('div')
        productQuantity.className = 'quantity'
        productQuantity.style.display = 'none'
    
        let productMinusBtn = $.createElement('input')
        productMinusBtn.className = 'minus'
        productMinusBtn.setAttribute('type','button')
        productMinusBtn.setAttribute('value','-')
        productMinusBtn.addEventListener('click', function(event){
            event.target.nextSibling.value --
            console.log(event.target.nextSibling.value);
            let item = event.target.parentElement.parentElement.parentElement.firstChild.innerHTML
            let selectedItem = allProducts.find(function(product){
                return product.title === item
            })
            selectedItem.count = Number(event.target.nextSibling.value)
            changeItemQuantity(selectedItem.title, selectedItem.count)
            if(Number(event.target.nextSibling.value) === 0){
                prodcutAddButton.style.display = 'block'
                productQuantity.style.display = 'none'
                removeItem(item)
            }
            showCart()
        })
    
        let productQuantityNumber = $.createElement('input')
        productQuantityNumber.className = 'input-text qty text'
        productQuantityNumber.setAttribute('type','number')
        productQuantityNumber.setAttribute('value',product.count)
    
        let productPlusBtn = $.createElement('input')
        productPlusBtn.className = 'plus'
        productPlusBtn.setAttribute('type','button')
        productPlusBtn.setAttribute('value','+')
        productPlusBtn.addEventListener('click', function(event){
            event.target.previousSibling.value ++
            let item = event.target.parentElement.parentElement.parentElement.firstChild.innerHTML
            let selectedItem = allProducts.find(function(product){
                return product.title === item
            })
            selectedItem.count = Number(event.target.previousSibling.value)
            changeItemQuantity(selectedItem.title, selectedItem.count)
            showCart()
        })
    
        productQuantity.append(productMinusBtn,productQuantityNumber,productPlusBtn)
        productDetailsContainer.append(productPriceSpan,prodcutAddButton)
        productDetailsContainer.append(productQuantity)
        productContainer.append(productTitleSpan, productImageElem)
        if(product.special){
            let specialProduct = $.createElement('p')
            specialProduct.innerHTML = 'SPECIAL'
            specialProduct.style.fontWeight = 'bold'
            specialProduct.style.color = 'green'
            productContainer.append(specialProduct)   
        }
        productContainer.append(productDetailsContainer)
        
        shopItemsContainer.append(productContainer)

        if(product.count>0){
            productQuantity.style.display = 'block'
            prodcutAddButton.style.display = 'none'
        }

    })
}

function caculateCount(product){
    userCart.forEach(function(userProduct){
        if(userProduct.id === product.id){
            product.count = userProduct.count
        }
    })
}

function addBtnPushed(event){
    event.target.style.display = 'none'
    event.target.nextSibling.style.display = 'block'

    allProducts.find(function(product){
        if(product.title === event.target.parentElement.parentElement.firstChild.innerHTML){
            product.count++
            event.target.nextSibling.value = product.count
            userCart.push(product)
            showCart()
        }
    })

    showProducts()
}

function showCart(){

    cartItems.innerHTML = ''
    userCart.forEach(function(product){
        let cartRow = $.createElement('div')
        cartRow.classList.add('cart-row')
    
        let cartItem =  $.createElement('div')
        cartItem.className = 'cart-item cart-column'
    
        let cartItemImg = $.createElement('img')
        cartItemImg.className = 'cart-item-image'
        cartItemImg.setAttribute('src', product.img)
        cartItemImg.setAttribute('width','100')
        cartItemImg.setAttribute('height','100')
    
        let cartItemTitle = $.createElement('span')
        cartItemTitle.innerHTML = product.title
        cartItemTitle.classList.add('cart-item-title')
    
        let cartItemPrice = $.createElement('span')
        if(product.offer){
            product.price = product.offer
        }
        cartItemPrice.innerHTML = '$'+product.price
        cartItemPrice.className = 'cart-price cart-column'
    
        let cartItemQuantity = $.createElement('div')
        cartItemQuantity.className = 'cart-quantity cart-column'
    
        let itemQuantityInput = $.createElement('input')
        itemQuantityInput.className = 'cart-quantity-input'
        itemQuantityInput.setAttribute('type','number')
        itemQuantityInput.setAttribute('value',product.count)
        itemQuantityInput.addEventListener('change',function(event){
            let item = event.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerHTML
            let selectedItem = userCart.find(function(userProduct){
                return userProduct.title === item
            })
            selectedItem.count = Number(event.target.value)
            changeItemQuantity(selectedItem.id,selectedItem.count)
        })
    
        let itemRemoveBtn = $.createElement('button')
        itemRemoveBtn.className = 'btn btn-danger'
        itemRemoveBtn.innerHTML ='Remove'
        itemRemoveBtn.addEventListener('click', function(event){
            let deletedItem = event.target.parentElement.parentElement.firstChild.firstChild.nextSibling.innerHTML
            event.target.parentElement.parentElement.remove()
            removeItem(deletedItem)
        })
    
        cartItemQuantity.append(itemQuantityInput,itemRemoveBtn)
        cartItem.append(cartItemImg,cartItemTitle)
        cartRow.append(cartItem,cartItemPrice,cartItemQuantity)
        cartItems.append(cartRow)
        
        calculatePrice()
        localStorage.setItem('shoppingCart',JSON.stringify(userCart))
    })
}

function calculatePrice(){
    let price = 0

    userCart.forEach(function(product){
        price += product.price * product.count
    })
    price = Math.round(price * 100) / 100;
    totalPrice.innerHTML = '$'+price
}

function removeItem(item){
    userCart = userCart.filter(function(userProduct){
        return userProduct.title !== item
    })
    allProducts.find(function(product){
        if (product.title === item) {
            product.count = 0
        }
    })
    showCart()
    showProducts()
    localStorage.setItem('shoppingCart',JSON.stringify(userCart))
    calculatePrice()
}

function changeItemQuantity(item,quantity){
    userCart.find(function(product){
        if(product.title === item){
            product.count = quantity
            if(product.count === 0){
                userCart.slice(userCart.indexOf(product),1)
                showCart()
            }
        }
    })
    localStorage.setItem('shoppingCart',JSON.stringify(userCart))
    calculatePrice()
    showProducts()
}

console.log(userCart);