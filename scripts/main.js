const $contactSection = $("#contact-section"),
  $aboutSection = $("#about-section"),
  $servicesSection = $("#services-section");

$('document').ready(function () {
  bindEvents();
  disableScroll();
  positionateElements();
});

function bindEvents() {
  $("#home-section .link-to-contact-section").click(homeToContactSectionTransition);
  $("#home-section .link-to-about-section").click(homeToAboutSectionTransition);
  $("#home-section .link-to-services-section").click(homeToServiceSectionTransition);
  $("#contact-section .link-to-home-section").click(contactToHomeSectionTransition);
  $("#about-section .link-to-home-section").click(aboutToHomeSectionTransition);
  $("#services-section .link-to-home-section").click(servicesToHomeSectionTransition);
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
  animation.to($contactSection, 0, {"top":"0", ease: Power2.easeInOut});
}

function homeToAboutSectionTransition() {
  const animation = new TimelineMax();
  enableScroll();
  animation.to($aboutSection, 0, {"left":"0", ease: Power2.easeInOut, onComplete: function(){
    $("body").css("height", `${$aboutSection.height()}px`);
	}});
}

function homeToServiceSectionTransition() {
  const animation = new TimelineMax();
  enableScroll();
  animation.to($servicesSection, 0, {"right":"0", ease: Power2.easeInOut});
}

function contactToHomeSectionTransition() {
  const animation = new TimelineMax();
  animation.to($contactSection, 0, {"top":"100%", ease: Power2.easeInOut, onComplete: function(){
    $contactSection.css("display","none");
	}});
}

function aboutToHomeSectionTransition() {
  const animation = new TimelineMax();
  disableScroll()
  animation.to($aboutSection, 0, {"left":"-100%", ease: Power2.easeInOut});
}

function servicesToHomeSectionTransition() {
  const animation = new TimelineMax();
  disableScroll()
  animation.to($servicesSection, 0, {"right":"-100%", ease: Power2.easeInOut});
}

function enableScroll() {
  $("body").css({"overflow-y": "auto", "height": "auto"});
}

function disableScroll() {
  $("body").css({"overflow-y": "hidden", "height": "100vh"});
}
