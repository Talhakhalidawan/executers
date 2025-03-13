/*
* Executers Business Management - Main JavaScript
* Author: Claude
* Version: 2.0
*/

(function($) {
    "use strict";
    
    // Set light theme permanently
    // Navbar Scroll Effect
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled shadow-sm');
        } else {
            $('.navbar').removeClass('navbar-scrolled shadow-sm');
        }
    });
    
    // Back to Top Button
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    
    $('.back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    // Smooth Scrolling for Anchor Links
    $('a.nav-link[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);
                return false;
            }
        }
    });
    
    // Mobile Menu Collapse - Fix for dropdown issue
    $('.navbar-nav .nav-link').on('click', function() {
        if (!$(this).hasClass('dropdown-toggle')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // Fix for dropdown toggle in mobile view
    $('.dropdown-toggle').on('click', function(e) {
        if ($(window).width() < 992) {
            e.preventDefault();
            e.stopPropagation();
            $(this).next('.dropdown-menu').slideToggle();
            $(this).toggleClass('show');
            $(this).next('.dropdown-menu').toggleClass('show');
        }
    });
    
    // Close other dropdowns when one is opened
    $('.dropdown-toggle').on('click', function() {
        if ($(window).width() < 992) {
            $('.dropdown-toggle').not(this).removeClass('show');
            $('.dropdown-toggle').not(this).next('.dropdown-menu').removeClass('show').slideUp();
        }
    });
    
    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
        if ($(window).width() < 992) {
            if (!$(e.target).closest('.dropdown').length) {
                $('.dropdown-menu').removeClass('show').slideUp();
                $('.dropdown-toggle').removeClass('show');
            }
        }
    });
    
    // Animate on Scroll
    function animateOnScroll() {
        $('.animate__animated').each(function() {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (elementPos < topOfWindow + windowHeight - 50) {
                var animationClass = $(this).attr('data-animation') || 'animate__fadeInUp';
                $(this).addClass(animationClass);
            }
        });
    }
    
    // Run animation on scroll
    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Counter Animation
    function counterAnimation() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.text().replace(/[^0-9.]/g, '');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum + '+');
                }
            });
        });
    }
    
    // Run counter animation when element is in viewport
    var counterTriggered = false;
    $(window).on('scroll', function() {
        if (!counterTriggered && $('.stats-container').length && $(window).scrollTop() + $(window).height() > $('.stats-container').offset().top) {
            counterAnimation();
            counterTriggered = true;
        }
    });
    
    // Service Card Hover Effect
    $('.service-card').hover(
        function() {
            $(this).find('.service-icon i').addClass('animate__animated animate__heartBeat');
        },
        function() {
            $(this).find('.service-icon i').removeClass('animate__animated animate__heartBeat');
        }
    );
    
    // Testimonial Card Hover Effect
    $('.testimonial-card').hover(
        function() {
            $(this).find('.testimonial-rating').addClass('animate__animated animate__pulse');
        },
        function() {
            $(this).find('.testimonial-rating').removeClass('animate__animated animate__pulse');
        }
    );
    
    // Page Transition Effect
    $('body').append('<div class="page-transition"></div>');
    
    $('a:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"]):not(.no-transition)').on('click', function(e) {
        var href = $(this).attr('href');
        if (href && href !== '#') {
            e.preventDefault();
            $('.page-transition').addClass('active');
            setTimeout(function() {
                window.location.href = href;
            }, 500);
        }
    });
    
    // Form Validation
    $('.contact-form, .consultation-form').on('submit', function(e) {
        e.preventDefault();
        
        var $form = $(this);
        var formData = $form.serialize();
        var $submitBtn = $form.find('button[type="submit"]');
        var $alert = $form.find('.form-alert');
        
        if (!$alert.length) {
            $form.prepend('<div class="alert alert-success form-alert mb-4" style="display: none;"></div>');
            $alert = $form.find('.form-alert');
        }
        
        $submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...').prop('disabled', true);
        
        // Simulate form submission (replace with actual AJAX call in production)
        setTimeout(function() {
            $alert.removeClass('alert-danger').addClass('alert-success').html('Your message has been sent successfully!').slideDown();
            $submitBtn.html('Send Message').prop('disabled', false);
            $form[0].reset();
            
            setTimeout(function() {
                $alert.slideUp();
            }, 5000);
        }, 2000);
    });
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Dropdown hover effect on desktop
    if ($(window).width() > 991) {
        $('.navbar .dropdown').hover(
            function() {
                $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
            },
            function() {
                $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
            }
        );
    }
    
    // Accordion focus removal
    $('.accordion-button').on('click', function() {
        $(this).blur();
    });
    
    // Add animated background to hero section
    function addHeroAnimation() {
        if ($('.hero-section').length) {
            var animatedBg = '<div class="hero-animated-bg">';
            for (var i = 1; i <= 10; i++) {
                animatedBg += '<span></span>';
            }
            animatedBg += '</div>';
            $('.hero-section').prepend(animatedBg);
        }
    }
    
    // Initialize hero animation
    addHeroAnimation();
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Pricing toggle
    $('.pricing-toggle').on('change', function() {
        $('.pricing-monthly, .pricing-yearly').toggleClass('d-none');
    });
    
    // FAQ search functionality
    $('#faqSearch').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('.accordion-item').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    
    // Fix navbar-toggler animation
    $(document).ready(function() {
        // Add collapsed class to navbar-toggler initially
        $('.navbar-toggler').addClass('collapsed');
        
        // Handle navbar toggle click
        $('.navbar-toggler').on('click', function() {
            $(this).toggleClass('collapsed');
        });
        
        // Handle Bootstrap's events for proper animation
        $('#navbarSupportedContent').on('show.bs.collapse', function () {
            $('.navbar-toggler').removeClass('collapsed');
        });
        
        $('#navbarSupportedContent').on('hide.bs.collapse', function () {
            $('.navbar-toggler').addClass('collapsed');
        });
        
        // Fix mobile overflow on load
        $(window).on('load', function() {
            $('body').css('overflow-x', 'hidden');
        });
        
        // Prevent body scroll when mobile menu is open
        $('#navbarSupportedContent').on('show.bs.collapse', function () {
            $('body').css('overflow', 'hidden');
        });
        
        $('#navbarSupportedContent').on('hide.bs.collapse', function () {
            $('body').css('overflow', '');
        });
    });
    
})(jQuery); 