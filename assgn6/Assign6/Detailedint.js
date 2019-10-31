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

    // create variables to store user selection
    var choice = {}
    choice["productId"] = null;
    choice["selectedColor"] = "yellow";
    choice["quantity"] = 1;
    choice["size"] = "xs";

    // once the window is loaded, the following functions would be executed 
    window.onload = function () {
        // compare url id with the object id 
        choice["productId"] = getUrlVars()["id"];
        // store the id from the url and assign it to the variable, so I know which cat is being clicked
        var cat = getItemById(choice["productId"]);
        // get variables that need to be changed from html and replace it with new variable
        // the new variable is located by assigned id
        document.getElementById('name').children[0].innerHTML = cat.name;
        document.getElementById('price').innerHTML = cat.price;
        document.getElementById('photo').children[0].src = cat.img;
        document.getElementById('minis').children[0].src = cat.miniSelect;
        document.getElementById('minis').children[1].src = cat.mini;
        document.getElementById('minis').children[2].src = cat.mini;

        if (localStorage.getItem("quantity")) {
            var numItems = document.getElementById("itemsinCart");
            numItems.innerHTML = localStorage.getItem("quantity");
            numItems.style.display = "block";
        }
        setupFields();
    }

    // setup the interactive elements,call this function when the page is loaded
    function setupFields() {
        setupButton();
        setupSizeMenu();
        setupQuantity();
        setupAddToCart();
    }

    // assign the button to the buttonOnClick function, so when the user clicks one of the buttons, the following actions (buttonOnClick function) would happen 
    function setupButton() {
        var buttons = document.getElementsByClassName('squares')[0].children;
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].onclick = buttonOnClick;
        }
    // click the color yellow when page is loaded (default color)
        buttons[0].click();
    }

    // when one color is selected, it should be pressed down; when switch to another color, this selected should be pressed down, but others should pop up
    // store the value of the color
    function buttonOnClick() {
        var buttons = document.getElementsByClassName('squares')[0].children;
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].style.borderStyle = 'outset'; 
        }
        this.style.borderStyle = 'inset';
        choice["selectedColor"] = this.value;
    }

    // set up size selection button from html, and store the value when user makes a change
    function setupSizeMenu() {
        var sizeMenu = document.getElementsByClassName('sizeOption')[0];
        sizeMenu.onchange = function(){choice["size"] = this.options[this.selectedIndex].value;};
    }

    // set up selection button from html, and store the value when user makes a change
    function setupQuantity() {
        var quantity = document.getElementsByClassName('qtyOption')[0];
        quantity.onchange = function(){choice["quantity"] = parseInt(this.options[this.selectedIndex].value);};
    }

    // check the url id to see if it matches to any of the object created
    function getItemById(id) {
        return cats.find(item => item.id === id);
    }

    // extract id from url to identify the selected product
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    // set up add to cart button
    // when the user click the add to cart button, there would be a red dot on top of the shopping cart icon showing how many items they have in their cart so far
    function setupAddToCart(){
        var addToCart_btn = document.getElementById('addCart');
        addToCart_btn.onclick = addToCart
    }

    // 
    function addToCart(){
        // create a item in localStorage to log total number of items in cart
        if(!(localStorage.getItem("quantity"))) {
            localStorage.setItem("quantity", 0)
        }
        // store user selection
        var key = choice["productId"] + "_" + choice["selectedColor"]+ "_" + choice["size"];
        if(localStorage.getItem(key)){
            var lastChoice = localStorage.getItem(key);
            var amount = parseInt(lastChoice) + choice["quantity"]
            localStorage.setItem(key, amount);
        } else {
            localStorage.setItem(key, choice["quantity"]);
        }
        // update new quantity
        var total_amount = parseInt(localStorage.getItem("quantity")) + choice["quantity"];
        localStorage.setItem("quantity", total_amount);
        // show num of items in cart
        var numItems = document.getElementById("itemsinCart");
        numItems.innerHTML = localStorage.getItem("quantity");
        numItems.style.display = "block";
    }


})();