const $contactSection = $("#contact-section"),
  $aboutSection = $("#about-section"),
  $servicesSection = $("#services-section"),
  $homeSection = $("#home-section");

// let insideOfAService = false;
let shownService;
let shownSection;

$("document").ready(function () {
  setInitialValues();
  bindEvents();
});

function setInitialValues() {
  //window.scrollTo(0, 0);
  initializeVariables();
  positionateElements();
  checkScroll();
  loadSplash();
  disableScroll();
}

function bindEvents() {
  $("#home-section .link-to-contact-section").click(homeToContactSectionTransition);
  $("#home-section .link-to-about-section").click(homeToAboutSectionTransition);
  $("#home-section .link-to-services-section").click(homeToServiceSectionTransition);
  $("#contact-section .link-to-home-section").click(contactToHomeSectionTransition);
  $("#about-section .link-to-home-section").click(aboutToHomeSectionTransition);
  $("#services-section .link-to-home-section").click(servicesToHomeSectionTransition);
  $(".service-item").click(showService);
  $(".back-to-services-menu").click(leaveService);
}

function initializeVariables() {
  shownService = null;
  shownSection = $homeSection;
}

function positionateElements() {
  const $email = $(".footer .email"),
    $phoneNumber = $(".footer .phone-number");
  $email.css("left",`-${$email.width()}px`);
  $phoneNumber.css("right",`-${$phoneNumber.width()}px`);
}

function loadSplash() {
  const animation = new TimelineMax();
  const progressBar = $(".splash .progress-bar");
  animation.to(progressBar, 2, {"left":"0", ease: Power2.easeOut, onComplete: function() {
    removeSplash();
  }}, 0)
}

function removeSplash() {
  const animation = new TimelineMax(),
    $splash = $(".splash");
  animation.to($splash, 1, {opacity: 0, ease: Power2.easeOut, onComplete: function() {
    $splash.css("display", "none");
  }});
}

let lst = 0;
let wHeight = window.innerHeight;
let animating = false;
function checkScroll() {
  $(window).scroll(function(event){
    let st = $(this).scrollTop();
    if (shownSection === $aboutSection && !animating) { //  && !animating
      animating = true;
      if (st > lst && st >= 0 && st < wHeight * 0.9){ // st < 100 && 
        autoScroll('down'); 
        console.log('down', st);
      } else if (st < lst && st >= wHeight && st < wHeight * 1.1) { //  && st >= wHeight
        console.log('top', st);
        autoScroll('top');
      }
    }
    lst = st;
  });
}

function autoScroll(direction) {
  const scrollToPosition = direction === 'top' ? 0 : wHeight; 
  TweenLite.to(window, {duration: 1, scrollTo: scrollToPosition, onComplete: function() {
    animating = false;
    console.log('terminado');
  }});


}

function enableScroll() {
  $("body").css({"overflow-y": "auto", "height": "auto"});
}

function disableScroll() {
  $("body").css({"overflow-y": "hidden", "height": "100vh"});
}

function restoreServicesSection() {
  const $serviceItems = $(".service-item"),
    $backLink = $("#services-section .back-to-services-menu");
    
  removeSelectedServiceClass();
  $servicesSection.css("display","none");
  $("#services-section .header-section").css("top","0");
  $(".service-wrapper").css("top","100%");
  $serviceItems.css({"font-size":"4rem", "margin-bottom":"30px"});
  $backLink.css("opacity","0.001");
  $(".services-list").css("position","absolute");
  shownService = null;
}

function homeToContactSectionTransition() {
  const animation = new TimelineMax();

  $contactSection.css("display","block");
  animation.to($contactSection, 1, {"top":"0", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"top": "-50%", ease: Power2.easeInOut, onComplete: function () {
      shownSection = $contactSection;
    }}, 0);
}

function homeToAboutSectionTransition() {
  const animation = new TimelineMax();

  animation.to($aboutSection, 1, {"left":"0", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"left": "50%", ease: Power2.easeInOut, onComplete: function(){
      enableScroll();
      shownSection = $aboutSection;
    }}, 0);
}

function homeToServiceSectionTransition() {
  const animation = new TimelineMax();

  $servicesSection.css("display","block");
  animation.to($servicesSection, 1, {"left":"0", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"left": "-50%", ease: Power2.easeInOut, onComplete: function () {
      shownSection = $servicesSection;
    }}, 0);
}

function contactToHomeSectionTransition() {
  const animation = new TimelineMax();

  animation.to($contactSection, 1, {"top":"100%", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"top": "0", ease: Power2.easeInOut, onComplete: function(){
      $contactSection.css("display","none");
      shownSection = $homeSection;
    }}, 0);
}

function aboutToHomeSectionTransition() {
  const animation = new TimelineMax();

  disableScroll()
  animation.to($aboutSection, 1, {"left":"-100%", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"left":"0", ease: Power2.easeInOut, onComplete: function () {
      shownSection = $homeSection;
    }}, 0);
}

function servicesToHomeSectionTransition() {
  const animation = new TimelineMax();

  animation.to($servicesSection, 1, {"left":"100%", ease: Power2.easeInOut}, 0)
    .to($homeSection, 1, {"left":"0", ease: Power2.easeInOut, onComplete: function() {
      restoreServicesSection();
      shownSection = $homeSection;
    }}, 0);
}

function showService(event){
  const $selectedServiceDom = $(event.target);
  if (!$selectedServiceDom.hasClass("selected")) { //TODO: comprobación de que no haya animación ejecutandose
    const animation = new TimelineMax(),
      serviceIdSelected = $selectedServiceDom.attr('data-service-index');
      $getOutContainer = !shownService
        ? $("#services-section .header-section")
        : $(`#${shownService}.service-wrapper`),
      $getInContainer = $(`#${serviceIdSelected}`),
      $serviceList = $(".services-list"),
      $serviceItems = $(".service-item"),
      $backLink = $("#services-section .back-to-services-menu");

      removeSelectedServiceClass();
      $(event.target).addClass("selected");
      $backLink.css("display","block");
      $getInContainer.addClass('visible');
      $getInContainer.css("z-index", "3");
      $getOutContainer.css("z-index", "2");
      $serviceList.css("position","fixed");

      //animation.to($getOutContainer, .5, {scrollTop: 0, ease: Power2.easeIn}, 0)
      animation.to($getInContainer, 1, {"top":"0", ease: Power2.easeInOut}, 0);
      if (!shownService) {
        animation.to($serviceItems, 1, {"font-size":"1.6rem", "margin-bottom":"20px", ease: Power2.easeInOut}, 0)
        .to($backLink, 1, {opacity:1}, 0);
      }
      animation.to($getOutContainer, 1, {"top": "-50%", ease: Power2.easeInOut, onComplete: function () {
        if ($getOutContainer.hasClass("service-wrapper")) {
          $getOutContainer.removeClass("visible");
          $getOutContainer.css("top","100%");
        }
        shownService = serviceIdSelected;
        enableScroll();
      }}, 0);
  }
}

function leaveService() {
  if (true) { //TODO: comprobación de que no haya animación ejecutandose
    const animation1 = new TimelineMax();
      $getInContainer = $("#services-section .header-section"),
      $getOutContainer = $(`#${shownService}.service-wrapper`),
      $serviceItems = $(".service-item"),
      $backLink = $("#services-section .back-to-services-menu");
  
    disableScroll();
  
    animation1.to($getOutContainer, 1, {"top":"100%", ease: Power2.easeInOut}, 0)
      .to($serviceItems, 1, {"font-size":"4rem", ease: Power2.easeInOut}, 0)
      .to($serviceItems, 1, {"margin-bottom":"30px", ease: Power2.easeInOut}, 0)
      .to($backLink, .5, {"opacity":"0.001"}, 0)
      .to($getInContainer, 1, {"top": "0", ease: Power2.easeInOut, onComplete: function () {
        shownService = null;
        $getOutContainer.removeClass("visible");
        removeSelectedServiceClass();
        $backLink.css("display","none");
      }}, 0);
  }
}

function removeSelectedServiceClass() {
  $(".service-item.selected").removeClass("selected");
}
