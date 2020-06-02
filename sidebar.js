// ------------------------------------------------------------ //
// -------------------- Side Navbar Stuff! -------------------- //
// ------------------------------------------------------------ //

// ------------------------------------------- //
// ------------- Window Resizing ------------- //
// ------------------------------------------- //
if (parseInt($("body").css("width")) < 768) {
    $("p").addClass("hide");
}
else {
    $("p").removeClass("hide");
}

window.addEventListener("resize", function() {
    if (parseInt($("body").css("width")) < 768) {
        // hide the words in links
        $("p").addClass("hide");

        // side bar stuff
        if ($(".no-bar").hasClass("hide")) {
            $(".side-navbar").removeClass("hide");
            $(".side-navbar").css("width", "100vw");
            $(".side-navbar").height(340);
            $(".side-navbar-toggle").width("100%");
        }
        
        $(".main-body").css("padding-left", 0);
        
        // hide the condensed side bar
        $(".condensed-sidebar").addClass("hide");
    }
    else {
        // show the words in links 
        $("p").removeClass("hide");

        // side bar stuff
        if ($(".side-navbar").hasClass("hide") && $(".condensed-sidebar").hasClass("hide")) {
            $(".side-navbar").removeClass("hide");
        }

        // adjust main body
        if ($(".side-navbar").hasClass("hide")) {
            $(".main-body").css("padding-left", 50);
        }
        else {
            $(".main-body").css("padding-left", 240);
        }
        
        $(".side-navbar").width(240);
        $(".side-navbar").height("100vh");
        $(".side-navbar-toggle").width(240);

        // hide the no bar stuff
        $(".no-bar").addClass("hide");
    }
})
// ------------------------------------------- //
// -------------- Toggle Button -------------- //
// ------------------------------------------- //
// hover side nav toggle
$(".side-navbar-toggle").hover(function() {
    $(".toggle-icon").css("filter", "contrast(140%)");
}, function() {
    $(".toggle-icon").css("filter", "contrast(100%)");
})
// hover condensed nav toggle
$(".condensed-toggle").hover(function() {
    $(this).css("background-color", "#1E1E1E");
    $(".condensed-toggle-img").css("filter", "contrast(140%)");
}, function() {
    $(this).css("background-color", "#3A3A3A");
    $(".condensed-toggle-img").css("filter", "contrast(100%)");
})
$(".side-navbar-toggle").click(function() {
    if (parseInt($("body").css("width")) >= 768) {
        // extend the main body
        $(".main-body").animate({
            paddingLeft: 50
        }, 500)
        // decrease the toggle button
        $(this).animate({
            width: 50
        }, 500);
        // decrease the side bar
        $(".side-navbar").animate({
            width: 50
        }, 500, function() {
            $(".side-navbar").addClass("hide");
            $(".condensed-sidebar").removeClass("hide");
        });
    } // if ... laptop
    else {
        $(".side-navbar").animate({
            height: 50
        }, 500, function() {
            $(".side-navbar").addClass("hide");
            $(".no-bar").removeClass("hide");
        });
    } // else ... small devices
}) 
$(".condensed-toggle").click(function() {
    $(".side-navbar").css("width", 0);
    $(".side-navbar-toggle").css("width", 0);
    $(".side-navbar").removeClass("hide");

    $(".main-body").animate({
        paddingLeft: 240
    }, 500) 
    $(".side-navbar-toggle").animate({
        width: 240
    }, 500);
    $(".side-navbar").animate({
        width: 240
    }, 500, function() {
        $(".condensed-sidebar").addClass("hide");
    });
})
$(".no-bar-image").click(function() {
    $(".side-navbar").removeClass("hide");
    $(".no-bar").addClass("hide");
    $(".side-navbar").animate({
        height: 340
    }, 500)
})
