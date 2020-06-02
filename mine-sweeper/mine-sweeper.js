// ---------------------------- //
// ---set width of game side--- //
// ---------------------------- //
// get body width and side bar width
let bodyWidth = $("body").css("width");
let sideBarWidth = $(".side-navbar").css("width");

// set width of the actual page
$(".game-side").css("width", parseInt(bodyWidth) - parseInt(sideBarWidth));


// ---------------------- //
// ---sliding side nav--- //
// ---------------------- //
$("#slide-btn").hover(function() {
    $("#hide-icon").css("filter", "contrast(140%)");
}, function() {
    $("#hide-icon").css("filter", "contrast(100%)");
})

$("#slide-btn").click(function() {
    // make the smaller navbar appear
    $(".condensed-side-navbar").css("display", "block");

    // fade out the bigger navbar
    $(".game-side").animate({
        left: 60,
        width: (parseInt(bodyWidth) - 60)
    })
    $(".side-navbar").animate({
        width: 0
    }, 500, function() {
        $(".side-navbar").css("display", "none");
        // move the board
        $(".easy-board").animate({
            left: 230
        }, 500);
        $(".medium-board").animate({
            left: 160
        }, 500);
        $(".hard-board").animate({
            left: 60
        }, 500);
    });
    
})

$("#slide-back-btn").click(function() {
    $(".side-navbar").css("display", "block");
    $(".game-side").animate({
        left: 240,
        width: (parseInt(bodyWidth) - parseInt(sideBarWidth))
    })
    $(".side-navbar").animate({
        width: "240px"
    }, 500, function() {
        $(".condensed-side-navbar").css("display", "none");
        // move the board
        $(".easy-board").animate({
            left: 180
        }, 500);
        $(".medium-board").animate({
            left: 110
        }, 500);
        $(".hard-board").animate({
            left: 10
        }, 500);
    })
})

$(".side-navbar-element-link").hover(function() {
    $(this).css("background-color", "#1E1E1E");
}, function() {
    $(this).css("background-color", "#3A3A3A");
})

