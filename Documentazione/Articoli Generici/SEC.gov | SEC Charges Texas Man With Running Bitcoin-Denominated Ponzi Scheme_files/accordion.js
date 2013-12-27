$(function () {
    // reports
    var sliders = $('#sliders');
    slidersKeys = sliders
        .find('> ul').find('> li').find('> a').wrap('<li class="accordion-key"></li>');
    sliders
        .find('> ul').wrapInner('<div class="accordion accordion-1"></div>');
	sliders
		.find('li > ul')
        .wrap('<div class="accordion-slide"></div>');
    sliders
        .find('div.accordion')
        .tabs('div.accordion div.accordion-slide', {
            current: 'accordion-key-is-current',
            tabs: slidersKeys,
            initialIndex: null,
            effect: 'slide'
        });
});
