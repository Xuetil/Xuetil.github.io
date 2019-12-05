$(function () {
    // Scrollify default setting
    $(document).ready(function(){
        $.scrollify({
            section : "section",
            sectionName : "section-name",
            interstitialSection : "",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset : 0,
            scrollbars: false,
            standardScrollElements: "",
            setHeights: true,
            overflowScroll: true,
            updateHash: true,
            touchScroll:true,
            before:function() {},
            after:function() {},
            afterResize:function() {},
            afterRender:function() {}
        });
    });
    
    main();

    // call functions
    function main() {
        setupButtons();
        setupHomeMenu();
    }

    // set up the arrow for anchoring
    function setupButtons(){
        // when click the arrow, goes to the next page
        $('.btn_down').click(function(){
            $.scrollify.next();
        });
        // when click the lask up arrow, back to the home page
        $('.btn_up').click(function(){
            $.scrollify.move("#home");
        });
    }

    // set up the hotpot pics on the home menu as another form of navigation
    // set the hotpot pics up individually to their corresponding page
    function setupHomeMenu(){
        $('#beijing_pic').click(function(){
            // console.log("function");
            $.scrollify.move('#beijing_hotpot');
        });
        
        $('#jiugongge_pic').click(function(){
            $.scrollify.move('#jiugongge_hotpot');
        });
        
        $('#chuanchuan_pic').click(function(){
            $.scrollify.move('#chuanchuan_hotpot');
        });
        $('#seafood_pic').click(function(){
            $.scrollify.move('#seafood_hotpot');
        });
        $('#chaoshan_pic').click(function(){
            $.scrollify.move('#chaoshan_hotpot');
        });
        $('#coconut_pic').click(function(){
            $.scrollify.move('#coconut_hotpot');
        });
    }
});


