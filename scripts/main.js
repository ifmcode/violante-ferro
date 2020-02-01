const $contactSection = $("#contact-section"),
  $aboutSection = $("#about-section"),
  $servicesSection = $("#services-section"),
  $homeSection = $("#home-section"),
  whiteColor = "#ffffff",
  greyColor = "#000000";

// let insideOfAService = false;
let shownService;
let shownSection;
let generalAnimation;
let lastScroll;
let firstScrollDoneOnAboutSection;

$("document").ready(function () {
  setInitialValues();
  bindEvents();
});

function setInitialValues() {
  initializeVariables();
  positionateElements();
  loadSplash();
  disableScroll();
}

function bindEvents() {
  $(window).scroll(checkScroll);
  $(window).on( 'mousewheel', function(event) {
    event.preventDefault();
    checkScroll();
  });
  $("#home-section .link-to-contact-section").click(homeToContactSectionTransition);
  $("#home-section .link-to-about-section").click(homeToAboutSectionTransition);
  $("#home-section .link-to-services-section").click(homeToServiceSectionTransition);
  $("#contact-section .link-to-home-section").click(contactToHomeSectionTransition);
  $("#about-section .link-to-home-section").click(aboutToHomeSectionTransition);
  $("#services-section .link-to-home-section").click(servicesToHomeSectionTransition);
  $("#services-section #service-b .slider-arrow.left").click(moveToPreviousVideoSlide);
  $("#services-section #service-b .slider-arrow.right").click(moveToNextVideoSlide);
  $(".service-item").click(showService);
  $(".back-link .link-text").click(backLinkClicked);
  $(".logo").click(navegatetoHome);
}

function initializeVariables() {
  lastScroll = 0;
  shownService = null;
  shownSection = $homeSection;
  generalAnimation = new TimelineMax();
  firstScrollDoneOnAboutSection = false;
}

function navegatetoHome() {
  switch(shownSection) {
    case $contactSection:
      contactToHomeSectionTransition();
      break;
    case $aboutSection:
      aboutToHomeSectionTransition();
      break;
    case $servicesSection:
      servicesToHomeSectionTransition();
      break;
    default:
      break;
  }
}

function positionateElements() {
  const $email = $(".footer .email"),
    $phoneNumber = $(".footer .phone-number");
  $email.css("left",`-${$email.width()}px`);
  $phoneNumber.css("right",`-${$phoneNumber.width()}px`);
}

function loadSplash() {
  splashAnimation1();
}

function splashAnimation1() {
  generalAnimation = new TimelineMax();
  const progressBar = $(".splash .progress-bar");
  generalAnimation.to(progressBar, 2, {"left":"0", ease: Power2.easeOut, onComplete: function() {
    removeSplash();
  }}, 0);
}

function removeSplash() {
  generalAnimation = new TimelineMax(),
    $splash = $(".splash");
  generalAnimation.to($splash, 1, {opacity: 0, ease: Power2.easeOut, onComplete: function() {
    $splash.css("display", "none");
  }});
}

function checkScroll() {
  if (!generalAnimation._active) {
    let st = $(this).scrollTop();
    if (shownSection === $aboutSection) {
      if (!firstScrollDoneOnAboutSection) {
        executeFirstScroll();
      } else if (st <= window.innerHeight * 0.95) {
        scrollToTop();
      }
    }
  }
}

function showSocialAndBackLink() {
  const animation = new TimelineMax();
  $(".back-link").css("display","block");
  animation.to($(".back-link"), .5, {"opacity":"1"}, 0.5);
}

function hideSocialAndBackLink() {
  const animation = new TimelineMax();
  animation.to($(".back-link"), .5, {"opacity":"0.001", onComplete: function() {
    $(".back-link").css("display","none");
  }}, 0);
}

function enableScroll() {
  $("body").css({"overflow-y": "auto", "height": "auto"});
}

function disableScroll() {
  $("body").css({"overflow-y": "hidden", "height": "100vh"});
}

function scrollToTop() {
  generalAnimation = new TimelineMax();
  const animation = new TimelineMax();
  const $linkToHome = $("#about-section .link-to-home-section");
  hideSocialAndBackLink();
  disableScroll();
  generalAnimation.to( $("html, body"), 1, {scrollTop: 0, ease:Power2.easeInOut})
    .to($linkToHome, .3, {"opacity":"0.001", onComplete:function(){
      firstScrollDoneOnAboutSection = false;
      $linkToHome.css({"position":"absolute","top":"50%", "right":"40px"});
      animation.to($linkToHome, .3, {"opacity":"1"}, .8);
    }}, 0);
}

function executeFirstScroll(){
  generalAnimation = new TimelineMax();
  const animation = new TimelineMax();
  const $linkToHome = $("#about-section .link-to-home-section");
  generalAnimation.to( $("html, body"), 1, {scrollTop: window.innerHeight, ease:Power2.easeInOut}, 0)
    .to($linkToHome, .3, {"opacity":"0.001", onComplete:function(){
      firstScrollDoneOnAboutSection = true;
      $linkToHome.css({"position":"fixed","top":"110px", "right":"75px"});
      showSocialAndBackLink();
      animation.to($linkToHome, .3, {"opacity":"1", onComplete: function() {
        enableScroll();
      }}, .8);
		}}, 0);
}

function restoreServicesSection() {
  removeSelectedServiceClass();
  $servicesSection.css("display","none");
  $("#services-section .header-section").css("top","0");
  $(".service-wrapper").css("top","100%");
  $(".services-list").css("top","50%");
  $(".service-item").css({"font-size":"4rem", "margin-bottom":"30px"});
  $("#services-section .link-to-home-section").css({"position":"absolute","top":"50%", "opacity":"1"});
  $(".service-wrapper").removeClass("visible");
  shownService = null;
}

function restoreAboutSection() {
  hideSocialAndBackLink();
  const animation = new TimelineMax(),
    $linkToHome = $("#about-section .link-to-home-section");
  firstScrollDoneOnAboutSection = false;
  animation.to($linkToHome, .3, {"opacity":"0.001", onComplete:function(){
    $linkToHome.css({"position":"absolute","top":"50%", "right":"40px", "opacity":"1"});
  }}, 0);
}

function homeToContactSectionTransition() {
  if (!generalAnimation._active) {
    generalAnimation = new TimelineMax();
    $contactSection.css("display","block");
    generalAnimation.to($contactSection, 1, {"top":"0", ease: Power2.easeInOut}, 0)
      .to($homeSection, 1, {"top": "-50%", ease: Power2.easeInOut, onComplete: function () {
        shownSection = $contactSection;
      }}, 0);
  }
}

function homeToAboutSectionTransition() {
  if (!generalAnimation._active) {
    generalAnimation = new TimelineMax();
    generalAnimation.to($aboutSection, 1, {"left":"0", ease: Power2.easeInOut}, 0)
      .to($homeSection, 1, {"left": "50%", ease: Power2.easeInOut, onComplete: function(){
        shownSection = $aboutSection;
      }}, 0);
  }
}

function homeToServiceSectionTransition() {
  if (!generalAnimation._active) {
    generalAnimation = new TimelineMax();
    $servicesSection.css("display","block");
    generalAnimation.to($servicesSection, 1, {"left":"0", ease: Power2.easeInOut}, 0)
      .to($homeSection, 1, {"left": "-50%", ease: Power2.easeInOut, onComplete: function () {
        shownSection = $servicesSection;
      }}, 0);
  }
}

function contactToHomeSectionTransition() {
  if (!generalAnimation._active) {
    generalAnimation = new TimelineMax();
    generalAnimation.to($contactSection, 1, {"top":"100%", ease: Power2.easeInOut}, 0)
      .to($homeSection, 1, {"top": "0", ease: Power2.easeInOut, onComplete: function(){
        $contactSection.css("display","none");
        shownSection = $homeSection;
      }}, 0);
  }
}

function aboutToHomeSectionTransition() {
  if (!generalAnimation._active) {
    disableScroll()
    generalAnimation = new TimelineMax();
    $homeSection.css("top",`${$(window).scrollTop()}px`);
    restoreAboutSection();
    generalAnimation.to($aboutSection, 1, {"left":"-100%", ease: Power2.easeInOut}, 0)
      .to($homeSection, 1, {"left":"0", ease: Power2.easeInOut, onComplete: function () {
        shownSection = $homeSection;
        $(window).scrollTop(0);
        $homeSection.css("top","0");
      }}, 0);
  }
}

function servicesToHomeSectionTransition() {
  if (!generalAnimation._active) {
    disableScroll();
    const middleOfScreen = $(window).scrollTop() + (window.innerHeight * 0.5),
      $linkToHome = $("#services-section .link-to-home-section");
    generalAnimation = new TimelineMax();
    $(".services-list").css({"position":"absolute", "top":`${middleOfScreen}px`});
    hideSocialAndBackLink();
    $homeSection.css("top",`${$(window).scrollTop()}px`);
    generalAnimation.to($servicesSection, 1, {"left":"100%", ease: Power2.easeInOut}, 0)
      .to($linkToHome, .3, {"opacity":"0.001"}, 0)
      .to($homeSection, 1, {"left":"0", ease: Power2.easeInOut, onComplete: function() {
        restoreServicesSection();
        shownSection = $homeSection;
        $(window).scrollTop(0);
        $homeSection.css("top","0");
      }}, 0);
  }
}

function backLinkClicked() {
  if (shownSection === $servicesSection) {
    leaveService();
  } else if (shownSection === $aboutSection) {
    scrollToTop();
  }
}

function showService(event){
  const $selectedServiceDom = $(event.target);
  if (!$selectedServiceDom.hasClass("selected") && !generalAnimation._active) {
    disableScroll();
    generalAnimation = new TimelineMax();
    const serviceIdSelected = $selectedServiceDom.attr('data-service-index'),
      animation = new TimelineMax(),
      $getOutContainer = !shownService
        ? $("#services-section .header-section")
        : $(`#${shownService}.service-wrapper`),
      $getInContainer = $(`#${serviceIdSelected}`),
      $linkToHome = $("#services-section .link-to-home-section");
      $serviceList = $(".services-list"),
      $serviceItems = $(".service-item"),
      topOfScreen = $(window).scrollTop(),
      bottomOfScreen = $(window).scrollTop() + window.innerHeight;

    removeSelectedServiceClass();
    $(event.target).addClass("selected");
    $getInContainer.addClass('visible');
    $getInContainer.css({"z-index":"3", "top":`${bottomOfScreen}px`});
    $getOutContainer.css("z-index", "2");
    $serviceList.css("position","fixed");

    if (!shownService) {
      showSocialAndBackLink();
      generalAnimation.to($serviceItems, 1, {"font-size":"1.6rem", "margin-bottom":"20px", ease: Power2.easeInOut}, 0)
        .to($linkToHome, .3, {"opacity":"0.001"}, 0)
        .to($serviceList, 1, {"width":"200px"}, 0);
    }
    generalAnimation.to($getInContainer, 1, {"top":`${topOfScreen}px`, ease: Power2.easeInOut}, 0)
      .to($getOutContainer, 1, {"top": "-50%", ease: Power2.easeInOut, onComplete: function () {
        if ($getOutContainer.hasClass("service-wrapper")) {
          $getOutContainer.removeClass("visible");
          $getOutContainer.css("top","100%");
        }

        if (!shownService) {
          $linkToHome.css({"position":"fixed", "top":"110px"});
          animation.to($linkToHome, .3, {"opacity":"1"});
        }
        $(window).scrollTop(0);
        $getInContainer.css("top", "0");
        shownService = serviceIdSelected;
        enableScroll();
      }}, 0);
  }
}

function leaveService() {
  if (!generalAnimation._active) {
    disableScroll();
    generalAnimation = new TimelineMax();
    const animation = new TimelineMax(),
      $getInContainer = $("#services-section .header-section"),
      $getOutContainer = $(`#${shownService}.service-wrapper`),
      $linkToHome = $("#services-section .link-to-home-section"),
      $serviceItems = $(".service-item"),
      $serviceList = $(".services-list"),
      topOfScreen = $(window).scrollTop(),
      bottomOfScreen = $(window).scrollTop() + window.innerHeight;
    
    $getInContainer.css({"top":`${topOfScreen - (window.innerHeight * 0.5)}px`});
    removeSelectedServiceClass();
    
    hideSocialAndBackLink();
    generalAnimation.to($getOutContainer, 1, {"top":`${bottomOfScreen}px`, ease: Power2.easeInOut}, 0)
      .to($serviceItems, 1, {"font-size":"4rem", ease: Power2.easeInOut}, 0)
      .to($linkToHome, .3, {"opacity":"0.001"}, 0)
      .to($serviceList, 1, {"width":"400px"}, 0)
      .to($serviceItems, 1, {"margin-bottom":"30px", ease: Power2.easeInOut}, 0)
      .to($getInContainer, 1, {"top": `${topOfScreen}px`, ease: Power2.easeInOut, onComplete: function () {
        shownService = null;
        $getOutContainer.removeClass("visible");
        $getInContainer.css("top", "0");
        $getOutContainer.css("top","100%");
        $linkToHome.css({"top":"50%","position":"absolute"});
        animation.to($linkToHome, .3, {"opacity":"1"});
      }}, 0);
  }
}

function removeSelectedServiceClass() {
  $(".service-item.selected").removeClass("selected");
}

function moveToPreviousVideoSlide() {
  if (!generalAnimation._active) {
    generalAnimation = new TimelineMax();
    const slidesNumber = $(".video-slide").length - 1,
      currentIndex = $(".video-slide.active").index(),
      newIndex = ((currentIndex - 1) >= 0) ? (currentIndex - 1) : slidesNumber,
      newVideo = $(".video-slide")[newIndex];
      currentVideo = $(".video-slide")[currentIndex];
      $currentSlide = $(currentVideo),
      $newSlide = $(newVideo);
  
    $newSlide.css("left","-100%");
    $newSlide.addClass("active");
  
    generalAnimation.to($currentSlide, 1, {"left":"100%", ease: Power2.easeInOut}, 0)
      .to($newSlide, 1, {"left":"0", ease: Power2.easeInOut, onComplete: function() {
        $currentSlide.removeClass("active");
        $currentSlide.css("left","0");
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }}, 0);
  }
}

function moveToNextVideoSlide() {
  if (!generalAnimation._active) {
    generalAnimation = new TimelineMax();
    const slidesNumber = $(".video-slide").length - 1,
      currentIndex = $(".video-slide.active").index(),
      newIndex = (currentIndex + 1) <= slidesNumber ? (currentIndex + 1) : 0,
      currentVideo = $(".video-slide")[currentIndex];
      newVideo = $(".video-slide")[newIndex];
      $currentSlide = $(currentVideo),
      $newSlide = $(newVideo);
  
    $newSlide.css("left","100%");
    $newSlide.addClass("active");

    generalAnimation.to($currentSlide, 1, {"left":"-100%", ease: Power2.easeInOut}, 0)
      .to($newSlide, 1, {"left":"0", ease: Power2.easeInOut, onComplete: function() {
        $currentSlide.removeClass("active");
        $currentSlide.css("left","0");
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }}, 0);
  }
}
