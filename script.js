document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');
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
        pages.forEach(page => page.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current page and dot
        pages[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentPageIndex = index;
    }
    
    // Improved navigation for swipe hints
    document.querySelectorAll('.swipe-hint').forEach(hint => {
        hint.style.cursor = 'pointer'; // Add cursor pointer to show it's clickable
        
        hint.addEventListener('click', function(e) {
            const leftArrow = this.querySelector('.fa-chevron-left');
            const rightArrow = this.querySelector('.fa-chevron-right');
            
            // If the hint element has both arrows or the click is directly on an arrow
            if (e.target.classList.contains('fa-chevron-left')) {
                // Navigate left if clicking left arrow
                setActivePage(currentPageIndex - 1);
            } else if (e.target.classList.contains('fa-chevron-right')) {
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
    const coverFooter = document.querySelector('.cover-footer');
    if (coverFooter) {
        coverFooter.style.cursor = 'pointer';
        coverFooter.addEventListener('click', function() {
            setActivePage(1); // Go to the second page (invitation)
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActivePage(index);
        });
    });
    
    // Touch events for swipe navigation
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
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
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') {
            setActivePage(currentPageIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            setActivePage(currentPageIndex - 1);
        }
    });
    
    // Add click areas on the edges of the screen
    const screenNavigationWidth = 50; // pixels from edge
    
    document.addEventListener('click', function(e) {
        // Don't trigger edge navigation if clicking on interactive elements
        if (e.target.closest('.nav-dots') || 
            e.target.closest('.music-player') || 
            e.target.closest('form') || 
            e.target.closest('.gallery-item') ||
            e.target.closest('.swipe-hint')) {
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
    
    // Countdown Timer
    const weddingDate = new Date('May 21, 2025 10:30:00').getTime();
    let countdownInterval; // Declare the variable first
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is over
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    // Initial call
    updateCountdown();
    // Update every second
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Background Music Control
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    let isMusicPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            backgroundMusic.play().catch(error => {
                console.error('Error playing audio:', error);
                alert('Vui lòng tương tác với trang web để phát nhạc.');
            });
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        
        isMusicPlaying = !isMusicPlaying;
    });
    
    // RSVP Form Submission
    const rsvpForm = document.getElementById('rsvp-form');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                fullname: document.getElementById('fullname').value,
                phone: document.getElementById('phone').value,
                attendance: document.getElementById('attendance').value,
                guests: document.getElementById('guests').value
            };
            
            // In a real application, you would send this data to a server
            console.log('RSVP Form Data:', formData);
            
            // Show confirmation
            alert('Cảm ơn bạn đã xác nhận tham dự!');
            
            // Reset form
            rsvpForm.reset();
        });
    }
    
    // Gallery image zoom effect
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
            
            if (this.classList.contains('zoomed')) {
                this.style.position = 'fixed';
                this.style.top = '50%';
                this.style.left = '50%';
                this.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.style.maxHeight = '90vh';
                this.style.maxWidth = '90vw';
                this.style.zIndex = '1001';
            } else {
                this.style.position = '';
                this.style.top = '';
                this.style.left = '';
                this.style.transform = '';
                this.style.maxHeight = '';
                this.style.maxWidth = '';
                this.style.zIndex = '';
            }
        });
    });
    
    // Close zoomed image when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.gallery-item')) {
            const zoomedImages = document.querySelectorAll('.zoomed');
            zoomedImages.forEach(img => {
                img.classList.remove('zoomed');
                img.style.position = '';
                img.style.top = '';
                img.style.left = '';
                img.style.transform = '';
                img.style.maxHeight = '';
                img.style.maxWidth = '';
                img.style.zIndex = '';
            });
        }
    });

    // Add animation to the swipe hints to make them more noticeable
    const animateSwipeHints = () => {
        // Animate right arrows
        document.querySelectorAll('.swipe-hint .fa-chevron-right').forEach(icon => {
            icon.style.transition = 'transform 0.7s ease-in-out';
            icon.style.display = 'inline-block';
            
            // Add pulsing animation
            setInterval(() => {
                icon.style.transform = 'translateX(5px)';
                setTimeout(() => {
                    icon.style.transform = 'translateX(0)';
                }, 350);
            }, 1400);
        });
        
        // Animate left arrows
        document.querySelectorAll('.swipe-hint .fa-chevron-left').forEach(icon => {
            icon.style.transition = 'transform 0.7s ease-in-out';
            icon.style.display = 'inline-block';
            
            // Add pulsing animation
            setInterval(() => {
                icon.style.transform = 'translateX(-5px)';
                setTimeout(() => {
                    icon.style.transform = 'translateX(0)';
                }, 350);
            }, 1400);
        });
    };
    
    animateSwipeHints();
});