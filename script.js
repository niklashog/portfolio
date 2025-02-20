// START Navbar with conditional autohide

let throttling = false;
let scrollHandlingPaused = false; // Flagga för att pausa auto-hide av navbar

function onScrollThrottled() {
  if (!throttling && !scrollHandlingPaused) { // Kolla flaggan innan scroll-hantering
    throttling = true;
    requestAnimationFrame(() => {
      onScroll();
      throttling = false;
    });
  }
}

let lastScrollPosition = 0;
const navbar = document.getElementById("navbar");

function onScroll() {
  if (scrollHandlingPaused) return; // Aktiv flagga = stoppad autohide

  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (currentScrollPosition <= 0) {
    navbar.style.top = "0";
    navbar.style.opacity = "1";
  } else {
    if (currentScrollPosition > lastScrollPosition) {
      navbar.style.top = "-100px";
      navbar.style.opacity = "0";
    } else {
      navbar.style.top = "0";
      navbar.style.opacity = "1";
    }
  }

  lastScrollPosition = currentScrollPosition;
}

// Vid klick i navbar, pausa att den döljs vid scroll
document.querySelectorAll("#navbar a, .hero-bottom a").forEach(link => {
  link.addEventListener("click", () => {
    scrollHandlingPaused = true;
    navbar.style.top = "0"; // Säkerställ att navbaren visas igen

    setTimeout(() => {
      scrollHandlingPaused = false; // Återaktivera auto-hide
    }, 1000); // Tid som auto-hide är inaktiverad
  });
});

window.addEventListener("scroll", onScrollThrottled, { passive: true });

// END Navbar with conditional autohide


// START Ramlande kort i hero
document.addEventListener("DOMContentLoaded", () => {
  const spans = document.querySelectorAll(".hero-cards-container span");
  spans.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.12}s`;
  });
});

// END Ramlande kort i hero


// START of Weather

window.onload = () => {
  const url = 'http://api.openweathermap.org/data/2.5/weather?id=524901&lat=62.632922&lon=17.799248&units=metric&lang=sv&appid=8442f21f549f1ef24a8124568a2536af'

  https: fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Anslutningen avbröts");
      }
      return response.json();
    })
    .then((data) => {
      const temperature = data.main.temp;
      const location = data.name;
      document.querySelector(
        "#weatherInfo"
      ).innerHTML = `Temperaturen i ${location} är ${temperature}°C.`;
    })
    .catch((error) => {
      console.error("Det gick inte att hämta väderdata:", error);
    });
}

// END of Weather