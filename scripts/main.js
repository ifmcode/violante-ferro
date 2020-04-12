const contactSection = $('#contact-section'),
  aboutSection = $('#about-section'),
  myIntentionSection = $('#services-section'),
  homeSection = $('#home-section');

let shownSection;
let generalAnimation;

$('document').ready(function () {
  setInitialValues();
  bindEvents();
});

function setInitialValues() {
  initializeVariables();
  loadSplash();
  disableScroll();
}

function bindEvents() {
  $('.link-to-contact-section').click(goToContactSection);
  $('.link-to-about-section').click(goToAboutSection);
  $('.link-to-services-section').click(goToMyIntentionSection);
  $('.home-logo-wrapper .logo').click(goToHomeSection);
  $('.home-logo-wrapper .logo-text').click(goToHomeSection);

  $('#services-section #service-b .slider-arrow.left').click(moveToPreviousVideoSlide);
  $('#services-section #service-b .slider-arrow.right').click(moveToNextVideoSlide);
}

function initializeVariables() {
  shownSection = homeSection;
  generalAnimation = new TimelineMax();
}

function loadSplash() {
  splashAnimation1();
}

function resetGeneralAnimation() {
  generalAnimation = new TimelineMax();
}

function splashAnimation1() {
  this.resetGeneralAnimation();
  const progressBar = $('.splash .progress-bar');
  generalAnimation.to(progressBar, .4, {'left':'0', ease: Power2.easeOut, onComplete: function() {
    removeSplash();
  }}, 0);
}

function removeSplash() {
  this.resetGeneralAnimation();
  generalAnimation.to($('.splash'), 1, {opacity: 0, ease: Power2.easeOut, onComplete: function() {
    $('.splash').css('display', 'none');
  }});
}

function enableScroll() {
  $('body').css({'overflow-y': 'auto', 'height': 'auto'});
}

function disableScroll() {
  $('body').css({'overflow-y': 'hidden', 'height': '100vh'});
}

function goToHomeSection() {
  if (shownSection !== homeSection && !generalAnimation._active) {
    updateActiveLink();
    navigate(homeSection);
  }
}

function goToContactSection(event) {
  if (shownSection !== contactSection && !generalAnimation._active) {
    updateActiveLink(event);
    navigate(contactSection);
  }
}

function goToAboutSection(event) {
  if (shownSection !== aboutSection && !generalAnimation._active) {
    updateActiveLink(event);
    navigate(aboutSection);
  }
}

function goToMyIntentionSection(event) {
  if (shownSection !== myIntentionSection && !generalAnimation._active) {
    updateActiveLink(event);
    navigate(myIntentionSection);
  }
}

function navigate(sectionToShow) {
  generalAnimation = new TimelineMax();
  sectionToShow.css('display','block');
  disableScroll();
  if (sectionToShow === homeSection) {
    doHomeAnimation(sectionToShow);
  } else {
    doSectionAnimation(sectionToShow);
  }

  $("footer").toggleClass("grey-background", sectionToShow === contactSection);
  $("header").toggleClass("light-grey-background", sectionToShow === myIntentionSection);
}

function updateActiveLink(event) {
  $(".section-link .link-text").removeClass('active');
  event && $(event.target).addClass('active');
}

function doSectionAnimation(sectionToShow) {
  sectionToShow.css('z-index', '2');
  shownSection.css('z-index', '1');
  generalAnimation.to(sectionToShow, 1, {'top':'0', ease: Power2.easeInOut}, 0)
  .to(shownSection, 1, {'top': '-50%', ease: Power2.easeInOut, onComplete: function () {
    if (shownSection !== homeSection) {
      shownSection.css({'display':'none', 'top':'100%'});
    } else {
      shownSection.css('display', 'none');
    }
    shownSection = sectionToShow;
    enableScroll();
  }}, 0);
}

function doHomeAnimation(sectionToShow) {
  sectionToShow.css('z-index', '1');
  shownSection.css('z-index', '2');
  generalAnimation.to(sectionToShow, 1, {'top':'0', ease: Power2.easeInOut}, 0)
  .to(shownSection, 1, {'top': '100%', ease: Power2.easeInOut, onComplete: function () {
    shownSection.css({'display':'none', 'top':'100%'});
    shownSection = sectionToShow;
    disableScroll();
  }}, 0);
}

function moveToPreviousVideoSlide() {
  if (!generalAnimation._active) {
    generalAnimation = new TimelineMax();
    const slidesNumber = $('.video-slide').length - 1,
      currentIndex = $('.video-slide.active').index(),
      newIndex = ((currentIndex - 1) >= 0) ? (currentIndex - 1) : slidesNumber,
      newVideo = $('.video-slide')[newIndex];
      currentVideo = $('.video-slide')[currentIndex];
      $currentSlide = $(currentVideo),
      $newSlide = $(newVideo);
  
    $newSlide.css('left','-100%');
    $newSlide.addClass('active');
  
    generalAnimation.to($currentSlide, 1, {'left':'100%', ease: Power2.easeInOut}, 0)
      .to($newSlide, 1, {'left':'0', ease: Power2.easeInOut, onComplete: function() {
        $currentSlide.removeClass('active');
        $currentSlide.css('left','0');
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }}, 0);
  }
}

function moveToNextVideoSlide() {
  if (!generalAnimation._active) {
    generalAnimation = new TimelineMax();
    const slidesNumber = $('.video-slide').length - 1,
      currentIndex = $('.video-slide.active').index(),
      newIndex = (currentIndex + 1) <= slidesNumber ? (currentIndex + 1) : 0,
      currentVideo = $('.video-slide')[currentIndex];
      newVideo = $('.video-slide')[newIndex];
      $currentSlide = $(currentVideo),
      $newSlide = $(newVideo);
  
    $newSlide.css('left','100%');
    $newSlide.addClass('active');

    generalAnimation.to($currentSlide, 1, {'left':'-100%', ease: Power2.easeInOut}, 0)
      .to($newSlide, 1, {'left':'0', ease: Power2.easeInOut, onComplete: function() {
        $currentSlide.removeClass('active');
        $currentSlide.css('left','0');
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }}, 0);
  }
}
