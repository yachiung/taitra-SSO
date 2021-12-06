$(function () {
    var _html = $('html');
    var _body = $('body');
    var _window = $(window);

    var ww = _window.width();
    var wh = _window.height();
    var wwNew = ww;

    const wwSlim = 500;
    const wwMedium = 700;
    const wwNormal = 1020;
    const wwWide = 1440;
    const wwMaximum = 1920;

    const speed = 400;
    const speedFaster = 200;

    // 閃開的 label
    var _shiftLabel = $('.formRow').filter('.shiftLabel');
    _shiftLabel.each(function () {
        let _this = $(this);
        let _label = _this.children('label');
        let _input = _this.children('input');

        if (_input.val() !== '') {
            _label.addClass('shift');
        }

        _input.focus(function () {
            _label.addClass('shift');
        });
        _input.blur(function () {
            if ($(this).val() == '') {
                _label.removeClass('shift');
            }
        });
    });

    // 隱藏、顯示密碼
    $('.viewIcon').click(function () {
        let _this = $(this);
        if (_this.hasClass('pwShow')) {
            _this.removeClass('pwShow').prev('input').attr('type', 'password');
        } else {
            _this.addClass('pwShow').prev('input').attr('type', 'text');
        }
    });

    // ----------------------------------------------------- slick 參數設定
    $('.otherSites').slick({
        arrows: true, //左右箭頭
        autoplay: true, //自動播放
        autoplaySpeed: 3000, //自動播放秒數
        dots: false, //顯示圓點
        draggable: true, //滑鼠可以拖曳
        infinite: true, //無限輪播
        pauseOnHover: true, //滑鼠移過後暫停自動撥放
        rtl: false, //改變輪播方向
        slidesToShow: 2, //一次顯示幾張
        slidesToScroll: 1, //一次輪播幾張
        vertical: false, //改成垂直方向
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: wwMedium,
                settings: {
                    slidesToShow: 4,
                },
            },
        ],
    });

    // 固定步驟
    // var _steps = $('.steps');
    // const hh = $('.webHeader').outerHeight();
    // const stepHeight = _steps.innerHeight();
    // _window.scroll(function(){
    //   if( $(this).scrollTop() > hh) {
    //     _steps.addClass('fixed');
    //     _body.offset({top: stepHeight});
    //   } else {
    //     _steps.removeClass('fixed');
    //     _body.offset({top: 0});

    //   }
    // })
    // 固定header
    var _header = $('.webHeader');
    // const hh = $('.webHeader').outerHeight();
    // const stepHeight = _steps.innerHeight();
    _window.scroll(function () {
        if ($(this).scrollTop() > hh) {
            _header.addClass('fixed');
            // _body.offset({top: stepHeight});
        } else {
            _header.removeClass('fixed');
            // _body.offset({top: 0});
        }
    });
    // 常見問題開合
    $('.qaList').each(function () {
        let _qaList = $(this);
        let _ctrlBtn = _qaList.find('.ctrlBtn');
        let _qaItems = _qaList.find('li');
        let _a = _qaItems.find('.a');
        let _q = _qaItems.find('.q');
        const textOpen = _ctrlBtn.text();
        const textClose = _ctrlBtn.attr('data-altitle');

        _q.click(function () {
            _thisQ = $(this);
            if (_thisQ.parent().hasClass('show')) {
                _thisQ.next().slideUp(400);
                _thisQ.parent().removeClass('show');
            } else {
                _thisQ.next().slideDown(400);
                _thisQ.parent().addClass('show');
            }
        });

        _ctrlBtn.click(function () {
            if ($(this).hasClass('closeAll')) {
                _a.slideUp(400);
                _qaItems.removeClass('show');
                $(this).removeClass('closeAll').text(textOpen);
            } else {
                _a.slideDown(400);
                _qaItems.addClass('show');
                $(this).addClass('closeAll').text(textClose);
            }
        });
    });

    // 水平滑動的頁籤組
    var _sliderTabs = $('.sliderTabs');
    _sliderTabs.each(function () {
        let _this = $(this);
        let _tabItems = _this.find('.tabItems');
        let _tabItem = _tabItems.find('li');
        let tabItemLength = _tabItem.length;
        let i = _tabItem.filter('.now').index();
        let _slideList = _this.find('.slideList');

        _slideList.css({ left: -100 * i + '%' }, 400);

        _tabItems.append('<span class="movingBg"></span>'); //頁籤移動背景
        let _movingBg = _tabItems.find('.movingBg');

        _movingBg.css({
            left: (100 / tabItemLength) * i + '%',
            width: 100 / tabItemLength + '%',
        });

        _tabItem.css('width', 100 / tabItemLength + '%');

        _tabItem.click(function () {
            $(this).addClass('now').siblings().removeClass('now');
            i = $(this).index();

            _movingBg.animate({ left: (100 / tabItemLength) * i + '%' }, 300);
            _slideList.animate({ left: -100 * i + '%' }, 400);
        });
    });

    // 關注產業、偏好議題
    $('.checkGrid').each(function () {
        let _this = $(this);
        let _item = _this.find('.grid>li');
        let checkCount = _item.filter('.selected').length;
        let _warning = _this.find('.warning');
        const countMax = 5;

        _item.click(function (e) {
            let _thisItem = $(this);
            if (checkCount < countMax) {
                if (_thisItem.hasClass('selected')) {
                    $(this).removeClass('selected');
                    checkCount--;
                } else {
                    $(this).addClass('selected');
                    checkCount++;
                }
            } else {
                if (_thisItem.hasClass('selected')) {
                    $(this).removeClass('selected');
                    checkCount--;
                    _warning.stop(true, false).fadeOut(200);
                } else {
                    _warning.stop(true, false).fadeIn(200).delay(2000).fadeOut(600).css({
                        left: e.clientX,
                        top: e.clientY,
                    });
                }
            }
        });
    });

    // 左右滑動換頁
    $('.shiftShow').each(function () {
        let _this = $(this);
        let _shiftList = _this.find('.shiftList');
        let length = _this.find('.shiftBox').length;
        let i = 0;

        // const dotsClassName = 'shiftIndicator'; //點點的 class name
        let _dotLi = '';
        _shiftList.after('<div class="shiftIndicator"><ol></ol></div>');
        let indiList = _this.find('.shiftIndicator>ol');
        for (let n = 0; n < length; n++) {
            _dotLi += '<li></li>';
        }
        indiList.append(_dotLi);

        let _indecator = indiList.find('li');
        _indecator.eq(i).addClass('now');

        _shiftList.width(100 * length + '%');

        _indecator.click(function () {
            i = $(this).index();
            $(this).addClass('now').siblings().removeClass('now');
            _shiftList.animate({ left: -100 * i + '%' }, 400);
        });
    });

    // 燈箱 ---
    var _showLightbox = $('.showLightbox');
    var _lightbox = $('.lightbox');
    var _hideLightbox = _lightbox.find('.hideLightbox');
    var _lightboxNow;

    _lightbox.before('<div class="cover"></div>');
    var _cover = $('.cover');

    _showLightbox.click(function (e) {
        let boxID = $(this).attr('data-id');
        // if ($(this).is('a')) {
        //   e.prevantDefault();
        // }
        _lightboxNow = _lightbox.filter(function () {
            return $(this).attr('data-id') === boxID;
        });
        _lightboxNow.stop(true, false).fadeIn(speedFaster).addClass('show');
        _lightboxNow.prev(_cover).fadeIn(speedFaster);
        _body.addClass('noScroll');
    });

    _hideLightbox.click(function () {
        let _targetLbx = $(this).parents('.lightbox');
        _targetLbx.stop(true, false).fadeOut(speed, function () {
            _targetLbx.removeClass('show');
        });
        _targetLbx.prev(_cover).fadeOut(speed);
        _body.removeClass('noScroll');
    });

    _cover.click(function () {
        let _targetLbx = $(this).next('.lightbox');
        $(this).fadeOut(speed);
        _targetLbx.fadeOut(speed, function () {
            _targetLbx.removeClass('show');
        });
        _body.removeClass('noScroll');
    });
});
