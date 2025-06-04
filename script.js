// ========================================================================
// WEDDING INVITATION SCRIPT
// ========================================================================

document.addEventListener("DOMContentLoaded", function () {
  const pageLoad = function () {
    const coverCoupleImage =
      "https://placehold.co/400x400/f7f1e6/d4bc95?text=QT+%26+NN";
    const timelineImage1 =
      "https://placehold.co/400x400/f7f1e6/d4bc95?text=timeline-1";
    const timelineImage2 =
      "https://placehold.co/400x400/f7f1e6/d4bc95?text=timeline-2";
    const timelineImage3 =
      "https://placehold.co/400x400/f7f1e6/d4bc95?text=timeline-3";
    const timelineImage4 =
      "https://placehold.co/400x400/f7f1e6/d4bc95?text=timeline-4";
    const slideshowImage1 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-1";
    const slideshowImage2 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-2";
    const slideshowImage3 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-3";
    const slideshowImage4 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-4";
    const slideshowImage5 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-5";
    const slideshowImage6 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-6";
    const slideshowImage7 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-7";
    const slideshowImage8 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-8";
    const slideshowImage9 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-9";
    const slideshowImage10 =
      "https://placehold.co/1200x800/f7f1e6/d4bc95?text=slideshow-10";
    const qrImage = "https://placehold.co/400x400/f7f1e6/d4bc95?text=QR+Code";

    document.getElementById("cover-couple-image").src = coverCoupleImage;
    document.getElementById("timeline-image-1").src = timelineImage1;
    document.getElementById("timeline-image-2").src = timelineImage2;
    document.getElementById("timeline-image-3").src = timelineImage3;
    document.getElementById("timeline-image-4").src = timelineImage4;
    document.getElementById("slide-image-1").src = slideshowImage1;
    document.getElementById("slide-image-2").src = slideshowImage2;
    document.getElementById("slide-image-3").src = slideshowImage3;
    document.getElementById("slide-image-4").src = slideshowImage4;
    document.getElementById("slide-image-5").src = slideshowImage5;
    document.getElementById("slide-image-6").src = slideshowImage6;
    document.getElementById("slide-image-7").src = slideshowImage7;
    document.getElementById("slide-image-8").src = slideshowImage8;
    document.getElementById("slide-image-9").src = slideshowImage9;
    document.getElementById("slide-image-10").src = slideshowImage10;
    document.getElementById("gift-qr-image").src = qrImage;
  };

  pageLoad();

  // ========================================================================
  // 1. NAVIGATION FUNCTIONALITY
  // ========================================================================
  const navigationManager = (function () {
    // Page navigation variables
    const pages = document.querySelectorAll(".page");
    const dots = document.querySelectorAll(".dot");
    let currentPageIndex = 0;

    // Swipe detection variables
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    function setActivePage(index) {
      // Loop back to first or last page if index is out of bounds
      if (index < 0) index = pages.length - 1;
      if (index >= pages.length) index = 0;

      // Remove active class from all pages and dots
      pages.forEach((page) => page.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      // Add active class to current page and dot
      pages[index].classList.add("active");
      dots[index].classList.add("active");

      currentPageIndex = index;
    }

    function handleSwipe() {
      const distance = touchEndX - touchStartX;

      if (Math.abs(distance) >= minSwipeDistance) {
        if (distance < 0) {
          // Swipe left (next page)
          setActivePage(currentPageIndex + 1);
        } else {
          // Swipe right (previous page)
          setActivePage(currentPageIndex - 1);
        }
      }
    }

    function init() {
      // Swipe hints
      document.querySelectorAll(".swipe-hint").forEach((hint) => {
        hint.style.cursor = "pointer";

        hint.addEventListener("click", function (e) {
          const leftArrow = this.querySelector(".fa-chevron-left");
          const rightArrow = this.querySelector(".fa-chevron-right");

          // Handle click swipe hint
          if (e.target.classList.contains("fa-chevron-left")) {
            // Navigate left if clicking left arrow
            setActivePage(currentPageIndex - 1);
          } else if (e.target.classList.contains("fa-chevron-right")) {
            // Navigate right if clicking right arrow
            setActivePage(currentPageIndex + 1);
          } else if (leftArrow && rightArrow) {
            // If hint has both arrows, navigate based on which half of the element was clicked
            const hintRect = hint.getBoundingClientRect();
            const clickX = e.clientX;
            const hintCenterX = hintRect.left + hintRect.width / 2;

            if (clickX < hintCenterX) {
              // Click on left half
              setActivePage(currentPageIndex - 1);
            } else {
              // Click on right half
              setActivePage(currentPageIndex + 1);
            }
          } else if (leftArrow) {
            // Only left arrow, navigate left
            setActivePage(currentPageIndex - 1);
          } else if (rightArrow) {
            // Only right arrow, navigate right
            setActivePage(currentPageIndex + 1);
          } else {
            // If no arrows (like first page), navigate forward
            setActivePage(currentPageIndex + 1);
          }
        });
      });

      // Cover footer click
      const coverFooter = document.querySelector(".cover-footer");
      if (coverFooter) {
        coverFooter.style.cursor = "pointer";
        coverFooter.addEventListener("click", function () {
          setActivePage(1); // Go to the second page (invitation)
        });
      }

      // Dot navigation
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          setActivePage(index);
        });
      });

      // Touch events for swipe navigation
      document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          setActivePage(currentPageIndex + 1);
        } else if (e.key === "ArrowLeft") {
          setActivePage(currentPageIndex - 1);
        }
      });

      // Edge click navigation
      const screenNavigationWidth = 50; // pixels from edge
      document.addEventListener("click", function (e) {
        // Don't trigger edge navigation if clicking on interactive elements
        if (
          e.target.closest(".nav-dots") ||
          e.target.closest(".music-player") ||
          e.target.closest(".fa-music") ||
          e.target.closest(".fa-pause") ||
          e.target.closest("form") ||
          e.target.closest(".gallery-item") ||
          e.target.closest(".swipe-hint")
        ) {
          return;
        }

        const screenWidth = window.innerWidth;

        // Click on right edge - go to next page
        if (e.clientX > screenWidth - screenNavigationWidth) {
          setActivePage(currentPageIndex + 1);
        }
        // Click on left edge - go to previous page
        else if (e.clientX < screenNavigationWidth) {
          setActivePage(currentPageIndex - 1);
        }
      });
    }

    // Return public methods and properties
    return {
      init: init,
      setActivePage: setActivePage,
    };
  })();

  // Initialize navigation
  navigationManager.init();

  // ========================================================================
  // 2. COUNTDOWN TIMER
  // ========================================================================
  const countdownManager = (function () {
    // Get the wedding date from the HTML element
    const dateElement = document.querySelector(".date");
    let weddingDate;

    // Intervals and states
    let countdownInterval;
    let prevDays = -1;
    let prevHours = -1;
    let prevMinutes = -1;
    let prevSeconds = -1;

    // Parse date from DOM or set default
    function parseWeddingDate() {
      if (dateElement) {
        // Parse the date from the format "DD.MM.YYYY"
        const dateParts = dateElement.textContent.split(" ");
        if (dateParts.length === 4) {
          const day = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[2].replace(/\.$/, ""), 10) - 1; // Months are 0-indexed in JavaScript
          const year = parseInt(dateParts[3], 10);

          // Create the date object with time set to 10:30 AM
          return new Date(year, month, day, 11, 0, 0).getTime();
        }
      }

      // Fallback
      return new Date("July 13, 2025 10:30:00").getTime();
    }

    // Update the countdown display
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Get the elements
      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minutesEl = document.getElementById("minutes");
      const secondsEl = document.getElementById("seconds");

      // Update and animate only if values have changed
      if (days !== prevDays) {
        animateNumber(daysEl, days);
        prevDays = days;
      }

      if (hours !== prevHours) {
        animateNumber(hoursEl, hours);
        prevHours = hours;
      }

      if (minutes !== prevMinutes) {
        animateNumber(minutesEl, minutes);
        prevMinutes = minutes;
      }

      if (seconds !== prevSeconds) {
        animateNumber(secondsEl, seconds);
        prevSeconds = seconds;
      }

      // If the countdown is over
      if (distance < 0) {
        clearInterval(countdownInterval);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
      }
    }

    // Animate the number change with CSS
    function animateNumber(element, value) {
      // Add animation class
      element.classList.add("animate");

      // Update the value
      setTimeout(() => {
        element.textContent = value.toString().padStart(2, "0");
      }, 250);

      // Remove animation class after animation completes
      setTimeout(() => {
        element.classList.remove("animate");
      }, 600);
    }

    function init() {
      weddingDate = parseWeddingDate();
      updateCountdown(); // Initial call
      countdownInterval = setInterval(updateCountdown, 1000); // Update every second
    }

    return {
      init: init,
    };
  })();

  // Initialize countdown
  countdownManager.init();

  // ========================================================================
  // 3. MUSIC PLAYER CONTROLS
  // ========================================================================
  const musicPlayer = (function () {
    const musicToggle = document.getElementById("music-toggle");
    const backgroundMusic = document.getElementById("background-music");
    let isMusicPlaying = false;

    function init() {
      musicToggle.addEventListener("click", function () {
        if (isMusicPlaying) {
          backgroundMusic.pause();
          musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
          backgroundMusic.play();
          musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }

        isMusicPlaying = !isMusicPlaying;
      });
    }

    return {
      init: init,
    };
  })();

  // Initialize music player
  musicPlayer.init();

  // ========================================================================
  // 4. RSVP FORM HANDLING
  // ========================================================================
  const rsvpManager = (function () {
    const form = document.getElementById("rsvp-form");

    async function submitForm(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const data = {
        guestName: formData.get("guest-name"),
        attendance: formData.get("attendance"),
        guestOf: formData.get("guest-of"),
        guestCount: formData.get("guest-count"),
        wishes: formData.get("wishes"),
      };

      // Validate form
      if (!data.attendance) {
        alert("Vui lòng chọn bạn có tham dự không.");
        return;
      }

      if (!data.guestName) {
        alert("Vui lòng nhập tên của bạn.");
        return;
      }

      if (!data.guestOf) {
        alert("Vui lòng chọn bạn là khách của ai.");
        return;
      }

      if (!data.guestCount || data.guestCount < 1) {
        alert("Vui lòng nhập số khách hợp lệ.");
        return;
      }
      const queryParams = new URLSearchParams(data).toString();
      fetch(
        "https://script.google.com/macros/s/AKfycbzuJy4zw8Mighk6mUZwdPuJcfcIKNaIvu3EHXlAQIqonj1QNroUVWAglli5S7o-DHkFyg/exec" +
          "?" +
          queryParams
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.result === "success") {
            // Show thank you message
            const formContainer = form.parentElement;
            formContainer.innerHTML = `
                <div class="thank-you-message">
                    <i class="fas fa-check-circle success-icon"></i>
                    <h3>Cảm ơn bạn đã xác nhận!</h3>
                    <p>Chúng mình đã nhận được thông tin của bạn và rất mong được gặp bạn trong ngày trọng đại.</p>
                    ${
                      formData.attendance === "yes"
                        ? "<p>Hẹn gặp bạn vào ngày cưới!</p>"
                        : "<p>Rất tiếc khi bạn không thể tham dự. Cảm ơn bạn đã thông báo cho chúng mình.</p>"
                    }
                </div>
            `;

            // Reset form
            form.reset();
          } else {
            console.error("Gửi thất bại: " + result.error);
          }
        })
        .catch((error) => {
          console.error("Lỗi gửi form: " + error.message);
        });
    }

    function init() {
      form.addEventListener("submit", submitForm);
    }

    return {
      init: init,
    };
  })();

  // Initialize RSVP form
  rsvpManager.init();

  // ========================================================================
  // 5. ANIMATIONS AND VISUAL EFFECTS
  // ========================================================================
  const animationManager = (function () {
    // Animate swipe hints with pulsing effect
    function animateSwipeHints() {
      // Animate right arrows
      document
        .querySelectorAll(".swipe-hint .fa-chevron-right")
        .forEach((icon) => {
          icon.style.transition = "transform 0.7s ease-in-out";
          icon.style.display = "inline-block";

          // Add pulsing animation
          setInterval(() => {
            icon.style.transform = "translateX(5px)";
            setTimeout(() => {
              icon.style.transform = "translateX(0)";
            }, 350);
          }, 1400);
        });

      // Animate left arrows
      document
        .querySelectorAll(".swipe-hint .fa-chevron-left")
        .forEach((icon) => {
          icon.style.transition = "transform 0.7s ease-in-out";
          icon.style.display = "inline-block";

          // Add pulsing animation
          setInterval(() => {
            icon.style.transform = "translateX(-5px)";
            setTimeout(() => {
              icon.style.transform = "translateX(0)";
            }, 350);
          }, 1400);
        });
    }

    function init() {
      animateSwipeHints();
    }

    return {
      init: init,
    };
  })();

  // Initialize animations
  animationManager.init();

  // ========================================================================
  // 6. GALLERY SLIDESHOW
  // ========================================================================
  const gallerySlideshow = (function () {
    // Private variables scoped to the slideshow
    let currentSlide = 1;
    let direction = "right";
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 5000;

    let progressBar = null;
    let progressBarAnimation = null;

    // Initialize slideshow
    function initSlideshow() {
      showSlide(currentSlide);
      setupControls();
      startAutoplay();
    }

    // Setup control events
    function setupControls() {
      // Setup slidehow container interactions
      const container = document.querySelector(".slideshow-container");
      if (container) {
        // Setup touch swipe
        let touchStart = 0;
        container.addEventListener(
          "touchstart",
          (e) => {
            touchStart = e.changedTouches[0].screenX;
            stopAutoplay();
            e.stopPropagation();
          },
          { passive: false }
        );

        container.addEventListener(
          "touchend",
          (e) => {
            const touchEnd = e.changedTouches[0].screenX;
            const swipeDistance = Math.abs(touchEnd - touchStart);

            if (swipeDistance > 30) {
              if (touchEnd < touchStart) {
                navigateSlide(1);
              } else {
                navigateSlide(-1);
              }
            }

            startAutoplay();
            e.stopPropagation();
          },
          { passive: false }
        );

        container.addEventListener(
          "touchmove",
          (e) => {
            e.stopPropagation();
          },
          { passive: false }
        );
      }
    }

    // Navigate to next/prev slide
    function navigateSlide(offset) {
      stopAutoplay();
      direction = offset > 0 ? "left" : "right";
      currentSlide += offset;
      showSlide(currentSlide);
      startAutoplay();
    }

    // Show the current slide
    function showSlide(n) {
      const slides = document.getElementsByClassName("slide");
      if (!slides.length) return;

      // Handle wraparound
      if (n > slides.length) currentSlide = 1;
      if (n < 1) currentSlide = slides.length;

      // Hide all slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "slide-left", "slide-right");
      }

      // Show current slide with animation
      slides[currentSlide - 1].classList.add("active", "slide-" + direction);

      updateProgressBar();
    }

    // Start autoplay
    function startAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }

      updateProgressBar();

      autoplayTimer = setInterval(() => {
        direction = "left";
        currentSlide++;
        showSlide(currentSlide);
      }, AUTOPLAY_DELAY);
    }

    // Stop autoplay
    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function createProgressBar() {
      let progressContainer = document.querySelector(".slideshow-progress");
      if (!progressContainer) {
        progressContainer = document.createElement("div");
        progressContainer.className = "slideshow-progress";

        progressBar = document.createElement("div");
        progressBar.className = "progress-bar";

        progressContainer.appendChild(progressBar);
        const container = document.querySelector(".slideshow-container");
        if (container) {
          container.appendChild(progressContainer);
        }
      } else {
        progressBar = progressContainer.querySelector(".progress-bar");
      }
    }

    function updateProgressBar() {
      if (!progressBar) createProgressBar();

      if (progressBarAnimation) {
        progressBar.style.animation = "none";
        progressBar.offsetHeight; // Trigger reflow
      }

      progressBar.style.animation = `progressBar ${AUTOPLAY_DELAY}ms linear`;
      progressBarAnimation = true;
    }

    // Public API
    return {
      init: function () {
        // Initialize if gallery is already active
        if (document.querySelector("#gallery.active")) {
          initSlideshow();
        }

        // Watch for page changes using MutationObserver
        const observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "class"
            ) {
              const gallery = document.querySelector("#gallery");

              if (gallery && gallery.classList.contains("active")) {
                initSlideshow();
                startAutoplay();
              } else if (gallery && !gallery.classList.contains("active")) {
                stopAutoplay();
              }
            }
          });
        });

        // Observe all sections for class changes
        document.querySelectorAll("section").forEach((section) => {
          observer.observe(section, { attributes: true });
        });

        // Handle visibility change to pause/resume autoplay
        document.addEventListener("visibilitychange", function () {
          if (document.hidden) {
            stopAutoplay();
          } else if (
            !document.hidden &&
            document.querySelector("#gallery.active")
          ) {
            startAutoplay();
          }
        });
      },
      navigateSlide: navigateSlide,
    };
  })();

  // Initialize the gallery slideshow
  gallerySlideshow.init();

  // Expose navigation function for button clicks
  window.plusSlides = function (offset) {
    gallerySlideshow.navigateSlide(offset);
  };
});
