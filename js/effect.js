$(function(){

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
  _shiftLabel.each(function(){
    let _this = $(this);
    let _label = _this.children('label');
    let _input = _this.children('input');

    if( _input.val() !== '') {
      _label.addClass('shift');
    }

    _input.focus(function(){
      _label.addClass('shift');
    })
    _input.blur(function(){
      if( $(this).val() == '' ){
        _label.removeClass('shift');
      }
    })
  })

  // 隱藏、顯示密碼
  $('.viewIcon').click(function(){
    let _this = $(this);
    if( _this.hasClass('pwShow')) {
      _this.removeClass('pwShow').prev('input').attr('type', 'password');
    } else {
      _this.addClass('pwShow').prev('input').attr('type', 'text');
    }
  })


  // ----------------------------------------------------- slick 參數設定
  $('.otherSites').slick({
    arrows: true,                       //左右箭頭
    autoplay: true,                    //自動播放
    autoplaySpeed: 3000,                //自動播放秒數
    dots: false,                        //顯示圓點
    draggable: true,                    //滑鼠可以拖曳
    infinite: true,                     //無限輪播
    pauseOnHover: true,                 //滑鼠移過後暫停自動撥放
    rtl: false,                         //改變輪播方向
    slidesToShow: 2,                    //一次顯示幾張
    slidesToScroll: 1,                  //一次輪播幾張
    vertical: false,                   //改成垂直方向
    mobileFirst:true,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: wwMedium,
        settings: {
          slidesToShow: 4,
        }
      }
    ]
  });


  // 固定步驟
  var _steps = $('.steps');
  const hh = $('.webHeader').outerHeight();
  const stepHeight = _steps.innerHeight();
  _window.scroll(function(){
    if( $(this).scrollTop() > hh) {
      _steps.addClass('fixed');
      _body.offset({top: stepHeight});
    } else {
      _steps.removeClass('fixed');
      _body.offset({top: 0});

    }
  })



})