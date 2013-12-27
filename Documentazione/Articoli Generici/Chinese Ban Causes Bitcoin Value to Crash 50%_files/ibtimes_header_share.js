(function($){    
  $(document).ready(function(){
	  
    if($('div.top-block-soc').length){
      var body = $('body');
      var top_block = $('#node-social-share-buttons .sticky-enabled');
      var offsetLimit = top_block.offset().top;
      var height = $('div.top-block-soc').height();
      var klass = '';
            
      function recalculate_offsets(){
        offsetLimit = top_block.offset().top;
        if ($('#toolbar').is('div')) {
          klass = 'fixed_admin';
          offsetLimit -= $('#toolbar').height();
        }
        if ($('.toolbar-drawer').is('div') && !$('.toolbar-drawer.collapsed').is('div')) {
          klass = 'fixed_admin_double';
          offsetLimit -= $('.toolbar-drawer.collapsed').height()
        }
      }
      
      recalculate_offsets();
        
      var vOffset = document.documentElement.scrollTop || document.body.scrollTop;
      var originalLeft = top_block.offset().left;
      
      $('a.toggle.toolbar-toggle-processed').click(function(){
        top_block.removeClass(klass);
        recalculate_offsets();
        top_block.addClass(klass);
        handle_scroll();
      });
      
      function handle_scroll() {
        if($(window).scrollTop()>offsetLimit){
          top_block.addClass('fixed');
          klass ? top_block.addClass(klass):{};
          height = top_block.height();
          body.css('margin-top', height);
        } else {
          top_block.removeClass('fixed');
          klass ? top_block.removeClass(klass):{};
          body.css('margin-top', 'auto');
        }
      }

      handle_scroll();
      
      $(window).scroll(function(){
        handle_scroll();
      });
      
      $(window).bind('scroll.top-block-soc.fixed', $.proxy(this, function(){
        var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
        //$('div.top-block-soc').css('left', (originalLeft-hScroll) + 'px');
      }));
      
      $(window).bind('resize.top-block-soc.fixed', $.proxy(this, function(){
        originalLeft = $('#main').offset().left+10;
        var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
        //$('div.top-block-soc').css('left', (originalLeft-hScroll) + 'px');
      }));
    }

    $('#block-ibtimes-general-index-final-b-block-1').addClass('banner_position_absolute');


    $('.breaking_news_close').bind('click', function() {
       $(this).parents('.breaking_news_block').css('display', 'none');
       return false;
    });

    $('#block-ibtimes-general-more-tv .more-tv-btn').bind('click', function(event) {
        event.preventDefault();
        $('#block-ibtimes-general-more-tv .more_tv_border').addClass('more_tv_border_full');
    });

    $('#block-ibtimes-general-tv-content-comments-2 .see-more-comment-btn').bind('click', function(event) {
        event.preventDefault();
        $('#block-ibtimes-general-tv-content-comments-2 .comment-form').addClass('comment-form_full');
        $('#block-ibtimes-general-tv-content-comments-2 .comment-form .display_none').removeClass('display_none');
    });

    $('#block-ibtimes-general-ibt-tv-switcher .light').bind('click', function(event) {
        event.preventDefault();
        if (!$('body').hasClass('section-ibt-tv-white-detail')) {
            $('body').removeClass('section-ibt-tv-dark-detail').addClass('section-ibt-tv-white-detail');
        }
    });

    $('#block-ibtimes-general-ibt-tv-switcher .dark').bind('click', function(event) {
        event.preventDefault();
        if (!$('body').hasClass('section-ibt-tv-dark-detail')) {
            $('body').removeClass('section-ibt-tv-white-detail').addClass('section-ibt-tv-dark-detail');
        }
    });
	
	
     $('.text-medium').addClass('text-size-active');

      $('.text-small').bind('click', function(event) {
          event.preventDefault();
          if (!$(this).hasClass('current-text-size')) {
              if ($('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').hasClass('medium-text-size')) {
                  $('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').removeClass('medium-text-size');
              }
              else {
                  $('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').removeClass('big-text-size');
              }
              if ($('.article-node-title p').hasClass('medium-text-size')) {
                  $('.article-node-title p').removeClass('medium-text-size');
              }
              else {
                  $('.article-node-title p').removeClass('big-text-size');
              }
              $('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p').addClass('small-text-size');
              $('.article-node-title p').addClass('small-text-size');
              $('.current-text-size').removeClass('current-text-size');
              $(this).addClass('current-text-size');
			  $('.text-medium, .text-big').removeClass('text-size-active');
			  $('.text-small').addClass('text-size-active');
			  
          }
      });

      $('.text-medium').bind('click', function(event) {
          event.preventDefault();
          if (!$(this).hasClass('current-text-size')) {
              if ($('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').hasClass('small-text-size')) {
                  $('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').removeClass('small-text-size');
              }
              else {
                  $('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').removeClass('big-text-size');
              }
              if ($('.article-node-title p').hasClass('small-text-size')) {
                  $('.article-node-title p').removeClass('small-text-size');
              }
              else {
                  $('.article-node-title p').removeClass('big-text-size');
              }
              $('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').addClass('medium-text-size');
              $('.article-node-title p').addClass('medium-text-size');
              $('.current-text-size').removeClass('current-text-size');
              $(this).addClass('current-text-size');
			  
			  $('.text-small, .text-big').removeClass('text-size-active');
			  $('.text-medium').addClass('text-size-active');
          }
      });

      $('.text-big').bind('click', function(event) {
          event.preventDefault();
          if (!$(this).hasClass('current-text-size')) {
              if ($('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').hasClass('small-text-size')) {
                  $('.node-article .article-content p, .expert_network_text_block p, .node-article .article-node-title').removeClass('small-text-size');
              }
              else {
                  $('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').removeClass('medium-text-size');
              }
              if ($('.article-node-title p').hasClass('small-text-size')) {
                  $('.article-node-title p').removeClass('small-text-size');
              }
              else {
                  $('.article-node-title p').removeClass('medium-text-size');
              }
              $('.node-article .article-content p, .expert_network_text_block p, .node-slideshow p, .node-article .article-node-title').addClass('big-text-size');
              $('.article-node-title p').addClass('big-text-size');
              $('.current-text-size').removeClass('current-text-size');
              $(this).addClass('current-text-size');
			  
			  $('.text-small, .text-medium').removeClass('text-size-active');
			  $('.text-big').addClass('text-size-active');
          }
      });
	

        $('.page-templates-outer header a, .page-templates-outer footer a').each(function() {
            if(!this.target) {
                this.target = '_top';
            }
        });
		
		 $(".soc-facebook").hover(
			function() { 
			$(".soc-facebook-flyout iframe").css("height","auto");
			$(".soc-facebook-flyout iframe").css("width","auto");
			$(".soc-facebook-flyout").show().css("display","block"); }
			);
		
		  $(".soc-facebook-flyout").mouseleave(
			function() { $(".soc-facebook-flyout").hide(); }
		   );
		
		  $(".soc-twitter").hover(
			function() { $(".soc-twitter-flyout").show().css("display","block"); }
		  );
		  $(".soc-twitter-flyout").mouseleave(
			function() { $(".soc-twitter-flyout").hide(); }
		   );		 
		  $(".soc-linkedin").hover(
			function() { $(".soc-linkedin-flyout").show().css("display","block"); }
		  );
		  $(".soc-linkedin-flyout").mouseleave(
			function() { $(".soc-linkedin-flyout").hide(); }
		   );
		   $(".soc-gp").hover(
			function() { $(".soc-google_plusone-flyout").show().css("display","block"); }
			
		  );
		  /*$(".soc-google_plusone-flyout").mouseleave(
			function() { $(".soc-google_plusone-flyout").hide(); }
		   );*/
		   
		   $(".soc-facebook").mouseenter(
			  function() { $(".soc-twitter-flyout, .soc-linkedin-flyout, .soc-google_plusone-flyout").hide(); }
			);
		   $(".soc-twitter").mouseenter(
			  function() { $(".soc-facebook-flyout, .soc-linkedin-flyout, .soc-google_plusone-flyout").hide(); }
			);
		   $(".soc-linkedin").mouseenter(
			  function() { $(".soc-twitter-flyout, .soc-facebook-flyout, .soc-google_plusone-flyout").hide(); }
			);	
			$(".soc-gp").mouseenter(
			  function() { $(".soc-twitter-flyout, .soc-facebook-flyout, .soc-linkedin-flyout").hide(); }
			);	
			$(".soc-comments").mouseenter(
			  function() { $(".soc-twitter-flyout, .soc-facebook-flyout, .soc-linkedin-flyout, .soc-google_plusone-flyout").hide(); }
			);	
			$(".soc-more").mouseenter(
			  function() { $(".soc-twitter-flyout, .soc-facebook-flyout, .soc-linkedin-flyout, .soc-google_plusone-flyout").hide(); }
			);
			  
	 });
})(jQuery)