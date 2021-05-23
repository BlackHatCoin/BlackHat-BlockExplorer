$(document).ready(function () {
    $('.card_error').click(function (e) {
        $('.preload').toggleClass('vis');
        $('body').toggleClass('oh');
    });

    $('.hambu').click(function () {
        $('.navleft').toggleClass('vis');
        $('body').toggleClass('oh');
        $('#nav-icon4').toggleClass('open');
    });
    $('.menu_parent').click(function () {
        $(this).toggleClass('open');
    });
})

$(window).on("load", function () {
    $('body').removeClass('oh');
    $('.preload').removeClass('vis');
});

const $menu = $('.menu_parent');

$(document).mouseup(e => {
    if (!$menu.is(e.target) // if the target of the click isn't the container...
        && $menu.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $menu.removeClass('open');
    }
});
