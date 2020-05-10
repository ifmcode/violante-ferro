const contactSection = $('#contact-section'),
  aboutSection = $('#about-section'),
  myIntentionSection = $('#services-section'),
  homeSection = $('#home-section');

let shownSection,
  generalAnimation,
  isMobileMenuShown,
  isMobileSizes;

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
  $(window).resize(resizeElements);
  $('.link-to-contact-section').click(goToContactSection);
  $('.link-to-about-section').click(goToAboutSection);
  $('.link-to-services-section').click(goToMyIntentionSection);
  $('.home-logo-wrapper .logo').click(goToHomeSection);
  $('.home-logo-wrapper .logo-text').click(goToHomeSection);
  $(".cookies-and-privacy-notification .close-button").click(hideCookieNotification);
  $(".cookies-policy-link").click(showPoliciesPopup);
  $(".cookies-and-privacy-policies-popup .close-button").click(hidePoliciesPopup);
  $("header .mobile-menu-logo-wrapper").click(showMobileMenu);
  $(".mobile-menu-wrapper .menu-left-part").click(hideMobileMenu);
  $(".mobile-menu-wrapper .menu-right-part .close-button").click(hideMobileMenu);
}

function initializeVariables() {
  shownSection = homeSection;
  generalAnimation = new TimelineMax();
  isMobileMenuShown = false;
  isMobileSizes = window.innerWidth <= 1000;
  adjustHomeImage();
}

function resizeElements() {
  adjustHomeImage();
  isMobileSizes = window.innerWidth <= 1000;
  if (isMobileMenuShown && window.innerWidth >= 850) {
    hideMobileMenu();
  }

  if (window.innerWidth >= 650) {
    $(".cookies-and-privacy-notification").removeClass("horizontal-centered");
  } else {
    $(".cookies-and-privacy-notification").addClass("horizontal-centered");
  }
}

function adjustHomeImage() {
  const mainImage = $("#home-section .home-image-wrapper .home-image"),
    maxHeight = window.innerHeight - 55,
    maxWidth = window.innerWidth;

  if (mainImage.height() < maxHeight) {
    mainImage.css({"height": "100%", "width": "auto"});
  }
  if (mainImage.width() < maxWidth) {
    mainImage.css({"height": "auto", "width": "100%"});
  }
}

function loadSplash() {
  resetGeneralAnimation();
  const progressBar = $('.splash .progress-bar');
  generalAnimation.to(progressBar, 1, {'left':'0', ease: Power2.easeOut, onComplete: function() {
    removeSplash();
  }}, 0);
}

function showMobileMenu() {
  if (!generalAnimation._active) {
    resetGeneralAnimation();
    isMobileMenuShown = true;
    $(".mobile-menu-wrapper").css("display", "block");
    generalAnimation.to($(".mobile-menu-wrapper"), 1, {'left':'0', ease: Power2.easeOut}, 0);
  }
}

function hideMobileMenu() {
  resetGeneralAnimation();
  generalAnimation.to($(".mobile-menu-wrapper"), 1, {'left':'100%', ease: Power2.easeIn, onComplete: function() {
    $(".mobile-menu-wrapper").css("display", "none");
    isMobileMenuShown = false;
  }}, 0);
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

function removeSplash() {
  resetGeneralAnimation();
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

function showPoliciesPopup() {
  $(".cookies-and-privacy-policies-popup").css({"display":"block","opacity":"1"});
}

function hidePoliciesPopup() {
  $(".cookies-and-privacy-policies-popup").css({"display":"none","opacity":"0"});
}

function goToHomeSection() {
  if (shownSection !== homeSection && !generalAnimation._active) {
    navigate(homeSection);
  }
}

function isLinkOfMobileMenu(event) {
  return event && $(event.target).parents('.mobile-menu-wrapper').length > 0;
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
  disableScroll();
  isLinkOfMobileMenu(event) && hideMobileMenu();
  updateActiveLink(event);
  generalAnimation = new TimelineMax();
  sectionToShow.css('display','block');
  (sectionToShow === homeSection)
    ? doHomeAnimation(sectionToShow)
    : doSectionAnimation(sectionToShow);

  $("header").toggleClass("light-grey-background", sectionToShow === myIntentionSection);
}

function updateActiveLink(event) {
  $(".section-link .link-text").removeClass('active');
  event && $(event.target).addClass('active');
}

function doSectionAnimation(sectionToShow) {
  sectionToShow.scrollTop(0);
  sectionToShow.css({'z-index': '2', 'top':'100%'});
  shownSection.css('z-index', '1');
  const animationDuration = isMobileSizes ? 0 : 1;
  generalAnimation.to(sectionToShow, animationDuration, {'top':'55px', ease: Power2.easeInOut}, 0)
  .to(shownSection, animationDuration, {'top': '-50%', ease: Power2.easeInOut, onComplete: function () {
    const cssRules = (shownSection !== homeSection)
      ? {'display':'none', 'top':'100%'}
      : {'display': 'none'};
    shownSection.css(cssRules);
    shownSection = sectionToShow;
    enableScroll();
  }}, 0);
}

function doHomeAnimation(sectionToShow) {
  adjustHomeImage();
  sectionToShow.css('z-index', '1');
  shownSection.css('z-index', '2');
  const animationDuration = isMobileSizes ? 0 : 1;
  generalAnimation.to(sectionToShow, animationDuration, {'top': `55px`, ease: Power2.easeInOut}, 0)
  .to(shownSection, animationDuration, {'top': '100%', ease: Power2.easeInOut, onComplete: function () {
    shownSection.css({'display':'none', 'top':'100%'});
    shownSection = sectionToShow;
    disableScroll();
  }}, 0);
}
