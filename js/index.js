// test

// $(document).on('click',function(e){
//   console.log(e.target);       
// });

// logo position start---------------
$('.page-header').each(function(){
  $(document).on('scroll', function(){
    var scrollTop = $(this).scrollTop();
    if (scrollTop > 250){
      $('.logo').css('transform','translateY(-100%)');
    }else{
      $('.logo').css('transform','translateY(0%)');
    };
  });

});



// logo position end---------------

// slideshow start -------------------
$('.slideshow').each(function(){
  // 變數定義---------------------
  var container = $(this),
      slideGroup = container.find('.slideshow-slides'),
      slides = slideGroup.find('.slide'),
      nav = container.find('.slideshow-nav'),
      indicator = container.find('.slideshow-indicator'),

      slideCount = slides.length,
      // 用來建立.slideshow-indicator內HTML內容的變數
      indicatorHTML = '',
      // 記錄目前slide的序號
      currentIndex = 0,
      duration = 1500,
      // 需引用jQuery UI才有效果
      easing = 'easeOutExpo',

      // 自動切換至下一張的時間
      interval = 5000,
      // 滑鼠移入slide時暫停自動播放要用的變數
      timer,
      index = 2;
  // --------------------


  // 產生並插入indicator（圖片錨點）內容（a標籤）-----
  slides.each(function(i){
    indicatorHTML += '<a href = "#"' + (i + 1) + '</a>';
  });
  indicator.html(indicatorHTML);
  // 變數定義END--------------------

  // function定義 --------

  // 定義function 顯示對應的slide
  function goToSlide(index){
    slideGroup.animate({left: -100 * index + '%'},duration,easing);
    // 記錄目前slide的序號
    currentIndex = index;
    // 更新導覽圖示狀態（左右箭頭、錨點）
    updateNav();
  };

  // 定義function 更新導覽圖示狀態（左右箭頭、錨點）
  function updateNav(){
    var navPrev = nav.find('.prev'),
        navNext = nav.find('.next');

    if (currentIndex === 0){
      navPrev.addClass('disabled');
    }else {
      navPrev.removeClass('disabled');
    };

    if (currentIndex === slideCount -1){
      navNext.addClass('disabled');
    }else {
      navNext.removeClass('disabled');
    };

    // 先把錨點的active class清掉，再依據當前slide的序號加入active class
    indicator.find('a').removeClass('active').eq(currentIndex).addClass('active');

  };

  // 自動播放計時器開始function
  function startTimer(){
    timer = setInterval(function(){
      // 根據目前的index決定下個顯示的slide，如果是最後一個slide則回到第一張
      var nextIndex = (currentIndex + 1 ) % slideCount;
      goToSlide(nextIndex);
    },interval)
  };
  // 自動播放計時器停止function
  function stopTimer(){
    clearInterval(timer);
  };

  // function定義END--------------------   


  // mouse事件處理（點擊指標、箭頭，滑入slide)----

  // 點擊箭頭時顯示對應的slide
  nav.find('a').on('click', function(e){
    e.preventDefault();
    if ($(this).hasClass('prev')){
      goToSlide(currentIndex - 1)
    }else{
      goToSlide(currentIndex +1 )
    };
  });

  // 點擊錨點時顯示對應的slide
  indicator.find('a').on('click', function(e){
    e.preventDefault();
    // 如果所點擊的a沒有active class,
    if(!$(this).hasClass('active')){
      // .index方法，可回傳目標物件其所屬兄弟元素間的序號，從0開始
      goToSlide($(this).index());
    }

  })

  // 滑鼠移入時停止Timer,移出時開始Timer

  container
    .on('mouseenter',stopTimer)
    .on('mouseleave',startTimer);        
  // mouse事件處理END-------------------- 

  // 啟動slideshow------------------

  // 載入網頁後顯示第一個slide的狀態，因為預設變數currentIndex = 0
  goToSlide(currentIndex);
  // 啟動Timer
  startTimer();

});


// slideshow end -------------------



// stickyNav start -----------------
var nav = $('.primary-nav'),
    navOffsetTop = nav.offset().top;
$(document).on('scroll', function(){

  // console.log(navOffsetTop);
  if($(this).scrollTop() > navOffsetTop ){
    nav.addClass('sticky');
  }else{
    nav.removeClass('sticky');
  };
});

              
// stickyNav end -----------------





// Product Tab section start -------
// 使用jQuery UI : Tabs,Effects Core
$('#section_product').each(function(){
  var container = $(this),
      navItem = container.find('.tabs-nav'),
      hightlight = container.find('.tabs-hightlight');
  
  container.tabs({
    hide: { duration: 50 },
    show: { duration: 25 },
    
    create: moveHighlight, 
    activate: moveHighlight
  });
  
  function moveHighlight(event, ui){
    var newTab = ui.newTab || ui.tab,
        left = newTab.position().left;
    
    hightlight.animate({left: left}, 500, 'easeOutBack');
  };
});


    
// Product Tab section end -------


// Smoothscroll start ----------

$(document).on('click','a',function(e){
  // 先取消a標籤的預設動作
  if ($(this).hasClass('scrollAnchor')){
    e.preventDefault();
    var target= $(e.target).attr('href');
    $('html,body').animate({
      scrollTop: $(target).offset().top
    },1000);
  }else{
    return;
  }

});
// Smoothscroll end ----------



// Contact start -------------

$('.js-input').focus(function(){
  $(this).parent().find('.label-text').addClass('is-active')
});
$('.js-input').blur(function(){
  if($(this).val() == 0){
    $(this).parent().find('.label-text').removeClass('is-active')
  };
});


// Contact End ---------------