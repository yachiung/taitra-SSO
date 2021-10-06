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

  // 常見問題開合
  var _qaList = $('.qaList');
  _qaList.each(function(){
    let _q = $(this).find('.q');
    
    _q.click(function(){
      let _a = $(this).next('.a');
      let _qaPair = $(this).parent('li');
      if( _a.is(':hidden') ){
        _a.slideDown(400);
        _qaPair.addClass('show');
      } else {
        _a.slideUp(400);
        _qaPair.removeClass('show');
      }
    })
  })





  // 水平滑動的頁籤組
  var _sliderTabs = $('.sliderTabs');
  _sliderTabs.each(function(){
    let _this = $(this);
    let _tabItems = _this.find('.tabItems');
    let _tabItem = _tabItems.find('li');
    let tabItemLength = _tabItem.length;
    let i = _tabItem.filter('.now').index();
    let _blockList = _this.find('.blockList');

    _tabItems.append('<span class="movingBg"></span>'); //頁籤移動背景
    let _movingBg = _tabItems.find('.movingBg');

    _movingBg.css({
      left: (100/tabItemLength)*i + '%',
      width: (100/tabItemLength) + '%'
    });

    _tabItem.css('width', (100/tabItemLength) + '%');

    _tabItem.click(function(){
      $(this).addClass('now').siblings().removeClass('now');

      i = $(this).index();
      _movingBg.animate({ left: (100/tabItemLength)*i + '%' }, 300);
      _blockList.animate({ left: (-100*i) + '%'}, 400) });
  })




  // 關注產業、偏好議題
  $('.checkGrid').each(function(){
    let _this = $(this);
    let _item = _this.find('li');
    let count = _item.filter('.selected').length;
    let _warning = _this.find('.warning');
    let total = _item.length;
    const breakNumber = 12;
    const countMax = 5;

    _item.click( function(){
      let _this = $(this);
      if (count < countMax ){
        if( _this.hasClass('selected') ){
          $(this).removeClass('selected');
          count --; 
        } else {
          $(this).addClass('selected');
          count ++;
        }
      } else {
        if( _this.hasClass('selected') ){
          $(this).removeClass('selected');
          count --;
          _warning.stop(true, false).fadeOut(200);
        } else {
          _warning.css({
            left: _this.position().left,
            top: _this.position().top
          });
          _warning.stop(true, false).fadeIn(200).delay(2000).fadeOut(600);
        }
      }
    })

    console.log(total);


  })



})