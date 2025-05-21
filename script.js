document.addEventListener("DOMContentLoaded", function () {
  // Page Navigation
  const pages = document.querySelectorAll(".page");
  const dots = document.querySelectorAll(".dot");
  let currentPageIndex = 0;

  // Swipe detection variables
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  // Initialize the active page
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

  // Improved navigation for swipe hints
  document.querySelectorAll(".swipe-hint").forEach((hint) => {
    hint.style.cursor = "pointer"; // Add cursor pointer to show it's clickable

    hint.addEventListener("click", function (e) {
      const leftArrow = this.querySelector(".fa-chevron-left");
      const rightArrow = this.querySelector(".fa-chevron-right");

      // If the hint element has both arrows or the click is directly on an arrow
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

  // Add click event to cover footer for better mobile experience
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

  // Add arrow keys and click navigation on the edges of the screen
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      setActivePage(currentPageIndex + 1);
    } else if (e.key === "ArrowLeft") {
      setActivePage(currentPageIndex - 1);
    }
  });

  // Add click areas on the edges of the screen
  const screenNavigationWidth = 50; // pixels from edge

  document.addEventListener("click", function (e) {
    // Don't trigger edge navigation if clicking on interactive elements
    if (
      e.target.closest(".nav-dots") ||
      e.target.closest(".music-player") ||
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

  // Countdown Timer with animation
  // Get the wedding date from the HTML element
  const dateElement = document.querySelector(".date");
  let weddingDate;

  if (dateElement) {
    // Parse the date from the format "DD.MM.YYYY"
    const dateParts = dateElement.textContent.split(".");
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
      const year = parseInt(dateParts[2], 10);

      // Create the date object with time set to 10:30 AM
      weddingDate = new Date(year, month, day, 10, 30, 0).getTime();
    } else {
      // Fallback if the date format is unexpected
      weddingDate = new Date("July 13, 2025 10:30:00").getTime();
    }
  } else {
    // Fallback if the element is not found
    weddingDate = new Date("July 13, 2025 10:30:00").getTime();
  }

  let countdownInterval;

  // Store previous values to know when to animate
  let prevDays = -1;
  let prevHours = -1;
  let prevMinutes = -1;
  let prevSeconds = -1;

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

  // Initial call
  updateCountdown();
  // Update every second
  countdownInterval = setInterval(updateCountdown, 1000);

  // Background Music Control
  const musicToggle = document.getElementById("music-toggle");
  const backgroundMusic = document.getElementById("background-music");

  let isMusicPlaying = false;

  musicToggle.addEventListener("click", function () {
    if (isMusicPlaying) {
      backgroundMusic.pause();
      musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      backgroundMusic.play().catch((error) => {
        console.error("Error playing audio:", error);
        alert("Vui lòng tương tác với trang web để phát nhạc.");
      });
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }

    isMusicPlaying = !isMusicPlaying;
  });

  // RSVP Form handling
  const rsvpForm = document.getElementById("rsvp-form");

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form data
      const formData = {
        attendance: document.querySelector('input[name="attendance"]:checked')
          ?.value,
        guestName: document.getElementById("guest-name").value,
        guestOf: document.querySelector('input[name="guest-of"]:checked')
          ?.value,
        guestCount: document.getElementById("guest-count").value,
        wishes: document.getElementById("wishes").value,
      };

      // Validate form
      if (!formData.attendance) {
        alert("Vui lòng chọn bạn có tham dự không.");
        return;
      }

      if (!formData.guestName) {
        alert("Vui lòng nhập tên của bạn.");
        return;
      }

      if (!formData.guestOf) {
        alert("Vui lòng chọn bạn là khách của ai.");
        return;
      }

      if (!formData.guestCount || formData.guestCount < 1) {
        alert("Vui lòng nhập số khách hợp lệ.");
        return;
      }

      // Here you would typically send the data to a server
      // For now, we'll just log it and show a thank you message
      console.log("RSVP Form Data:", formData);

      // Show thank you message
      const formContainer = rsvpForm.parentElement;
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
    });
  }

  // Number input constraints
  const guestCountInput = document.getElementById("guest-count");
  if (guestCountInput) {
    guestCountInput.addEventListener("input", function () {
      if (this.value < 1) {
        this.value = 1;
      }
    });
  }

  // Gallery image zoom effect
  const galleryImages = document.querySelectorAll(".gallery-item img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      this.classList.toggle("zoomed");

      if (this.classList.contains("zoomed")) {
        this.style.position = "fixed";
        this.style.top = "50%";
        this.style.left = "50%";
        this.style.transform = "translate(-50%, -50%) scale(1.5)";
        this.style.maxHeight = "90vh";
        this.style.maxWidth = "90vw";
        this.style.zIndex = "1001";
      } else {
        this.style.position = "";
        this.style.top = "";
        this.style.left = "";
        this.style.transform = "";
        this.style.maxHeight = "";
        this.style.maxWidth = "";
        this.style.zIndex = "";
      }
    });
  });

  // Close zoomed image when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".gallery-item")) {
      const zoomedImages = document.querySelectorAll(".zoomed");
      zoomedImages.forEach((img) => {
        img.classList.remove("zoomed");
        img.style.position = "";
        img.style.top = "";
        img.style.left = "";
        img.style.transform = "";
        img.style.maxHeight = "";
        img.style.maxWidth = "";
        img.style.zIndex = "";
      });
    }
  });

  // Add animation to the swipe hints to make them more noticeable
  const animateSwipeHints = () => {
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
  };

  animateSwipeHints();

  // Add stars twinkling animation
  function createStars() {
    const starsContainer = document.querySelector(".stars");
    if (!starsContainer) return;

    // Clean any existing stars
    starsContainer.innerHTML = "";

    // Create 30 random stars
    for (let i = 0; i < 30; i++) {
      const star = document.createElement("div");
      star.classList.add("twinkle-star");

      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      // Random size
      const size = 1 + Math.random() * 3;

      // Random animation delay
      const delay = Math.random() * 5;

      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;

      starsContainer.appendChild(star);
    }
  }

  createStars();
});
