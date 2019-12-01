$(function () {
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

    function main() {
        setupButtons();
        setupHomeMenu();
    }

    function setupButtons(){
        $('.btn_down').click(function(){
            $.scrollify.next();
        });
        $('.btn_up').click(function(){
            $.scrollify.move("#home");
        });
    }

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


