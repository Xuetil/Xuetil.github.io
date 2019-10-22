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

    // create variables to store user selection (for HW 6B)
    var productId = null;
    var selectedColor = null;
    var quantity = 1;
    var size = "xs";

    // once the window is loaded, the following functions would be executed 
    window.onload = function () {
        // compare url id with the object id 
        productId = getUrlVars()["id"];
        // store the id from the url and assign it to the variable, so I know which cat is being clicked
        var cat = getItemById(productId);
        // get variables that need to be changed from html and replace it with new variable
        // the new variable is located by assigned id
        document.getElementById('name').children[0].innerHTML = cat.name;
        document.getElementById('price').innerHTML = cat.price;
        document.getElementById('photo').children[0].src = cat.img;
        document.getElementById('minis').children[0].src = cat.miniSelect;
        document.getElementById('minis').children[1].src = cat.mini;
        document.getElementById('minis').children[2].src = cat.mini;
        setupFields();
    }

    // setup the interactive elements
    function setupFields() {
        setupButton();
        setupSizeMenu();
        setupQuantity();
        setuppAddToCart();
    }

    // assign the button to the onclick function 
    function setupButton() {
        var buttons = document.getElementsByClassName('squares')[0].children;
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].onclick = buttonOnClick;
        }
    }

    // when one color is selected, it should be pressed down; when switch to another color, this selected should be pressed down, but others shoul pop up
    // store the value for HW6B
    function buttonOnClick() {
        var buttons = document.getElementsByClassName('squares')[0].children;
        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].style.borderStyle = 'outset'; 
        }
        this.style.borderStyle = 'inset';
        selectedColor = this.value;
    }

    // locate size selection button, and store the value when user makes a change
    function setupSizeMenu() {
        var sizeMenu = document.getElementsByClassName('sizeOption')[0];
        sizeMenu.onchange = function(){size = this.options[this.selectedIndex].value;};
    }

    // locate selection button, and store the value when user makes a change
    function setupQuantity() {
        var quantity = document.getElementsByClassName('qtyOption')[0];
        quantity.onchange = function(){quantity = this.options[this.selectedIndex].value;};
    }

    // check the url id to see if it matches to any of the object created
    function getItemById(id) {
        return cats.find(item => item.id === id);
    }

    // extract id from url
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    function setuppAddToCart(){
        var addToCart = document.getElementById('addCart');
        console.log(addToCart);
        addToCart.onclick = function(){
            console.log(document.getElementById("itemsinCart"))
            document.getElementById("itemsinCart").style.display = "block";
        }
    }


})();