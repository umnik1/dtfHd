$(document).ready(function(){
    setInterval(function() {
        $("img").each(function() { 
            if (this.src.includes('preview')) {
                var link = this.src.replace("/-/preview", "");
                link = link.replace("/webp/", "/png/");
                $(this).attr('src', link);
            }
        });
        
        if (window.location.href.indexOf("/u/") != -1) {
            var bg = $('.v-header-cover').css('background-image');
            bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
            if (bg.includes('scale_crop')) {
                bg = bg.replace("-/scale_crop/960/-/format/webp/", "format/png/");
                $('.v-header-cover').css('background-image', 'url('+ bg +')');
            }
        }
    
   }, 1000);

});
