/* **********************************************************************
   basic.js
   ********************************************************************** */
   
/* ======================================================================
   search box
   ===================================================================== */

// for global header search form
var overLabeler = {
    init: function (form, input) {
        var label = form.find('label').addClass('overlabel');
        input.bind({
            focus: function () {
                label.hide();
            },
            blur: function () {
                if ($(this).val().length === 0) {
                    label.show();
                }
            }
        });
    }
};

$(function () {

    // prepare global header search form
    // (capture g.a. data / clear text box / apply overlabels)
    var searchForm = $('#global-search-form');
    var searchBox = searchForm.find('input#global-search-box').val("");
    var searchButton = searchForm.find('input#global-search-submit').keypress(function (e) {
        if (e.which === 13) {
            searchForm.data({
                'submission-type': 'from button via keyboard'
            })
        }
    });
    searchForm.submit(function () {
        var submissionType = '', submissionData = $(this).data('submission-type');
        if (typeof submissionData !== "undefined") {
            submissionType = submissionData;
        } else if (document.activeElement.id !== "global-search-box") {
            submissionType = 'from button via mouse';
        } else {
            submissionType = 'from text input';
        }
        submissionType = 'submit (' + submissionType + ')';
        _gaq.push(['_trackEvent', 'global header search form', submissionType]);
    });
    overLabeler.init(searchForm, searchBox);

});

/* ======================================================================
   subscribe box
   ===================================================================== */
	var searchForm = $('#subscribe-form');
    var searchBox = searchForm.find('input#gov-delivery-box').val("");
	overLabeler.init(searchForm, searchBox);

/* ==========================================================================================
   navigation and breadcrumbs
   ========================================================================================== */
var orient = {
    altPathname: $('head').find('meta[name="dcterms.isPartOf"]').attr('content'),
    crumbsSeparator: '>',
    hasCrumbs: false,
    homeURL: '/',
    init: function (menus) {
        var that = this;
        for (var i = 0; i < menus.length; i++) {
            findNavTrail(menus[i]);
        }
/*
        if (!this.hasCrumbs) {
            outputCrumbs();
        }
*/
        function findNavTrail (menu, isFound, savedItems) {
            if (typeof isFound === "undefined" || typeof savedItems === "undefined") {
                var isFound = false, savedItems = [];
            }
            var items = menu.children();
            $.each(items, function () {
                var href, item, link, submenu;
                item = $(this);
                submenu = item.find('ul').first();
                link = item.find('a').first();
                href = link.attr('href');
                if (isFound) {
                    return;
                } else if (href !== location.pathname && href !== that.altPathname) {
                    savedItems.push(item);
                    if (submenu.length !== 0) {
                        findNavTrail(submenu, isFound, savedItems);
                    }
                    savedItems.pop();
                } else {
                    savedItems.push(item);
                    savedItems = $(savedItems);
                    configureNav(savedItems, href);
/*
                    if (!that.hasCrumbs) {
                        outputCrumbs(savedItems, href);
                    }
*/
                    isFound = true;
                }
            });
        }
        function configureNav (items, href) {
            var numLinks = items.length;
            items.each(function (index) {
                var item = $(this);
                var link = item.find('a').first();
                // first LI in array
                if (index === 0) {
                    item.addClass('first-item')
                    link.addClass('first-link');
                }
                // neither first nor last LI in array
                if (index > 0 && index < (numLinks - 1)) {
                    item.addClass('middle-item')
                    link.addClass('middle-link');
                }
                // last LI in array
                if (index === (numLinks - 1)) {
                    item.addClass('last-item')
                    item.parent('ul').addClass('last-menu');
                    link.addClass('last-link');
                }
            })
        }
        function outputCrumbs (items, href) {
            // get the number of columns in the template
            var numCols = $('#global-wrapper').attr('class').split('_')[1];
            // create a grid unit for the list
            // add the list to the grid unit
            // add the grid unit to the DOM and hide it
            var crumbsContainer = $('<div id="breadcrumbs" class="grid_' + numCols + '"></div>').append(crumbs).insertAfter('#global-header').hide();
            // begin the breadcrumb trail with a link to the homepage and a separator
            var crumbs = $('<ol id="breadcrumbs-list"><li><a href="' + that.homeURL + '">Home</a> ' + that.crumbsSeparator + ' </li></ol>').appendTo(crumbsContainer);
            // create an empty list item for the breadcrumb
            var crumb = $('<li></li>');
            // if a link to the current page *was* found, add the relevant breadcrumbs
            if (typeof items !== "undefined") {
                items.each(function (index) {
                    var item = $(this), link = item.children(':first').clone();
                    if (index !== (items.length - 1) || href !== location.pathname) {
                        crumb.clone().append(link, ' ' + that.crumbsSeparator + ' ').appendTo(crumbs);
                    } else {
                        crumb.clone().append(link).appendTo(crumbs);
                    }
                });
            }
            // if a link to the current page *wasn't* found, use the page's H1 as the source of the last breadcrumb
            if (typeof href === "undefined" || href !== location.pathname) {
                var h1 = $('body').find('h1').html();
                crumb.clone().append(h1).appendTo(crumbs);
            }
            // show the grid unit
            crumbsContainer.show();
            // flag the breadcrumbs as having been added so that they're not added more than once
            that.hasCrumbs = true;
        }
    }
};
/* ==========================================================================================
   plugins
   ========================================================================================== */
/* ----------------------------------------------------------------------
   prepare accordion
   ---------------------------------------------------------------------- */
;(function ( $, window, undefined ) {
    var pluginName = 'prepareAccordion',
        document = window.document,
        defaults = {
            target: null,	// element after which to insert tabs
            keys: null		// element from which to generate keys
        };
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype.init = function () {
        var accordion = $('<div class="accordion"></div>').insertAfter(this.options.target),
            keys = this.options.keys,
            tabName = keys.get(0).nodeName,
            newPane = true,
            pane = $('<div class="pane"></div>');
        if (accordion.next().length !== 0) {
            addSibling(accordion.next());
        }
        function addSibling (sibling, newPane, thisPane) {
            var siblingName = sibling.get(0).nodeName;
            if (siblingName !== tabName) {
                if (newPane) {
                    thisPane = pane.clone().appendTo(accordion);
                    newPane = false;
                }
                thisPane.append(sibling);
            } else {
                accordion.append(sibling);
                newPane = true;
            }
            if (accordion.next().length !== 0) {
                addSibling(accordion.next(), newPane, thisPane);
            }
        }
    };
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }
}(jQuery, window));
/* ----------------------------------------------------------------------
   replace self-referring links
   ---------------------------------------------------------------------- */
(function ($) {
    $.fn.replaceSelfReferringLinks = function (options) {
        var settings = $.extend({
            test: location.pathname
        }, options);
        return this.each(function () {
            var link = $(this);
            var href = link.attr('href');
            var text = link.text();
            var span = $('<span></span>').append(text);
            if (href === settings.test) {
                link.parent().prepend(span);
                link.remove();
            }
        });
    }
})(jQuery);
/* ======================================================================
   on dom ready
   ====================================================================== */
$(function () {

    // configure Superfish
    // see http://users.tpg.com.au/j_birch/plugins/superfish/
    var superfishOptions = {
        hoverClass:  'over',
        delay:       650,		// delay on mouseout 
        animation:   {height:'show'},	// fade-in and slide-down animation 
        speed:       'normal',		// faster animation speed
        autoArrows:  false,		// disable generation of arrow mark-up
        dropShadows: false		// disable drop shadows
    };
    // array for nav menus
    var navMenus = [];
    // initialize global navigation
    var globalNavUL = $('#global-nav').find('ul').first();
    if (globalNavUL.length !== 0) {
        globalNavUL.superfish(superfishOptions);
        navMenus.push(globalNavUL);
    }
    // remove bottom border from last link in each dropdown menu
    var globalNavLIS = globalNavUL.children();
    globalNavLIS.find('ul a:last').addClass('last');
    // initialize local navigation
    var localNavDIV = $('#local-nav');
    var localNavUL = localNavDIV.find('ul').first();
    if (localNavDIV.length !== 0 && localNavUL.length !== 0) {
        navMenus.push(localNavUL);
    }
    // add pipe characters between list items in footer
    var footerDIV = $('#global-footer');
    var footerULS = footerDIV.find('ul');
    footerULS.each(function () {
        var ul = $(this);
        ul.find('li:not(:last)').append('|');
        navMenus.push(ul);
    });
    // initialize wayfinding
    orient.init(navMenus);
});
// to get around bfcache
window.onunload = function () {};