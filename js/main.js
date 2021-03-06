

$.fn.containWithinParent = function(){
  var caught = [],
	  scrollTop = 0,
	  $win = $(window).scroll(function(){
		scrollTop = $(this).scrollTop();
		for(var i in caught){
		  caught[i].scroll();  
		}
	  });
  
  
  function controller(elem){
	var self = elem;
	var parent = self.parent();
	
	return {
	  scroll: function(){
		if(scrollTop >= parent.offset().top && scrollTop < parent.offset().top + parent.height()){
		  self.removeClass("landed").addClass("airborne");
		}else{
			self.removeClass("airborne").addClass("landed");
		}
		
		if(scrollTop + self.height() >= parent.offset().top + parent.height()){
		  self.removeClass("airborne").addClass("landed").css({
			top: (parent.offset().top + parent.height()) - self.height()
		  });
		}else{
		  self.removeClass("landed").attr("style", "");
		}
		
	  }
	};
  }
  
  $(this).each(function(){
	caught.push(new controller($(this)));
  });
  
};




var rocket = $('.rocket');
rocket.containWithinParent();

var $html = $('html');
$(window).scroll(function(){
	$html.css({
		"background-position": "0 -" + $(this).scrollTop() * .2 + "px"
	});
});

$(window).resize(function(){
	$(this).triger("scroll");
})


