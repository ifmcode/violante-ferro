const $contactSection = $("#contact-section"),
  $aboutSection = $("#about-section"),
  $servicesSection = $("#services-menu-section"),
  $homeSection = $("#home-section");

let insideOfAService = false;

$("document").ready(function () {
  bindEvents();
  setInitialValues();
});

function setInitialValues() {
  //window.scrollTo(0, 0);
  disableScroll();
  positionateElements();
}

function bindEvents() {
  $("#home-section .link-to-contact-section").click(homeToContactSectionTransition);
  $("#home-section .link-to-about-section").click(homeToAboutSectionTransition);
  $("#home-section .link-to-services-menu-section").click(homeToServiceSectionTransition);
  $("#contact-section .link-to-home-section").click(contactToHomeSectionTransition);
  $("#about-section .link-to-home-section").click(aboutToHomeSectionTransition);
  $("#services-menu-section .link-to-home-section").click(servicesToHomeSectionTransition);
  $(".service-item").click(showService);
  $(".back-to-services-menu").click(leaveService);
}

function positionateElements() {
  const $email = $(".footer .email"),
    $phoneNumber = $(".footer .phone-number");
  $email.css("left",`-${$email.width()}px`);
  $phoneNumber.css("right",`-${$phoneNumber.width()}px`);
}

function homeToContactSectionTransition() {
  const animation = new TimelineMax();

  $contactSection.css("display","block");
  animation.to($contactSection, 1, {"top":"0", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"top": "-50%", ease: Power2.easeInOut}, 0);
}

function homeToAboutSectionTransition() {
  const animation = new TimelineMax();

  animation.to($aboutSection, 1, {"left":"0", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"left": "50%", ease: Power2.easeInOut, onComplete: function(){
      enableScroll();
    }}, 0);
}

function homeToServiceSectionTransition() {
  const animation = new TimelineMax();

  $servicesSection.css("display","block");
  animation.to($servicesSection, 1, {"left":"0", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"left": "-50%", ease: Power2.easeInOut}, 0);
}

function contactToHomeSectionTransition() {
  const animation = new TimelineMax();

  animation.to($contactSection, 1, {"top":"100%", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"top": "0", ease: Power2.easeInOut, onComplete: function(){
      $contactSection.css("display","none");
    }}, 0);
}

function aboutToHomeSectionTransition() {
  const animation = new TimelineMax();

  disableScroll()
  animation.to($aboutSection, 1, {"left":"-100%", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"left":"0", ease: Power2.easeInOut}, 0);
}

function servicesToHomeSectionTransition() {
  const animation = new TimelineMax();

  animation.to($servicesSection, 1, {"left":"100%", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"left":"0", ease: Power2.easeInOut, onComplete: function() {
      $servicesSection.css("display","none");
      $("#services-menu-section .header-section").css("top","0");
      $(".service-wrapper").css("top","100%");
      removeSelectedServiceClass();
    }}, 0);
}

function enableScroll() {
  $("body").css({"overflow-y": "auto", "height": "auto"});
}

function disableScroll() {
  $("body").css({"overflow-y": "hidden", "height": "100vh"});
}

function showService(event){
  const $selectedServiceDom = $(event.target);
  if (!$selectedServiceDom.hasClass("selected")) { //TODO: comprobación de que no haya animación ejecutandose
    const animation = new TimelineMax(),
      $getOutContainer = $("#services-menu-section .header-section"),
      $getInContainer = $(".service-wrapper"),
      $serviceItems = $(".service-item"),
      $backLink = $("#services-menu-section .back-to-services-menu");

      $(event.target).addClass("selected");
      $backLink.css("display","block");

      animation.to($getInContainer, 1, {"top":"0", ease: Power2.easeInOut}, 0);
      if (!insideOfAService) {
        animation.to($serviceItems, 1, {"font-size":"1.6rem", "margin-bottom":"20px", ease: Power2.easeInOut}, 0)
        .to($backLink, 1, {opacity:1}, 0);
      }
      animation.to($getOutContainer, 1, {"top": "-50%", ease: Power2.easeInOut, onComplete: function () {
        insideOfAService = true;
        enableScroll();
      }}, 0);
  }
}

function leaveService() {
  if (true) { //TODO: comprobación de que no haya animación ejecutandose
    insideOfAService = false;
    const animation1 = new TimelineMax();
      $serviceHeader = $("#services-menu-section .header-section"),
      $serviceTemplate = $(".service-wrapper"),
      $serviceItems = $(".service-item"),
      $backLink = $("#services-menu-section .back-to-services-menu");
  
    removeSelectedServiceClass();
    disableScroll();
  
    animation1.to($serviceTemplate, 1, {"top":"100%", ease: Power2.easeInOut}, 0)
      .to($serviceItems, 1, {"font-size":"4rem", ease: Power2.easeInOut}, 0)
      .to($serviceItems, 1, {"margin-bottom":"30px", ease: Power2.easeInOut}, 0)
      .to($backLink, .5, {"opacity":"0.001"}, 0)
      .to($serviceHeader, 1, {"top": "0", ease: Power2.easeInOut, onComplete: function () {
        $backLink.css("display","none");
      }}, 0);
  }
}

function removeSelectedServiceClass() {
  $(".service-item.selected").removeClass("selected");
}
