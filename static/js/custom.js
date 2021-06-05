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

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: chart_mn_statuses,
            type : 'donut'
        },
        donut: {
            title: percent_enabled + "% ENABLED"
        },
        color: {
            pattern: [
                'rgb(69, 91, 58)',
                'rgb(121, 115, 62)',
                'rgb(125, 68, 40)',
                'rgb(102, 33, 33)',
                '#404040']
        },
        legend: {
            padding: 20,
            inset: {
                anchor: 'top-left',
                x: 10,
                y: 0,
                step: undefined
            }
        },
        padding: {
            bottom: 40
        }
    });
    $(function () {
        $(".dial").knob({
            'readOnly': true,
            'format': function (value) {
                return value + '%';
            },
            'fgColor': '#3a9172'
        });
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
