

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
var $instruct = $('.scroll-reminder');
var hasScrolled = false;

setTimeout(function(){
	if(!hasScrolled){
		$instruct.fadeIn();
	}
}, 2000)

var check;

$(window).scroll(function(){
	if(hasScrolled === false){
		hasScrolled = true;
		$instruct.fadeOut();
	}

	clearTimeout(check);
	check = setTimeout(function(){
		hasScrolled = false
		//if it's not on the bottom
		if($(window).scrollTop() !== $(document).height() - $(window).height()){
			$instruct.fadeIn();
		}else{
			console.log("You're already at the bottom, silly!")
		}
	}, 5000)

	$html.css({
		"background-position": "0 -" + $(this).scrollTop() * .2 + "px"
	});
});

$(window).resize(function(){
	$(this).trigger("scroll");
})


