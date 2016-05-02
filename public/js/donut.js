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
        score:1
    });
});

// Get all the current comments.
// Using Viima comment library: https://github.com/Viima/jquery-comments
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
        },
        postComment: function(commentJSON, success, error) {
            $.ajax({
                type: 'post',
                url: '/comments/add',
                data: {comment : commentJSON, currentUser: document.getElementById("currentUser").value,},
                success: function(comment) {
                    success(comment)
                },
                error: error
            });
        },
    }); 
});

/*$('.btn[data-radio-name]').click(function() {
    $('.btn[data-radio-name="'+$(a).data('radioName')+'"]').addClass('active');
    $('.btn[data-radio-name="'+$(this).data('radioName')+'"]').addClass('active');
    $('input[name="'+$(this).data('radioName')+'"]').val(
        $(this).text()
    );
});*/

$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');  
    
    if ($(this).find('.btn-primary').size()>0) {
    	$(this).find('.btn').toggleClass('btn-primary');
    }
    if ($(this).find('.btn-danger').size()>0) {
    	$(this).find('.btn').toggleClass('btn-danger');
    }
    if ($(this).find('.btn-success').size()>0) {
    	$(this).find('.btn').toggleClass('btn-success');
    }
    if ($(this).find('.btn-info').size()>0) {
    	$(this).find('.btn').toggleClass('btn-info');
    }
});
