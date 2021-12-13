$(document).ready(function(){
    setInterval(function() {
        // Изображения
        $("img").each(function() {
          if (!$(this).hasClass("hd")) {
            if (this.src.includes('preview')) {
                var link = this.src.replace("/-/preview", "");
                link = link.replace("/webp/", "/jpg/");
                $(this).addClass('hd');
                $(this).attr('src', link);
                $(this).after( '<p class="download_image" link="'+ link +'"><svg class="icon icon--ui_download" width="20" height="20"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ui_download"></use></svg></p>');
            }
          }
        });
        
        // Обложка
        if (window.location.href.indexOf("/u/") != -1) {
          if (!$('.v-header-cover').hasClass("hd")) {
            if ($('.v-header-cover').length) {
                $('.v-header-cover').addClass('hd');
                var bg = $('.v-header-cover').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
                if (bg.includes('scale_crop')) {
                    bg = bg.replace("-/scale_crop/960/-/format/webp/", "format/png/");
                    $('.v-header-cover').css('background-image', 'url('+ bg +')');
                }
            }
          }
        }

      }, 1000);
      
  // Скачивание
  $(document).on('click','.download_image', function(){
    var time = new Date().getTime() / 1000;
    var link = $(this).attr('link');
    link = link.split('/');
    link.splice(4);
    var fixed_link = '';
    for (var i = 0; i < link.length; i++) {
      fixed_link += link[i]+'/';
    }
    console.log(fixed_link);

    saveAs(fixed_link, time + ".png");
  });

    setInterval(function() {
      if(window.location.href.indexOf("/u/") != -1) {
        var tabs = `
          <ul id="tabs">
              <li><a id="tab1">Все посты</a></li>
              <li><a id="tab2">Блог</a></li>
              <li><a id="tab3">Подсайты</a></li>
          </ul>
          <div class="tab-box" id="tab1C"></div>
          <div class="tab-box" id="tab2C"></div>
          <div class="tab-box" id="tab3C"></div>
        `;
        if ($('#tabs').length == 0) {
          $(tabs).insertBefore( $( ".feed" ) );
          $('#tabs li a:not(:first)').addClass('inactive');
          $('.tab-box').hide();
          $('.tab-box:first').show();
              
          $('#tabs li a').click(function(){
            var t = $(this).attr('id');
            if($(this).hasClass('inactive')){ //this is the start of our condition 
                $('#tabs li a').addClass('inactive');           
                $(this).removeClass('inactive');
                
                $('.tab-box').hide();
                $('#'+ t + 'C').fadeIn('slow');
            }
          });
        }
        
        setInterval(function() {
          $(".content-feed").each(function() {
            if ($('.andropov_image__inner').length) {
              if ($('.andropov_image__inner:eq(0) img').length) {
                if (!$(this).hasClass("moved")) {
                  $(this).addClass('moved');
                  $(this).clone().appendTo("#tab1C");
                  if ($(this).hasClass("content-feed--unknown")) {
                    $(this).appendTo("#tab2C");
                  } else {
                    $(this).appendTo("#tab3C");
                  }
                }
              }
            } else {
              if (!$(this).hasClass("moved")) {
                $(this).addClass('moved');
                $(this).clone().appendTo("#tab1C");
                if ($(this).hasClass("content-feed--unknown")) {
                  $(this).appendTo("#tab2C");
                } else {
                  $(this).appendTo("#tab3C");
                }
              }
            }
          });
        }, 1000);
      }
    }, 1000);
});
