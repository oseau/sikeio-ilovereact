"use strict";
window.onload = function() {
  animateLogo();
  animateRobot();
  updateSliderControl();
  addSmoothScrolling();
};

window.onscroll = function() {
  updateSliderControl();
};

function animateLogo() {
  TweenMax.fromTo(".react-logo", 2, {
    // from
    css: {
      y: "-100px"
    }
  }, {
    // to
    css: {
      y: "30px"
    },
    repeat: -1,
    yoyo: true,
    ease: Power2.easeInOut
  });
}

function animateRobot() {
  var t = new TimelineMax({
    yoyo: true,
    repeat: -1
  });
  t.to('#android-robot', 1, {
      rotation: "-40deg"
    })
    .to('#android-robot', 1, {
      rotation: "-50deg"
    });
}

function updateSliderControl() {
  // 获得所有的 slider 链接
  var links = document.querySelectorAll("#slider-control a");

  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var section = document.querySelector(link.attributes.getNamedItem('href')
      .nodeValue);
    var sectionTop = section.offsetTop;
    var sectionBottom = sectionTop + window.innerHeight;

    // 检查 window.scrollY 是否在这部分中
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      link.className = "active";
    } else {
      link.className = "";
    }
  }
}

function scrollToElement(element) {
  var topOfElement = element.offsetTop;
  TweenMax.to(window, 1, {
    scrollTo: {
      y: topOfElement
    },
    ease: Power2.easeInOut
  });
}

function addSmoothScrolling() {
  var links = document.querySelectorAll("#slider-control a");
  for (var i = 0; i < links.length; i++) {
    let link = links[i];
    link.addEventListener("click", function(event) {
      // BUG 警告！使用闭包或者 ES6 `let` 修复。
      event.preventDefault();
      let href = link.attributes.getNamedItem('href')
        .nodeValue;
      scrollToElement(document.querySelector(href));
    });
  }
}
