var menutop={};
menutop.init=function(){
	menutop.itemMouseOver();
	menutop.itemMouseLeave();
	menutop.initPopup(); 
};
menutop.itemMouseOver=function(){
	$(".menutop ul li").mouseover(function(){
		var position=$(this).position();
		var index=$(this).index();
		
		$(".menutop ul li").removeClass("active");
		$(this).addClass("active");
		$(".menutopPopup").queue("fx", []);
		$(".menutopPopup").not($(".menutopPopup[index='"+index+"']")).css("display", "none");
		$(".menutopPopup[index='"+index+"']").css({left: position.left+113});
		$(".menutopPopup[index='"+index+"']").delay(300).slideDown(300);
	});
};
menutop.itemMouseLeave=function(){
	$("#topmenu_id").mouseleave(function(){
		$(".menutopPopup").css("display", "none");
		$(".menutop ul li").removeClass("active");
		$(".menutopPopup").stop(true, true);
	});
};
menutop.initPopup=function(){
	$(".menutopPopup ul li.haveinner").mouseover(function(){
		var maxHeight=0;
		var countBlock=$(".inneritem .block", this).length;
		countBlock++;
		var obj=this;
		$(this).parent().parent().delay(300).animate({width: countBlock*199}, 300, function(){
			$(".inneritem",obj).css("display", "block");
			$(".inneritem",obj).width(199*(countBlock-1));
			var heightDefault=$(".inneritem",obj).height();
			$(".inneritem .whitelist", obj).each(function(){
				if($(this).height()>maxHeight)
					maxHeight=$(this).height();
			});
// 			if(maxHeight>0 /*&& heightDefault<maxHeight*/){
// 				$(obj).parent().delay(300).animate({height: maxHeight}, 300);
// 			}
		});
		
	});
	$(".menutopPopup ul li.haveinner").mouseleave(function(){
		$(".menutopPopup").stop(true, true);
		$(".menutopPopup").css("width", "200px");
		$(".inneritem").css("display", "none");
	});
	
};

var footerhide={};
footerhide.init=function(){
	$(".footer .footer-hide").click(function(){
		if($(".footer .footer-menu .bottom").is(":visible")){
			//$(this).css("background-position", "0 -8px");
			$(".usersettings").removeClass("down");
			$(".footer .footer-menu .bottom").slideUp(500, function(){
				$(".footer .footer-menu").animate({height: "-=49px"}, 500);
			});
			//$(".footer .rights").css("display", "none");
			$.cookie("footersmall", "Y", {expires: 30, path: "/"});
		}else{
			//$(this).css("background-position", "0 0");
			$(".usersettings").addClass("down");
			$(".footer .footer-menu").animate({height: "+=49px"}, 500, function(){
				$(".footer .footer-menu .bottom").slideDown(500);
			});
			//$(".footer .rights").css("display", "block");
			$.cookie("footersmall", "", {expires: -1, path: "/"});
		}
	});
};

var catalogCategoryDescShow={};
catalogCategoryDescShow.init=function(){
	$(".catalog-category-desc-show a").click(function(){
		var hiddenObj=$(this).parent().parent().find(".catalog-category-desc-hidden");
		if(!hiddenObj.is(":visible")){
			hiddenObj.fadeIn(500);
			$(this).css("background-position", "0 -8px");
		}
		else{
			hiddenObj.fadeOut(500);
			$(this).css("background-position", "0 5px");
		}
		return false;
	});
};

var hiddenShow={};
hiddenShow.init=function(){
	$(".hidden-show a").click(function(){
		var hiddenObj=$(this).parent().parent().find(".hidden");
		if(!hiddenObj.is(":visible")){
			hiddenObj.fadeIn(500);
			$(this).css("background-position", "0 -8px");
		}
		else{
			hiddenObj.fadeOut(500);
			$(this).css("background-position", "0 5px");
		}
		return false;
	});
};

var slidertiny={};
slidertiny.sliderContentWidth=0;
slidertiny.init=function(){
	slidertiny.calculateWidth();
	slidertiny.events();
};
slidertiny.calculateWidth=function(){
	slidertiny.sliderContentWidth=$(".slider-tiny .slide").length*98+1;
	$(".slider-tiny .slide-wrapper").width(slidertiny.sliderContentWidth);
};
slidertiny.events=function(){
	$(".slider-tiny .arrow-right").click(function(){
		$(".slider-tiny .slider-tiny-content").animate({scrollLeft: "+=98px"}, 500, function(){
			slidertiny.arrowsStyle();
		});
	});
	$(".slider-tiny .arrow-left").click(function(){
		$(".slider-tiny .slider-tiny-content").animate({scrollLeft: "-=98px"}, 500, function(){
			slidertiny.arrowsStyle();
		});
	});
};
slidertiny.arrowsStyle=function(){
	var scroll=$(".slider-tiny .slider-tiny-content").scrollLeft();
	if(scroll==0){
		$(".slider-tiny .arrow-left").css("background-position", "0 -57px");
		if($(".slider-tiny .slide").length>4)
			$(".slider-tiny .arrow-right").css("background-position", "0 0");
	}else if(slidertiny.sliderContentWidth == scroll+4*98+1){
		$(".slider-tiny .arrow-right").css("background-position", "0 -38px");
		$(".slider-tiny .arrow-left").css("background-position", "0 -19px");
	}else {
		$(".slider-tiny .arrow-left").css("background-position", "0 -19px");
		$(".slider-tiny .arrow-right").css("background-position", "0 0");
	}
};

jQuery.fn.sliderProducts=function(options){
	return this.each(function() {
		var obj=this;
		var sliderProducts={};
		sliderProducts.sliderContentWidth=0;
		sliderProducts.init=function(){
			sliderProducts.calculateWidth();
			sliderProducts.events();
		};
		sliderProducts.calculateWidth=function(){
			sliderProducts.sliderContentWidth=$(".item", obj).length*250;
			$(".wrapper", obj).width(sliderProducts.sliderContentWidth);
		};
		sliderProducts.events=function(){
			$(".arrow-right", obj).click(function(){
				$("#slider-content", obj).animate({scrollLeft: "+=250px"}, 500, function(){
					sliderProducts.arrowsStyle();
				});
				return false;
			});
			$(".arrow-left", obj).click(function(){
				$("#slider-content", obj).animate({scrollLeft: "-=250px"}, 500, function(){
					sliderProducts.arrowsStyle();
				});
				return false;
			});
		};
		sliderProducts.arrowsStyle=function(){
			
			var scroll=$("#slider-content", obj).scrollLeft();
			if(scroll==0){
				$(".arrow-left", obj).css("background-position", "0px -153px");
				if($(".item", obj).length>3)
					$(".arrow-right", obj).css("background-position", "0 0");
			}else if(sliderProducts.sliderContentWidth == scroll+3*250){
				$(".arrow-left", obj).css("background-position", "0px -51px");
				$(".arrow-right", obj).css("background-position", "0px -102px");
			}else {
				$(".arrow-left", obj).css("background-position", "0px -51px");
				$(".arrow-right", obj).css("background-position", "0 0");
			}
		};
		sliderProducts.init();
	});
};


var tabs={};
tabs.tabObj=false;
tabs.activeTab=0;
tabs.w=0;
tabs.init=function(){
	tabs.tabObj=$(".tabs");
	tabs.calculateWidthControls();
	tabs.events();
	tabs.setActiveTab();
};
tabs.calculateWidthControls=function(){
	tabs.w=tabs.tabObj.width()/$("li", tabs.tabObj).length;
	$("li", tabs.tabObj).width(tabs.w);
	$(".top", tabs.tabObj).width(tabs.w);
};
tabs.setActiveTab=function(){
	$("li", tabs.tabObj).removeClass("active");
	$("li:eq("+tabs.activeTab+")", tabs.tabObj).addClass("active");
	$(".tabs .tabs-content").css("display", "none");
	$(".tabs .tabs-content:eq("+tabs.activeTab+")").fadeIn(500);
};
tabs.events=function(){
	$("li", tabs.tabObj).click(function(){
		tabs.activeTab=$(this).index();
		tabs.setActiveTab();
		return false;
	});
};

var showMore={};
showMore.init=function(){
	$(".show-more").click(function(){
		var showStep=$(this).attr("showStep");
		var selectorForShow=$(this).attr("selectorForShow");
		var countTotalShow=$(selectorForShow).length;
		if($(selectorForShow+":visible").length<countTotalShow){
			var i=0;
			$(selectorForShow).each(function(){
				if(!$(this).is(":visible")){
					i++;
					if(i<=showStep){
						$(this).fadeIn(500);
					}
				}
			});
		}
		if($(selectorForShow+":visible").length>=countTotalShow)
			$(this).fadeOut(500);
		return false;
	});
}

function print_r(theObj){
	if(theObj.constructor == Array || theObj.constructor == Object){
		document.write("<ul>")
		for(var p in theObj){
			if(theObj[p].constructor == Array|| theObj[p].constructor == Object){
				document.write("<li>["+p+"] => "+typeof(theObj)+"</li>");
				document.write("<ul>")
				print_r(theObj[p]);
				document.write("</ul>")
			} else {
				document.write("<li>["+p+"] => "+theObj[p]+"</li>");
			}
		}
		document.write("</ul>")
	}
}


jQuery.fn.sliderCC=function(options){
	var options = jQuery.extend({
		"firstSlide": 0,
		"timeSlide": 500,
		"posArrowLeftActive": "0px -51px",
		"posArrowLeftDeActive": "0px -153px",
		"posArrowRightActive": "0px 0px",
		"posArrowRightDeActive": "0px -102px",
	}, options);
	return this.each(function() {
		var activeSlide=options.firstSlide;
		var slider=jQuery(this);
		var lib={};
		lib.countSlide=slider.find(".slide").length;
		if(slider.find(".slide.active").index()>=0)
			lib.activeSlide=slider.find(".slide.active").index();
		else
			lib.activeSlide=options.firstSlide;
		lib.slideTo=function(n){
			slider.find(".slide").not(":eq("+n+")").fadeOut(options.timeSlide).removeClass("active");
			slider.find(".slide:eq("+n+")").fadeIn(options.timeSlide).addClass("active");
			lib.activeSlide=n;
			lib.checkControls();
		};
		lib.eventControl=function(){
			slider.find("#slider_controls a").live("click", function(){
				lib.slideTo($(this).index());
				return false;
			});
		};
		lib.eventControlArrow=function(){
			slider.find("#al").click(function(){
				if(lib.activeSlide>0){
					lib.activeSlide--;
					lib.slideTo(lib.activeSlide);
				}
				return false;
			});
			slider.find("#ar").click(function(){
				if(lib.activeSlide<lib.countSlide-1){
					lib.activeSlide++;
					lib.slideTo(lib.activeSlide);
				}
				return false;
			});
		};
		lib.checkControls=function(){
			slider.find("#slider_controls a").removeClass("active");
			slider.find("#slider_controls a:eq("+lib.activeSlide+")").addClass("active");
			if(lib.activeSlide>0)
				slider.find("#al").css("background-position", options.posArrowLeftActive);
			else if(lib.activeSlide==0)
				slider.find("#al").css("background-position", options.posArrowLeftDeActive);
			if(lib.activeSlide==lib.countSlide-1)
				slider.find("#ar").css("background-position", options.posArrowRightDeActive);
			else
				slider.find("#ar").css("background-position", options.posArrowRightActive);
		};
		// запускаем слайдер
		lib.eventControl();
		lib.eventControlArrow();
		lib.checkControls();
		lib.slideTo(lib.activeSlide);
	});
};

var shadow={};
shadow.show=function(){
	$("body").append("<div id='shadow' style='position:absolute;left:0;top:0;z-index:9000;background-color:#000; display:none;'></div>");
	var shadowHeight = $(document).height();
	var shadowWidth = $(window).width();
	$("#shadow").css({"width": shadowWidth, "height": shadowHeight});
	$("#shadow").fadeTo("slow",0.5);
};
shadow.hide=function(){
	$('#mask').hide();
	$("body").remove("#shadow");
};

// imagerCC
(function($){
	var data={
		contentWidth: 700,
		contentHeight: 700,
		windowHeight: 0,
		windowWidth: 0,
		documentHeight:0
	};
	var methods ={
		shadowShow: function(){
			$("body").append("<div id='shadow' style='position:absolute;left:0;top:0;z-index:9000;background-color:#000; display:none;'></div>");
			$("#shadow").css({"width": data.windowWidth, "height": data.documentHeight});
			$("#shadow").fadeTo("slow",0.3);
		},
		shadowHide: function(){
			$("#shadow").fadeOut(500, function(){
				$("#shadow").remove();
			});
		},
		preloaderShow:function(){
			$("#popupCC").append("<div id='popupCCPreloader' style='position: absolute; top: 50%; left: 50%; margin: -16px 0 0 -16px;'><img src='/images/ajax.gif'></div>");
		},
		preloaderHide: function(){
			$("#popupCCPreloader").remove();
		},
		calculateWH: function(){

			$("#popupCC").animate({
				left: data.windowWidth/2-data.contentWidth/2,
				top: data.windowHeight/2-data.contentHeight/2,
				width: data.contentWidth,
				height: data.contentHeight
			}, 300);
			
/*			$("#popupCC").animate({
				left: data.windowWidth/2-data.contentWidth/2,
				top: data.windowHeight/2-data.contentHeight/2,
				width: 700,
				height: 700
			}, 300);*/
			
		//	alert(data.contentWidth);
			
		},
		events: function(){
			$("#shadow").click(function(){
				methods.close();
			});
		},
		showContent: function(options){
			methods.preloaderHide();
			data.contentWidth=$("#popupCC #popupCCContent").width();
			if(data.contentWidth>options.maxWidth)
				data.contentWidth=options.maxWidth;
			///	
			if (options.Width) data.contentWidth = options.Width;
			
		//	alert(options.Width);
			///		
			data.contentHeight=$("#popupCC #popupCCContent").height();
			if(data.contentHeight>options.maxHeight)
				data.contentHeight=options.maxHeight;
				
			if (options.Height) data.contentHeight = options.Height;	
			
			data.contentHeight=data.contentHeight+30;
			methods.calculateWH();
			$("#popupCC #popupCCContent").fadeIn();
			if(options.success)
				options.success();
		},
		initContent: function(options, object){
			data.documentHeight = $(document).height();
			data.windowHeight = $(window).height();
			data.windowWidth = $(window).width();
			methods.shadowShow();
			$("body").append(options.content);
			$("#popupCC").css({left: data.windowWidth/2-67, top: data.windowHeight/2-67});
			methods.preloaderShow();
			if(options.inline){
				$("#popupCC #popupCCContent").html($(options.inlineId).html());
				methods.showContent(options);
			}else{
				$("#popupCC #popupCCContent").load(options.url, options.params, function(){
					methods.showContent(options);
				});
			}
			methods.events();
		},
		close: function(){
			methods.shadowHide();
			$("#popupCC").fadeOut(500, function(){
				$("#popupCC").remove();
			});
		},
		init: function(o){
			var options = jQuery.extend({
				url: false,
				params: {},
				success: false,
				maxHeight: 500,
				maxWidth: 500,
				inline: false,
				inlineId: false,
				content: "<div id='popupCC' style='position: fixed; z-index: 10000; padding: 15px; width: 135px; height: 135px; background-color: #fff; overflow: auto; -moz-border-radius: 8px; -webkit-border-radius: 8px;border-radius: 8px;-webkit-box-shadow: 0px 0px 4px rgba(0,0,0,0.3); -moz-box-shadow: 0px 0px 4px rgba(0,0,0,0.3); box-shadow: 0px 0px 4px rgba(0,0,0,0.3);'><div style='display: none;' id='popupCCContent'></div></div>"
			}, o);
			return this.each(function(){
				var object=$(this);
				$(this).click(function(){
					methods.initContent(options, object);
					return false;
				});
			});
		}
	};
	$.fn.popupCC = function(method){
		if(methods[method]){
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || ! method){
			return methods.init.apply( this, arguments );
		}
	};

})(jQuery);

(function($){
	var data={
		countSlide:0,
		object: false,
		fade: 500,
		timer: false
	};
	var methods ={
		initSlider: function(options, object){
			data.object=object;
			data.countSlide=$(".hlc-slider-content", data.object).length;
			methods.slideTo(options.activeSlide);
			methods.events();
			data.timer=setTimeout(methods.sliderTimer, 3000);
		},
		sliderTimer: function(){
			$(".crt-controls .arrow-right").click();
			data.timer=setTimeout(methods.sliderTimer, 3000);
		},
		sliderTimer: function(){
			$(".hlc-slider .arrow-right_content").click();
			data.timer=setTimeout(methods.sliderTimer, 3000);
		},
		events: function(){
			$(".hlc-slider-menu-top li").click(function(){
				methods.slideTo($(this).attr("index"));
				return false;
			});
			$(".hlc-slider-menu-bottom a").click(function(){
				methods.slideTo($(this).attr("first"));
				return false;
			});
			$(".crt-controls .arrow-right").click(function(){
				var currentIndex=$(".hlc-slider-content:visible").index();
				if(currentIndex==data.countSlide){
					currentIndex=0;
				}
				methods.slideTo(currentIndex);
				return false;
			});
			$(".hlc-slider .arrow-right_content").click(function(){
				var currentIndex=$(".hlc-slider-content:visible").index();
				if(currentIndex==data.countSlide){
					currentIndex=0;
				}
				methods.slideTo(currentIndex);
				return false;
			});
			$(".crt-controls .arrow-left").click(function(){
				var currentIndex=$(".hlc-slider-content:visible").index()-1;
				if(currentIndex==0){
					currentIndex=data.countSlide-1;
				}else{
					currentIndex--;
				}
				methods.slideTo(currentIndex);
				return false;
			});
			$(".hlc-slider .arrow-left_content").click(function(){
				var currentIndex=$(".hlc-slider-content:visible").index()-1;
				if(currentIndex==0){
					currentIndex=data.countSlide-1;
				}else{
					currentIndex--;
				}
				methods.slideTo(currentIndex);
				return false;
			});
			$(document).keydown(function(e) {
				if (e.keyCode == 37 && (e.ctrlKey || e.metaKey)) {
					$(".crt-controls .arrow-left").click();
				}else if (e.keyCode == 39 && (e.ctrlKey || e.metaKey)) {
					$(".crt-controls .arrow-right").click();
				}
			});
			$(document).keydown(function(e) {
				if (e.keyCode == 37 && (e.ctrlKey || e.metaKey)) {
					$(".hlc-slider .arrow-left_content").click();
				}else if (e.keyCode == 39 && (e.ctrlKey || e.metaKey)) {
					$(".hlc-slider .arrow-right_content").click();
				}
			});
			// timer
			$(".hlc-slider").mouseover(function(){
				clearTimeout(data.timer);
			});
			$(".hlc-slider").mouseleave(function(){
				data.timer=setTimeout(methods.sliderTimer, 3000);
			});
		},
		slideTo: function(n){
			methods.setActiveGroup(n);
			$(".hlc-slider-menu-top li").removeClass("active");
			$(".hlc-slider-menu-top li:eq("+n+")").addClass("active");
			if($(".hlc-slider-content").is(":animated")){
				$(".hlc-slider-content").stop(true);
			}
			$(".hlc-slider-content:visible").fadeOut(data.fade, function(){
				$(".hlc-slider-content:eq("+n+")").fadeIn(data.fade);
			})
		},
		setActiveGroup: function(n){
			// получим группу
			var group=$(".hlc-slider-content:eq("+n+")", data.object).attr("group");
			var tab=$(".hlc-slider-menu-bottom td:eq("+group+")");
			$(".hlc-slider-menu-bottom td").removeClass("active");
			tab.addClass("active");
			var tabWidth=tab.width();
			var tabPos=tab.position();
			$(".hlc-slider-menu-bottom .top").css("left", tabPos.left+tabWidth/2+"px");
			$(".hlc-slider-menu-bottom .top").css("display", "block");
			
			$(".hlc-slider-menu-bottom .bottom").css("left", tabPos.left+"px");
			$(".hlc-slider-menu-bottom .bottom").css("width", tabWidth+"px");
			$(".hlc-slider-menu-bottom .bottom").css("display", "block");
			
			if(!$(".hlc-slider-menu-top[group='"+group+"']").is(":visible")){
// 				$(".hlc-slider-menu-top:visible").slideUp();
// 				$(".hlc-slider-menu-top[group='"+group+"']").slideDown();
				$(".hlc-slider-menu-top:visible").css("display", "none");
				$(".hlc-slider-menu-top[group='"+group+"']").css("display", "block");
			}
		},
	
		init: function(o){
			var options = jQuery.extend({
				activeSlide: 0
			}, o);
			return this.each(function(){
				var object=$(this);
				methods.initSlider(options, object);
				return false;
			});
		}
	};
	$.fn.hlcSlider = function(method){
		if(methods[method]){
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || ! method){
			return methods.init.apply( this, arguments );
		}
	};

})(jQuery);

(function($){
	var data={
		countSlide:0,
		object: false,
		fade: 500,
		activeSlide:0
	};
	var methods ={
		initSlider: function(options, object){
			data.object=object;
			data.fade=options.fade;
			data.activeSlide=options.activeSlide;
			methods.slideTo(options.activeSlide);
			methods.events();
		},
		events: function(){
			$(".menu .item, .arrow-left, .arrow-right").die();
			$(".menu .item", data.object).click(function(){
				var group=$(this).attr("group");
				methods.slideTo($(".slide").filter("[group='"+group+"']:first").attr("slide"));
				data.activeSlide=$(".slide").filter("[group='"+group+"']:first").attr("slide");
				return false;
			});
			$(".arrow-right", data.object).click(function(){
				var slide=$(".slide:eq("+data.activeSlide+")", data.object);
				var group=slide.attr("group");
				var slides=new Array();
				$(".slide[group='"+group+"']", data.object).each(function(){
					slides.push($(this).attr("slide"));
				});
				if(data.activeSlide==slides[slides.length-1]){
					data.activeSlide=slides[0];
					methods.slideTo(slides[0]);
				}
				else{
					data.activeSlide++;
					methods.slideTo(data.activeSlide);
				}
				return false;
			});
			$(".arrow-left", data.object).click(function(){
				var slide=$(".slide:eq("+data.activeSlide+")", data.object);
				var group=slide.attr("group");
				var slides=new Array();
				$(".slide[group='"+group+"']", data.object).each(function(){
					slides.push($(this).attr("slide"));
				});
				if(data.activeSlide==slides[0]){
					data.activeSlide=slides[slides.length-1];
					methods.slideTo(slides[slides.length-1]);
				}
				else{
					data.activeSlide--;
					methods.slideTo(data.activeSlide);
				}
				return false;
			});
		},
		slideTo: function(n){
			methods.setActiveGroup(n);
			if($(".slide:visible", data.object).length==0)
					$(".slide:eq("+n+")", data.object).fadeIn(data.fade);
			else
				$(".slide:visible", data.object).fadeOut(data.fade, function(){
					$(".slide:eq("+n+")", data.object).fadeIn(data.fade);
				});
		},
		setActiveGroup: function(n){
			var slide=$(".slide:eq("+n+")", data.object);
			var group=slide.attr("group");
			if($(".slide[group='"+group+"']", data.object).length<=1){
				$(".arrow-left, .arrow-right", data.object).css("display", "none");
			}else{
				$(".arrow-left, .arrow-right", data.object).css("display", "block");
			}
			$(".menu .item").removeClass("active");
			$(".menu .item[group='"+group+"']").addClass("active");
		},
	
		init: function(o){
			var options = jQuery.extend({
				activeSlide: 0,
				fade: 500
			}, o);
			return this.each(function(){
				var object=$(this);
				methods.initSlider(options, object);
				return false;
			});
		}
	};
	$.fn.eventSlider = function(method){
		if(methods[method]){
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || ! method){
			return methods.init.apply( this, arguments );
		}
	};

})(jQuery);

$(document).ready(function(){
	menutop.init();
	footerhide.init();
	catalogCategoryDescShow.init();
	hiddenShow.init();
	slidertiny.init();
	tabs.init();
	showMore.init();
	// static
	$(".static_video").popupCC({
		inline: true,
		inlineId: ".static_video_inline",
		maxHeight: 700,
		maxWidth: 700
	});
	$(".static-slider").sliderCC();
	
	// логин 
	
	function top_panel_text() {
		var el = $("#shText");  
		var state = $("#shText").html();
		var i_p=$("#i_panel").val();
		
		var i_text=$("#i_panel_"+i_p).val();
		i_p=(i_p==0?i_p=1:i_p=0);
		
		//state = (state == i_text_0 ? i_text_1 : i_text_0);	
		//state=i_text_0;
		//el.replaceWith(state); 
		el.html(i_text); 
		$("#i_panel").val(i_p);
		if(i_p) $(".header_panel .sub-panel .si").html("&#9650;");
		else  $(".header_panel .sub-panel .si").html("&#9660;");
	}
	$("#login_id, .login_id, #sub-panel").click(function(){
		$("#top-panel").slideToggle();	
		var cd = $("#top-panel").css('height');
		if(cd!="1px") $(".blo_fon").css({"display":"none"});
		else  {$(".blo_fon").fadeTo('slow', 0.7);$(".blo_fon").css({"display":"block"});}
		top_panel_text();
	}); 
	$("#sub-panel_a").click(function(){
		$("#top-panel").slideToggle();	
		top_panel_text();
	}); 

	
	/*
	$("#login_id, .login_id").popupCC({
		url: site_dir+"ajax/login.php",
		maxHeight: 700,
		maxWidth: 700,
		Width: 700,
		Height: 290,
		success: function(){
			
		}
	});
	*/
	// css fix
	$(".catalog-category-items table tr:last td").css("border-bottom", "none");
	//$(".footer .copy-wrapper").width(850-$(".footer .sn").width());
	//$(".footer .sn").width($(".footer .sn").width()+80);
	
});