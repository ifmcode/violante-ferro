

$('document').ready(function () {
  bindEvents();
});

function bindEvents() {
  $("#home-page .link-to-contact-page").click(homeToContactPageTransition);
  $("#home-page .link-to-about-page").click(homeToAboutPageTransition);
  $("#contact-page .link-to-home-page").click(contactToHomePageTransition);
  $("#about-page .link-to-home-page").click(aboutToHomePageTransition);
}

function homeToContactPageTransition() {
  const contactPage = $("#contact-page");
  const animation = new TimelineMax();
  animation.to(contactPage, 0, {"top":"0", ease: Power2.easeInOut});
}

function contactToHomePageTransition() {
  const contactPage = $("#contact-page");
  const animation = new TimelineMax();
  animation.to(contactPage, 0, {"top":"100%", ease: Power2.easeInOut});
}

function homeToAboutPageTransition() {
  const contactPage = $("#about-page");
  const animation = new TimelineMax();
  animation.to(contactPage, 0, {"left":"0", ease: Power2.easeInOut});
}

function aboutToHomePageTransition() {
  const contactPage = $("#about-page");
  const animation = new TimelineMax();
  animation.to(contactPage, 0, {"left":"-100%", ease: Power2.easeInOut});
}

