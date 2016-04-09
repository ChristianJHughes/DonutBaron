$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Initializes the dount rating section
$(function() {
    $('#rating').raty({
        path: 'img/rateIcons',
        starOff: 'circle.png',
        starOn: 'donut.png',
        canel: true
    });
});

// Get all the current comments.
$(function() {
    $('#comments-container').comments({
        getComments: function(success, error) {
            $.ajax({
                type: 'get',
                url: '/comments',
                success: function(commentsArray) {
                    success(commentsArray)
                },
                error: error
            });
        }
    }); 
})