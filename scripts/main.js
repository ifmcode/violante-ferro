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
  $(".cookies-and-privacy-notification .close-button").click(hideCookieNotification);
}

function initializeVariables() {
  shownSection = homeSection;
  generalAnimation = new TimelineMax();
  // acordarme de rellamar a la función cuando haga un resize de la pantalla
  setHomeImageWidth();

}

function loadSplash() {
  splashAnimation1();
}

function setHomeImageWidth() {
  const windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;
  let imageHeight, imageWidth; 
  if (windowWidth > windowHeight) {
    imageWidth = `${windowWidth}px`;
    imageHeight = 'auto';
  } else {
    imageWidth = 'auto';
    imageHeight = `${windowHeight - 55}px`;
  }
  $("img.home-image").height(imageHeight);
  $("img.home-image").width(imageWidth);
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
    showCookieNotification();
  }});
}

function enableScroll() {
  $('body').css({'overflow-y': 'auto', 'height': 'auto'});
}

function disableScroll() {
  $('body').css({'overflow-y': 'hidden', 'height': '100vh'});
}

function showCookieNotification() {
  $(".cookies-and-privacy-notification").removeClass("hide");
}

function hideCookieNotification() {
  $(".cookies-and-privacy-notification").addClass("hide");
}

function goToHomeSection() {
  if (shownSection !== homeSection && !generalAnimation._active) {
    navigate(homeSection);
  }
}

function goToContactSection(event) {
  if (shownSection !== contactSection && !generalAnimation._active) {
    navigate(contactSection, event);
  }
}

function goToAboutSection(event) {
  if (shownSection !== aboutSection && !generalAnimation._active) {
    navigate(aboutSection, event);
  }
}

function goToMyIntentionSection(event) {
  if (shownSection !== myIntentionSection && !generalAnimation._active) {
    navigate(myIntentionSection, event);
  }
}

function navigate(sectionToShow, event) {
  updateActiveLink(event);
  generalAnimation = new TimelineMax();
  sectionToShow.css('display','block');
  disableScroll();
  if (sectionToShow === homeSection) {
    doHomeAnimation(sectionToShow);
  } else {
    doSectionAnimation(sectionToShow);
  }

  $("header").toggleClass("light-grey-background", sectionToShow === myIntentionSection);
}

function updateActiveLink(event) {
  $(".section-link .link-text").removeClass('active');
  event && $(event.target).addClass('active');
}

function doSectionAnimation(sectionToShow) {
  sectionToShow.css({'z-index': '2', 'top':'100%'});
  shownSection.css('z-index', '1');
  generalAnimation.to(sectionToShow, 1, {'top':'0', ease: Power2.easeInOut}, 0)
  .to(shownSection, 1, {'top': '-50%', ease: Power2.easeInOut, onComplete: function () {
    const cssRules = (shownSection !== homeSection)
      ? {'display':'none', 'top':'100%'}
      : {'display': 'none'};
    shownSection.css(cssRules);
    shownSection = sectionToShow;
    enableScroll();
  }}, 0);
}

function doHomeAnimation(sectionToShow) {
  const topOfScreen = $(window).scrollTop(),
    bottomOfScreen = $(window).scrollTop() + window.innerHeight;

  sectionToShow.css('z-index', '1');
  shownSection.css('z-index', '2');
  generalAnimation.to(sectionToShow, 1, {'top': `0`, ease: Power2.easeInOut}, 0)
  .to(shownSection, 1, {'top': '100%', ease: Power2.easeInOut, onComplete: function () {
    shownSection.css({'display':'none', 'top':'100%'});
    shownSection = sectionToShow;
    disableScroll();
  }}, 0);
}
