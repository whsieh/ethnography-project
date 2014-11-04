var layoutButtonScrollMin = 1100;
var layoutButtonScrollMax =  1600;
var layoutButtonsActive = false;
var isAnimationActive = false;
var currentState = "title";
var carouselCaptions = [
    "One of the many classrooms at Pleasanton Middle School. This is one of the rooms borrowed by Tzu Chi Chinese School. Many rooms have a similar group-oriented setup.",
    "A floor plan of the common classroom at PMS. The teachers lecture for entire class periods, while some students struggle to see the board.",
    "Wheeled, rotating chairs at Evans Hall served as inspiration. I believe using chairs like this will allow for more flexibility in the classroom.",
    "In \"lecture\" mode, students can easily rearrange desks so everyone has line of sight. If a student's vision is blocked, he or she can easily reposition him/herself.",
    "In \"group\" mode, students can rearrange desks into variable-size groups. In this way, teachers can employ both group-based and lecture-based lessons without worrying about desk arrangement."
];
var currentCarouselCaptionIndex = 1000;

function scrollToLayout() {
    console.log("TEST");
    $("body").animate({scrollTop: $("#layout-panel").offset().top}, 1000);
}

function showLayoutButtons() {
    if (layoutButtonsActive || isAnimationActive)
        return false;

    console.log("showing layout buttons");
    isAnimationActive = true;
    $(".layout-button").show();
    $("#layout-button-1").animate({
        top: "5%",
        opacity: 1
    }, 950, function () {
        layoutButtonsActive = true;
        isAnimationActive = false;
    });
    $("#layout-button-2").animate({
        top: "30%",
        opacity: 1
    }, 700);
    $("#layout-button-3").animate({
        top: "60%",
        opacity: 1
    }, 400);
    $("#layout-button-4").animate({
        top: "28%",
        opacity: 1
    }, 720);
    $("#layout-button-5").animate({
        top: "68%",
        opacity: 1
    }, 320);
    return true;
}

function hideLayoutButtons() {
    if (!layoutButtonsActive || isAnimationActive)
        return false;

    console.log("hiding layout buttons");
    isAnimationActive = true;
    $("#layout-button-1").animate({
        top: "0px",
        opacity: 0
    }, 60);
    $("#layout-button-2").animate({
        top: "0px",
        opacity: 0
    }, 300);
    $("#layout-button-3").animate({
        top: "0px",
        opacity: 0
    }, 600);
    $("#layout-button-4").animate({
        top: "0px",
        opacity: 0
    }, 300);
    $("#layout-button-5").animate({
        top: "0px",
        opacity: 0
    }, 680, function () {
        $(".layout-button").hide();
        $(".layout-button").css("top", "100%");
        layoutButtonsActive = false;
        isAnimationActive = false;
    });
    return true;
}

function showLayoutButtonPanel(i) {
    $("#layout-button-panel-" + i).fadeIn(500);
}

function hideLayoutButtonPanel(i) {
    $("#layout-button-panel-" + i).fadeOut(500);
}

function bindMouseHoverFunctionsForLayoutButton(i) {
    $("#layout-button-" + i).mouseover(function(e) {
        $("#layout-button-" + i).animate({
            "top": "-=10",
            "left": "-=10",
            "width": "+=20",
            "height": "+=20",
            "border-radius": "+=20px",
            "font-size": "50"
        }, 75);
    });

    $("#layout-button-" + i).mouseout(function(e) {
        $("#layout-button-" + i).animate({
            "top": "+=10",
            "left": "+=10",
            "width": "-=20",
            "height": "-=20",
            "border-radius": "-=20px",
            "font-size": "35"
        }, 75);
    });
}

function bindMouseFunctionsForLayoutButtons() {
    bindMouseHoverFunctionsForLayoutButton(1);
    bindMouseHoverFunctionsForLayoutButton(2);
    bindMouseHoverFunctionsForLayoutButton(3);
    bindMouseHoverFunctionsForLayoutButton(4);
    bindMouseHoverFunctionsForLayoutButton(5);
    $("#layout-button-1").click(function(e) {
        showLayoutButtonPanel(1);
    });
    $("#layout-button-2").click(function(e) {
        showLayoutButtonPanel(2);
    });
    $("#layout-button-3").click(function(e) {
        showLayoutButtonPanel(3);
    });
    $("#layout-button-4").click(function(e) {
        showLayoutButtonPanel(4);
    });
    $("#layout-button-5").click(function(e) {
        showLayoutButtonPanel(5);
    });
}

function cycleCarouselCaptions(direction) {
    if (direction == "left") {
        $("#carousel-text").animate({
            opacity: 0.1
        }, 200, function() {
            currentCarouselCaptionIndex++;
            $("#carousel-text").text(carouselCaptions[currentCarouselCaptionIndex % 5])
            $("#carousel-text").animate({
                opacity: 1
            }, 200);
        });

    } else if (direction == "right") {
        $("#carousel-text").animate({
            opacity: 0.1
        }, 200, function() {
            currentCarouselCaptionIndex--;
            $("#carousel-text").text(carouselCaptions[currentCarouselCaptionIndex % 5])
            $("#carousel-text").animate({
                opacity: 1
            }, 200);
        });
    }
}

function bindCarouselFunctions() {
    $("#classroomredesign-carousel").on("slide.bs.carousel", function(e) {
        cycleCarouselCaptions(e.direction);
    });
}

function init() {
    layoutButtonScrollMin = $("#layout-panel").offset().top - 250;
    layoutButtonScrollMax = $("#layout-panel").offset().top + $("#layout-panel").height() / 3.0;
    bindMouseFunctionsForLayoutButtons();
    bindCarouselFunctions();
    console.log("init");
    var imageScrollDistance = 2500;
    currentScrollTop = window.pageYOffset;
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var layoutTop = $("#layout-panel").offset().top;
    currentState = "title";

    foodRedesignTop = $("#food_redesign").offset().top;
    document.onscroll = function() {
        var deltaY = window.pageYOffset - currentScrollTop;
        currentScrollTop = window.pageYOffset;
        if (!layoutButtonsActive && deltaY > 0 && currentScrollTop > layoutButtonScrollMin && currentState == "title") {
            if (showLayoutButtons())
                currentState = "layout";

        } else if (layoutButtonsActive && deltaY < 0 && currentScrollTop < layoutButtonScrollMin && currentState == "layout") {
            if (hideLayoutButtons())
                currentState = "title";

        } else if (layoutButtonsActive && deltaY > 0 && currentScrollTop > layoutButtonScrollMax && currentState == "layout") {
            if (hideLayoutButtons())
                currentState = "taxonomy";

        } else if (!layoutButtonsActive && deltaY < 0 && currentScrollTop < layoutButtonScrollMax && currentState == "taxonomy") {
            if (showLayoutButtons())
                currentState = "layout";

        } else if (deltaY > 0 && currentScrollTop > foodRedesignTop && currentState != "food_redesign") {
            $("#food_redesign").css({
                "position" : "fixed",
                "top" : "0px"
            });
            currentState = "food_redesign";
            $(".food_redesign_caption").show();
            $("#food_redesign_caption-7").css({
                top: "47%",
                left: (windowWidth - $("#food_redesign_caption-7").width()) / 2
            });
            $("#food_redesign_caption-8").css({
                top: "53%",
                left: (windowWidth - $("#food_redesign_caption-8").width()) / 2
            });

        } else if (deltaY < 0 && currentScrollTop < foodRedesignTop && currentState == "food_redesign") {
            $("#food_redesign").css({
                "position" : "absolute",
                "top" : "0px"
            });
            currentState = "taxonomy";
            $(".food_redesign_caption").hide();

        } else if (currentScrollTop > foodRedesignTop) {
            var time = Math.min(1, (currentScrollTop - foodRedesignTop) / 5000);
            var t1 = time >= 0.5 ? 1 : (time * 2);
            var t2 = time < 0.5 ? 0 : ((time - 0.5) * 2);
            $("#food_redesign_caption-7").css({
                opacity: Math.min(1, t1)
            });
            $("#food_redesign_caption-8").css({
                opacity: Math.min(1, t2)
            });
            $("#food_redesign_caption-1").css({
                opacity: Math.min(1, t1 * 2),
                left: (-10 + 54 * t1) + "%",
                top: (45 - 52 * Math.pow(t2, 2)) + "%"
            });
            $("#food_redesign_caption-2").css({
                opacity: Math.min(1, t1 * 2),
                left: (-15 + 62 * Math.pow(t1, 1.5)) + "%",
                top: (50 - 58 * Math.pow(t2, 1.5)) + "%"
            });
            $("#food_redesign_caption-3").css({
                opacity: Math.min(1, t1 * 2),
                left: (-20 + 63 * Math.pow(t1, 2)) + "%",
                top: (55 - 72 * t2) + "%"
            });
            $("#food_redesign_caption-4").css({
                opacity: Math.min(1, t1 * 2),
                left: (105 - 57 * t1) + "%",
                top: (45 - 72 * t2) + "%"
            });
            $("#food_redesign_caption-5").css({
                opacity: Math.min(1, t1 * 2),
                left: (110 - 59 * Math.pow(t1, 1.5)) + "%",
                top: (50 - 68 * Math.pow(t2, 1.5)) + "%"
            });
            $("#food_redesign_caption-6").css({
                opacity: Math.min(1, t1 * 2),
                left: (115 - 61 * Math.pow(t1, 2)) + "%",
                top: (55 - 70 * t2) + "%"
            });
        }
    }
}
