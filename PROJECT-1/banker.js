$(document).ready(function() {

    // Hide loader on page load
    $('.loader').fadeOut();
    $('#overlayer').fadeOut();

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'slide',
        once: true,
        mirror: false
    });

    // Mobile menu toggle
    $('.js-menu-toggle, .js-menu-toggle-close').on('click', function(e) {
        e.preventDefault();
        $('.site-mobile-menu').toggleClass('site-mobile-menu-open');
    });

    // Close mobile menu on outside click
    $(document).mouseup(function(e) {
        var container = $('.site-mobile-menu');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('site-mobile-menu-open');
        }
    });

    // Clone main menu for mobile
    $('.js-clone-nav').clone().appendTo('.site-mobile-menu-body > ul');

    // Smooth scrolling for nav links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').animate({
            'scrollTop': $target.offset().top - 80 // Adjust for fixed header
        }, 800, 'swing');
    });

    // Active nav link on scroll (ScrollSpy)
    $('body').scrollspy({
        target: '.site-navbar-target',
        offset: 100
    });

    // Sticky header
    $('.js-sticky-header').sticky({ topSpacing: 0 });

    // Hero slider (Owl Carousel)
    $('.single-text').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        items: 1,
        nav: false,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });

    // Testimonials slider (Owl Carousel)
    $('.slide-one-item').owlCarousel({
        center: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        items: 1,
        margin: 0,
        stagePadding: 0,
        nav: true,
        navText: [
            '<span class="icon-keyboard_arrow_left"></span>',
            '<span class="icon-keyboard_arrow_right"></span>'
        ],
        responsive: {
            0: { items: 1, nav: false },
            600: { items: 1, nav: false },
            1000: { items: 1 }
        }
    });

    // How it works sliders (Owl Carousel - synced)
    var owl1 = $('.slide-one-item-alt').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        items: 1,
        margin: 0,
        nav: false,
        dots: false,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });

    var owl2 = $('.slide-one-item-alt-text').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        items: 1,
        margin: 0,
        nav: false,
        dots: false,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });

    // Sync the two how-it-works carousels
    owl1.on('changed.owl.carousel', function(event) {
        owl2.trigger('to.owl.carousel', [event.item.index, 300, true]);
    });
    owl2.on('changed.owl.carousel', function(event) {
        owl1.trigger('to.owl.carousel', [event.item.index, 300, true]);
    });

    // Custom navigation for how-it-works
    $('.custom-prev').on('click', function() {
        owl1.trigger('prev.owl.carousel');
        owl2.trigger('prev.owl.carousel');
    });
    $('.custom-next').on('click', function() {
        owl1.trigger('next.owl.carousel');
        owl2.trigger('next.owl.carousel');
    });

    // Gallery filtering (Isotope)
    var $grid = $('.row-no-gutter').isotope({
        itemSelector: '.item',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
            columnWidth: '.item'
        }
    });

    // Filter buttons
    $('.filters .btn').on('click', function() {
        $('.filters .btn').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    // Images loaded for Isotope (to handle dynamic loading)
    $grid.imagesLoaded().progress(function() {
        $grid.isotope('layout');
    });

    // Fancybox for gallery images
    $('[data-fancybox="gallery2"]').fancybox({
        buttons: [
            'zoom',
            'slideShow',
            'thumbs',
            'fullscreen',
            'close'
        ],
        loop: true,
        keyboard: true,
        toolbar: true,
        animationEffect: 'fade',
        transitionEffect: 'fade'
    });

    // Mouse scroll indicator (smooth scroll to next section)
    $('.mouse').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#next').offset().top
        }, 800, 'swing');
    });

    // Form submission (basic handling - replace with actual backend)
    $('form').on('submit', function(e) {
        e.preventDefault();
        alert('Form submitted! (This is a demo - integrate with your backend.)');
        // Example: $.ajax({ url: '/submit', data: $(this).serialize(), ... });
    });

    // Newsletter subscribe (basic handling)
    $('.footer-subscribe form').on('submit', function(e) {
        e.preventDefault();
        var email = $(this).find('input[type="text"]').val();
        if (email) {
            alert('Subscribed! Thank you. (Demo)');
            $(this).find('input[type="text"]').val('');
        }
    });

    // Optional: Countdown (if used - not visible in HTML, but script is loaded)
    // $('#countdown').countdown('2025/01/01', function(event) {
    //     $(this).html(event.strftime('%D days %H:%M:%S'));
    // });

    // Window resize handler (re-init carousels if needed)
    $(window).on('resize', function() {
        if ($('.single-text').hasClass('owl-loaded')) {
            $('.single-text').owlCarousel('refresh');
        }
        if ($('.slide-one-item').hasClass('owl-loaded')) {
            $('.slide-one-item').owlCarousel('refresh');
        }
    });

    // Parallax effect for hero (optional, using easing)
    $('.site-blocks-cover').css('background-attachment', 'fixed');

});