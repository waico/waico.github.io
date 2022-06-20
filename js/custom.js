$(function() {

    (function () {
        var e = document.getElementById("adress");
        e.parentNode.removeChild(e);
    })();

    var docWidth = document.documentElement.offsetWidth;

    [].forEach.call(
    document.querySelectorAll('*'),
    function(el) {
        if (el.offsetWidth > docWidth) {
        }
    });

    var checkbox = document.getElementsByClassName('toggler')[0];
    var menuItems = document.querySelectorAll('ul > li > a');

    menuItems.forEach(function(el) {
        el.addEventListener('click', function() {
            checkbox.checked = false;
        })
    })

    
    var s1 = new Swiper ('#swiper_cards', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        
        navigation: {
            nextEl: '.button-card-next',
            prevEl: '.button-card-prev',
        }
    });

    var s2 = new Swiper ('#swiper_work_flow', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 4,
        spaceBetween: 20,
        breakpoints: {
            1: {
                slidesPerView: 1,
            },
            600: {
                slidesPerView: 2,
            },
            980: {
                slidesPerView: 3,
            },
            1160: {
                slidesPerView: 4,
            }
        },
    });

    var s3 = new Swiper ('#swiper_press', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        preloadImages: true,
        watchSlidesVisibility: true,
        lazy: true,
        breakpoints: {
            1: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            1160: {
                slidesPerView: 3,
            }
        },
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev',
        }
    });

    var s4 = new Swiper ('#comm_mobile', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        breakpoints: {
            1: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            980: {
                slidesPerView: 3,
            },
            1160: {
                slidesPerView: 4,
            }
        },
    });

    function is_touch_device() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    };

    $('#projects .card').hover(function(){
        if (is_touch_device()) return;
        var card = $(this)[0];
        card.children[0].style = 'display: block;';
        card.style = 'background: #00E469; color: black';
        var arrows = card.getElementsByClassName('card_arrow');
        arrows[0].src = '../img/rightarrowblack.svg';
    }, function(){
        if (is_touch_device()) return;
        var card = $(this)[0];
        card.children[0].style = 'display: none;';
        card.style = '';
        var arrows = card.getElementsByClassName('card_arrow');
        arrows[0].src = '../img/rightarrow.svg';
    })

    $('.team_card').hover(function(){
        var t_card = $(this)[0];
        t_card.children[0].style = 'display: block;';
    }, function(){
        var t_card = $(this)[0];
        t_card.children[0].style = 'display: none;';
    })

    $('#name').focus(function() {
        $('#name').removeClass('error');
    });
    
    $('#message').focus(function() {
        $('#message').removeClass('error');
    });
    
    $('#email').focus(function() {
        $('#email').removeClass('error');
    });

    var bot = false;
    
    $("#submit").click(function(event){
        var form_data = $("#contactform").serializeArray();
        var isFormValid = [true, true, true];
        for (var i = 0; i < form_data.length; i++) {
            if (form_data[i].name === 'name') {
             isFormValid[0] = Boolean(form_data[i].value);
                if (!isFormValid[0]) {
                    $('#name').addClass('error');
                }
            }
    
            if (form_data[i].name === 'email') {
             isFormValid[1] = validateEmail(form_data[i].value);
                if (!isFormValid[1]) {
                    $('#email').addClass('error');
                }
            }
    
            if (form_data[i].name === 'message') {
             isFormValid[2] = Boolean(form_data[i].value);
                if (!isFormValid[2]) {
                    $('#message').addClass('error');
                }
            }
            if (form_data[i],name === 'adress') {
                bot = true;
            }
        }
    
        var allValid = isFormValid.every(function(elem) { return elem; });
        var agree = document.getElementById('check2').checked;
    
        event.preventDefault();
        event.stopPropagation();
    
        if (allValid && agree && !bot) {
            $.ajax({
                type: 'post',
                url: 'https://script.google.com/macros/s/AKfycbwc2wLd_Xxegp0bboQI51IP1BVrkdiPee5wrJMjO_D6ooF8RUc/exec',
                data: $('#contactform').serialize(),
                success: function () {
                    $('#formtext').text('Ваше сообщение отправлено.');
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');
                    $('#telephone').val('');
                },
                error: function() {
                    $('#formtext').html('<span style="color: red">Что то пошло не так, сервер не отвечает. Попробуйте связаться с нами позднее.</span>');
                }
            });

            return allValid;
        } else {
            $('#formtext').html('<span style="color: red">Заполните форму корректными данными и поставьте галочку, что вы согласны с условиями передачи информации</span>');
        }
    
    });

});

function validateEmail(email) {
    var regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regexp.test(email);
}
