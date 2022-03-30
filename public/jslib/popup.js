PopupPanel = function(){
	$('body').append(
		$('<div></div>').attr("id","bg").css({"width":"100%", "height":"100%", "background":"url(/img/black_bg.png) repeat", "position":"fixed", "left":0, "top":0, "z-index":10, "display":"none"}).bind("click",function() {
					$('#bg').fadeOut();
					$('#popupcontent').fadeOut();
				})
	);
	$('body').append(
		$('<div></div>').attr("id", "popupcontent").css({"width":"80%", "height":"70%", "position":"fixed", "left":"10%", "top":"15%", "background":"#FFF", "border-radius":"15px","display":"none", "z-index":11}).append(
			$('<div></div>').css({"position":"absolute", "right":"0"}).append(
				$("<img></img>").attr('src', '/img/closebtn.png').css({"width":"30px","height":"auto","margin":"-15px -15px 0px 0px"}).bind("click",function() {
					$('#bg').fadeOut();
					$('#popupcontent').fadeOut();
				})
			)
		).append(
			$('<div></div>').css({"width":"100%", "height":"40px", "background":"#1d9ce5","border-radius":"15px 15px 0px 0px"}).append(
				$('<div></div>').css({"text-align":"center","margin":"auto", "padding-top":"10px", "font-size":"18px;"}).attr("id","bgTitle").html("")
			)
		).append(
			$('<div></div>').css({"overflow":"auto","padding":"10px","width":"95%","height":"85%"}).append(
				$('<div></div>').attr("id","bgPanelContent").html("")
			)
		)
	);
};

PopupPanel.prototype.open=function(pData) {
	$('#bgPanelContent').html(pData);
	$('#bg').fadeIn();
	$('#popupcontent').fadeIn();
}

PopupPanel.prototype.setTitle=function(pTitle){
	$('#bgTitle').html(pTitle)
}