(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });
})(jQuery);

var form = document.getElementById("email-form");

async function handleSubmit(event) {
  event.preventDefault();

  var status = document.getElementById("my-form-status");
  var date = document.getElementById("date").value;
  var name = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;
  var email = document.getElementById("email").value;
  var peoples = document.getElementById("peoples").value;
  var place = document.getElementById("place").value;
  var destination = document.getElementById("destination").value;
  var dt = date.split("T");
  var d = dt[0].split("-");
  var datetime = `${d[2]}/${d[1]}/${d[0]} at ${dt[1]}`;
  var message = `Hi I am ${name} and looking for a car from ${place} to ${destination} on ${datetime} with ${peoples} peeople, Please call me on ${mobile}, My email id is ${email}`;

  console.log(message);
  axios({
    url: "https://formspree.io/f/meqbzzkr",
    method: "post",
    headers: {
      Accept: "application/json",
    },
    data: {
      email,
      message,
    },
  }).then((response) => {
    if (response.status == 200) {
      status.innerHTML =
        "We have recieved your request and get Back to you soon! ";
      form.reset();
    } else {
      status.innerHTML = "Oops! There was a problem submitting your form";
    }
  });

  setInterval(() => {
    status.innerHTML = "";
  }, 5000);
}
form.addEventListener("submit", handleSubmit);
