/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'), 
      navToggle = document.getElementById('nav-toggle'), 
      navClose = document.getElementById('nav-close') 


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}


/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction)) 


/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')


function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})



/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) =>{
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})


/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper ('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    on: {
        reachEnd: function () {
          this.loop = false;
          this.slideNext(); // Manually trigger the next slide
          this.loop = true;
          this.autoplay.stop(); // Stop autoplay after one loop
        }
      },
      
    // Adding the autoplay option:
    autoplay: {
        delay: 3000, // Delay between slides in milliseconds (adjust as needed)
        disableOnInteraction: false, // Keep autoplay running even after user interaction
        loop: false, // Limit autoplay to one loop
    },
    // Adding the animation option: effects: 'flip','cube', 'fade','coverflow',''
    effect: 'slide', // Replace with your chosen animation
    speed: 800,
    easing: 'ease-in-out',
    watchSlidesProgress: true,
      
});


/*==================== TESTIMONIAL ====================*/
let swiperTestimonila = new Swiper ('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568:{
            slidesPerView: 2,
        }
    },

    // Pause and resume autoplay on hover
    on: {
        init: function () {
          // Using standard event listeners
          this.el.addEventListener('mouseenter', () => {
            this.autoplay.stop();
          });
          this.el.addEventListener('mouseleave', () => {
            this.autoplay.start();
          });

            // Touch events
            this.el.addEventListener('touchstart', () => {
            this.autoplay.stop();
            });
            this.el.addEventListener('touchend', () => {
            this.autoplay.start();
            });
        },
      },

    // Adding the autoplay option:
    autoplay: {
        delay: 3000, // Delay between slides in milliseconds (adjust as needed)
        disableOnInteraction: false, // Keep autoplay running even after user interaction
    },
    // Adding the animation option: effects: 'flip','cube', 'fade','coverflow',''
    effect: 'slide', // Replace with your chosen animation
    speed: 800,
    easing: 'ease-in-out',
    watchSlidesProgress: true,
});



/*==================== GET THE COLOR VALUE ====================*/
function getColor() {
    // Get the computed style of the document's root element
    var root = document.documentElement;
    var computedStyle = getComputedStyle(root);

    // Get the value of --text-color-light
    var textColorLight = computedStyle.getPropertyValue('--text-color-light').trim();
    var textColor = computedStyle.getPropertyValue('--text-color').trim();
    var firstColor = computedStyle.getPropertyValue('--first-color').trim();

    return textColorLight;
}



/*==================== SEND MESSAGE ====================*/
function sendMessage() {
    // Validate form fields
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    // Regular expression for validating an Email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    

    var messageAlert = document.querySelector('.message__alert');
    
    function displayMessage(text, color) {
        messageAlert.style.display = 'block';
        messageAlert.innerText = text;
        messageAlert.style.color = color || getColor();
    }

    // Display "Sending message..." while processing
    displayMessage("Sending message...");

    if (!name || !email || !subject || !message) {
        displayMessage("Fields can't be empty.", 'red');
    } else if (!emailRegex.test(email)) {
        displayMessage("Please enter a valid email address.", 'red');
    } else {
        // If all fields are filled, proceed to send the message
        var parms = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };

        // Assuming emailjs.send is an asynchronous function
        emailjs.send("service_8b3l8co", "template_dm27iq8", parms)
            .then(function () {
                displayMessage("Message sent successfully!", 'green');

                // Clear all input fields
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('subject').value = '';
                document.getElementById('message').value = '';

                // Hide success message after 8 seconds (adjust the time as needed)
                setTimeout(function () {
                    messageAlert.style.display = 'none';
                }, 3000);
            })
            .catch(function (error) {
                console.error("Error sending message:", error);
                alert("Failed to send message. Please try again later.");
            });
    }
}



  





/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp) 


/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
}) 