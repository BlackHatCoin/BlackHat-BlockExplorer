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

    // call the callback
    let urlFunc = location.pathname.substring(1).replace('/', '_');
    let tmpIndex = urlFunc.indexOf('/');
    if (tmpIndex > 0) {
        urlFunc = urlFunc.substr(0, tmpIndex);
    }
    if (typeof window[urlFunc + '_Callback'] === 'function') {
        window[urlFunc + '_Callback']();
    }
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

function masternodes_Callback()
{
    if (getGetParam('page') > 1) {
        return;
    }

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
}

function governance_Callback()
{
    let page = getGetParam('pg', 'cur');
    if (page === 'cur') {
        governanceChartInit();
        $(window).bind('resizeEnd', function () {
            governanceChartInit();
        });
        $(window).resize(function () {
            if (this.resizeTO) {
                clearTimeout(this.resizeTO);
            }
            this.resizeTO = setTimeout(function () {
                $(this).trigger('resizeEnd');
            }, 500);
        });

        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        let countDown = next_payout_ts*1000;
        countdownWork = setInterval(function () {
            let now = new Date().getTime(),
                distance = countDown - now,
                distance1 = distance;
            if (distance < 0) {
                distance1 = 0;
            }
            document.getElementById("days").innerText = Math.floor(distance1 / (day)),
                document.getElementById("hours").innerText = Math.floor((distance1 % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance1 % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance1 % (minute)) / second);

            //do something later when date is reached
            if (distance < 0) {
                clearInterval(countdownWork);
            }
            //seconds
        }, 1000)
    }

    if (page === 'cur' || page === 'future') {
        $("#voteModal").on('show.bs.modal', function (a) {
            let header = $('#modal_header_template').html();
            header = header.replace('{%js_vote%}', $(a.relatedTarget).html());
            header = header.replace('{%js_name%}', $('#proposal_' + $(a.relatedTarget).data('hash') + '_name').html());
            $("#voteModal .modal-body h3").html(header);

            let body = $('#modal_body_template').html();
            body = body.replace('{%js_vote%}', $(a.relatedTarget).html().toLowerCase());
            body = body.replace('{%js_hash%}', $(a.relatedTarget).data('hash'));
            $("#voteModal .modal-body div").html(body);

            copyToClipboard("#voteModal .modal-body div");
        });
    }
}

function governanceChartInit()
{
    let u = 768,
        h = $(window).width() > u ? 'right' : 'bottom',
        l = $(window).width() > u,
        t = $(window).width() > u ? blkc_available + ' BLKC Available' : '',
        wi = $(window).width() < u ? 260 : '',
        he = $(window).width() < u ? 500 : '',
        pb = $(window).width() < u ? 0 : 40;

    let chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: chart_proposals,
            type: 'donut',
            color: function (color, id) {
                return d3.rgb(color).darker(2);
            },
        },
        donut: {
            title: t,
            label: {
                show: l
            }
        },
        size: {
            height: he,
            width: wi
        },
        legend: {
            position: h,
            padding: 20,
            inset: {
                anchor: 'top-left',
                x: 10,
                y: 0,
                step: undefined
            }
        },
        padding: {
            bottom: pb
        }
    });
}

function getGetParam(paramName, def = null)
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let result = urlParams.get(paramName);
    if (result === null && def !== null) {
        return def;
    }
    return result;
}

function copyToClipboard(element) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text().trim()).select();
    document.execCommand("copy");
    $temp.remove();
}
