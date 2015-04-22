(function(){  
    var disable = false;
    var methods = {
        init : function(options) {
            var settings = $.extend({
                scrollSpeed: 2000,
                selector: ".scrol-page",
                activeClass: 'active',
                ignoreClass: 'scroolnav-ignore',
                itemClass: 'scroolnav-item',
                autoScroll: true,
                menuPos: 'top',
                menuFixed: true,
                fixedElement: '',
            }, options );

            $(this).addClass('scrolnav');
            
            var pageOffset = new Array();
            var lastScroll;
            var menuOffset = 0 ;
            var $fixElem = $(this);
            if(settings.fixedElement != '') {
                $fixElem = $(this).closest(settings.fixedElement);
            }
            if(settings.menuPos == 'top') {
                menuOffset = $(this).height()+$(this).offset().top;
            }

            $(settings.selector).height($(window).height());
            
            $('.scrolnav').find('a').each(function(key,value) {
                var exclude = false;
                if(typeof $(value).attr('class') != 'undefined') {
                    var req = new RegExp('^.*\\s'+settings.ignoreClass+'\\s.*$', "g");
                    exclude = req.test($(value).attr('class'));
                }
                var id = $(value).prop("hash");
                if(id != '' && !exclude) {
                    $(value).addClass(settings.itemClass);
                    $(value).click(function() {
                        if(!disable) {
                            $('html, body').animate({
                                scrollTop: $(id).offset().top
                            }, settings.scrollSpeed,function() { 
                                $('.scrolnav').find('.'+settings.activeClass).removeClass(settings.activeClass);
                                $(value).addClass(settings.activeClass);
                            });
                        }
                        return false;
                    });
                    var $elem = $('body').find(settings.selector+id);
                    pageOffset.push({key: id, offset: $elem.offset().top, menuElem: $(value) });
                    if($(window).scrollTop()+menuOffset >= $elem.offset().top) {
                        $fixElem.css({
                            'position': 'fixed',
                            'top': '0',
                            'left': '0',
                            'width': '100%'
                        });
                        $('.scrolnav').find('.'+settings.activeClass).removeClass(settings.activeClass);
                        $(value).addClass(settings.activeClass);
                    } 
                    else if(window.location.hash && window.location.hash == id && settings.autoScroll) {
                        $(value).trigger( "click" );
                        $('.scrolnav').find('.'+settings.activeClass).removeClass(settings.activeClass);
                        $(value).addClass(settings.activeClass);
                    }
                }
            });
            
            pageOffset.sort(function(a,b) {
                return a.offset - b.offset;
            });
            
            $(window).scroll(function() {
                if(!disable) {
                    var $active = $('.scrolnav').find('.'+settings.activeClass);
                    var currentPos = $(this).scrollTop();
                    if (currentPos > lastScroll) {
                        if(menuOffset < currentPos) {
                            $fixElem.css({
                                'position': 'fixed',
                                'top': '0',
                                'left': '0',
                                'width': '100%'
                            });
                        }
                        var $next = findMenuElement(pageOffset,$active.prop("hash"),'next');
                        if(currentPos+$(this).height() == $(document).height()) {
                            $active.removeClass(settings.activeClass);
                            $('.scrolnav').find('li:last-child').find('a.'+settings.itemClass).addClass(settings.activeClass);
                        }
                        else if($next.offset < currentPos) {
                            $active.removeClass(settings.activeClass);
                            $next.menuElem.addClass(settings.activeClass);
                        }

                    } else if (currentPos < lastScroll ){
                        if(menuOffset >= currentPos) {
                            $fixElem.css({
                                'position': 'static',
                                'top': 'auto',
                                'left': 'auto',
                                'width': 'auto'
                            });
                        }
                        var $prev = findMenuElement(pageOffset,$active.prop("hash"),'prev');
                        if(currentPos == 0) {
                            $active.removeClass(settings.activeClass);
                            $('.scrolnav').find('li:first-child').find('a.'+settings.itemClass).addClass(settings.activeClass);
                        }
                        else if($prev.offset > currentPos) {
                            $active.removeClass(settings.activeClass);
                            $prev.menuElem.addClass(settings.activeClass);
                        }
                    }
                    lastScroll = currentPos;
                }
            });
            
            $(window).resize(function () {
                pageOffset.forEach(function(entry) {
                    var newOffset = $('body').find(settings.selector+entry.key);
                    entry.offset = newOffset.offset().top
                });
            });
            
            return $(this);
        },
        disable : function( ) { disable = true; },
        enable : function( ) { disable = false; },
    };
    
    $.fn.scrolnav = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1));
        } else if (typeof methodOrOptions === 'object' || ! methodOrOptions) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method'+methodOrOptions+'does not exist on jQuery.scrolnav');
        }    
    };
    
    function findMenuElement(array,key,pos) {
        for (var index = 0;index < array.length;++index) {
            if(array[index].key == key) {
                if(pos == 'next') {
                    if(index+1 < array.length) {
                        return array[index+1];
                    } else {
                        return array[array.lengt-1]
                    }
                }
                else if(pos == 'prev') {
                    if(index-1 > 0) {
                        return array[index-1];
                    } else {
                        return array[0];
                    }
                }
            }
        }
    }
    
    $.fn.scrolnav.defaults = { 'selector': '.scrol-page', scrollSpeed: 2000, activeClass: 'active', ignoreClass: 'scroolnav-ignore', itemClass: 'scroolnav-item', autoScroll: true, menuPos: 'top',menuFixed: true };
})(jQuery);


