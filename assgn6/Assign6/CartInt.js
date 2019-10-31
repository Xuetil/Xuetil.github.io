(function () {
    
    "use strict";

    // Define constructor
    // var data = JSON.parse('{"product":[{"id":"cat1","name":"Cone GPS Collar","price":"$34.98","img":"Catcollar.jpg"},{"id":"cat2","name":"High-end Fashion Cat Harness","price":"$29.98","img":"highendFashion.jpg"},{"id":"cat3","name":"Leopard-Patterned Harness","price":"$39.98","img":"Catharness.jpg"},{"id":"cat4","name":"Kitty Portable Backpack","price":"$59.98","img":"Backpack.jpg"},{"id":"cat5","name":"Japanese Floral Bell GPS Collar","price":"$15.98","img":"Melody.jpg"}]}');
    function Product(id, name, price, img, miniSelect, mini){
        this.id = id,
        this.name = name,
        this.price = price,
        this.img = img,
        this.miniSelect = miniSelect,
        this.mini = mini
    }
    // create objects and assign them to a variable
    var cat1 = new Product("cat1", "Cone GPS Collar", "$34.98", "Catcollar.jpg", "Collar_Selected.png", "Collar.png")
    var cat2 = new Product("cat2", "High-end Fashion Cat Harness", "$29.98", "highendFashion.jpg", "cat2_mini_Select.png","cat2_mini.png")
    var cat3 = new Product("cat3", "Leopard-Patterned Harness", "$39.98", "Catharness.jpg","cat3_mini_Select.png", "cat3_mini.png")
    var cat4 = new Product("cat4", "Kitty Portable Backpack", "$59.98", "Backpack.jpg", "miniPic_Select.png", "miniPic.png")
    var cat5 = new Product("cat5", "Japanese Floral Bell GPS Collar", "$15.98", "Melody.jpg", "cat5_mini_Select.png","cat5_mini.png")
    // create an array to store objects 
    var cats = [cat1, cat2, cat3, cat4, cat5];

    // create an variable to store product 
    var card = null;
    // create an template of html for generating new product add to the cart
    var card_html = '<div class="card"><div class="column1"><div class="pic"><img src="Pics/Backpack.jpg"></div><p class="stock">In stock</p></div><div class="column2"><p class="name"></p><div class="size"><p class="text"></p></div><div class="color"><p class="text">Color:</p><div class="square"></div></div><div class="price"><p></p></div></div><div class="column3"><div class="close"><button class="close_btn"></button></div><div class="qty"><p>Qty.</p><select class="qtyOption"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div></div></div>';
    // once the window is loaded, the following functions would be executed
    window.onload = function () {
        setupCartIndicator();
        calculateSummary();
        card = htmlToDOM(card_html);
        // get all the products the user added from the local storage
        var keys = Object.keys(localStorage);
        for (var i = keys.length - 1; i >= 0; i--) {
            if (keys[i].substring(0,3) === "cat"){
                createCard(keys[i], localStorage.getItem(keys[i]));
            }
        }
    }

    // generate DOM elements from given html string
    // source from Stackoverflow https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    function htmlToDOM(html) {
        var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }

    // get information of the product from local storage
    // update the information on the card
    function createCard(key, quantity) {
        var attributes = key.split("_");
        var id = attributes[0];
        var color = attributes[1];
        var size = attributes[2];
        // find the product the user selected
        var product = null;
        for (var i = cats.length - 1; i >= 0; i--) {
            if(cats[i].id === id) {
                product = cats[i];
                break;
            }
        }
        // clone the card
        var newCard = card.cloneNode(true);
        // set picture
        newCard.getElementsByTagName('img')[0].src = "Pics/" + product.img;
        // set name
        newCard.getElementsByClassName('name')[0].innerHTML = product.name;
        // set size
        newCard.getElementsByClassName('size')[0].firstChild.innerHTML = "Size: " + size.toUpperCase();
        // set color
        newCard.getElementsByClassName('square')[0].classList.add(color);
        // set price
        newCard.getElementsByClassName('price')[0].firstChild.innerHTML = product.price;
        // set quantity and bind select element to onchange function to update quantity
        var selectElement = newCard.getElementsByClassName('qtyOption')[0];
        selectElement.selectedIndex = parseInt(quantity) - 1;
        selectElement.onchange = function(){
            // update new quantity of the item
            var oldVal = parseInt(localStorage.getItem(key));
            var newVal = parseInt(this.options[this.selectedIndex].value);
            localStorage.setItem(key, newVal);
            // update total # of items in cart
            var oldQuantity = parseInt(localStorage.getItem("quantity"));
            localStorage.setItem("quantity", oldQuantity + newVal - oldVal);
            document.getElementById('itemsinCart').innerHTML = localStorage.getItem("quantity");
            calculateSummary();
        }
        // set the close button to the card
        var closeBtn = newCard.getElementsByClassName("close_btn")[0];
        closeBtn.onclick = function(){
            // total # of items in the cart
            var oldQuantity = parseInt(localStorage.getItem("quantity"));
            // quantity of the item 
            var oldVal = parseInt(localStorage.getItem(key));
            localStorage.removeItem(key);
            // update new total quantity in cart
            localStorage.setItem("quantity", oldQuantity - oldVal);
            document.getElementById('itemsinCart').innerHTML = localStorage.getItem("quantity");
            document.getElementsByClassName('product')[0].removeChild(newCard);
            calculateSummary();
        }

        // add new card to the page
        document.getElementsByClassName('product')[0].appendChild(newCard);
    }
    // show the number of items on the cart icon
    function setupCartIndicator() {
        document.getElementById('itemsinCart').innerHTML = localStorage.getItem("quantity");
    }

    // calculate the summary section
    function calculateSummary() {
        var quantity = parseInt(localStorage.getItem("quantity"));
        document.getElementById('items').innerHTML = "(" + quantity + ((quantity > 1) ? " items): " : "item): ");
        // show subtotal price
        var subtotalPrice = 0;
        var keys = Object.keys(localStorage);
        for (var i = keys.length - 1; i >= 0; i--) {
            if (keys[i].substring(0,3) === "cat"){
                var id = keys[i].split("_")[0];
                var product = null;
                for (var j = cats.length - 1; j >= 0; j--) {
                    if(cats[j].id === id) {
                        product = cats[j];
                        break;
                    }
                }
                var price = parseFloat(product.price.substring(1));
                subtotalPrice += price * parseInt(localStorage.getItem(keys[i]));
            }
        }
        console.log(subtotalPrice)
        subtotalPrice = Math.round(subtotalPrice * 100) / 100;
        document.getElementById('price').innerHTML = "$" + subtotalPrice;
        // show tax
        var tax = Math.round(subtotalPrice * 0.07 * 100) / 100;
        document.getElementById('tax').innerHTML = "$" + tax;
        // show total price
        var total = Math.round(100 * (subtotalPrice + tax)) / 100;
        document.getElementById('total').innerHTML = "$" + total;
    }



})();