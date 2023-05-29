// check the first radio button always
window.onload=check;
function check() {
  const radioButtonIndexs1 = document.querySelectorAll("[data-radio-button]")
  radioButtonIndexs1[0].checked = true
}

// does a smooth scrolling whenever a link is clicked
$(document).ready(function() {
  $("a").click(function(event) {
    if ($(this).attr('href') === undefined) // most likely modal or navigation
      return;
    if ($(this).attr('href').startsWith('https')) {
      return;
    } else if ($(this).attr('href').startsWith('#modal')) {
      return;
    } else if ($(this).attr('href').startsWith('#void')){
      return;
    } else {
      event.preventDefault();
      var offsetPercent = 0.1; // set the offset percentage
      var offset = $(window).height() * offsetPercent; // calculate the offset in pixels
      $("html, body").animate({
          scrollTop: $($(this).attr("href")).offset().top - offset
        }, 800);
    }
  });
});

function navigationBarClick() {
  var x = document.getElementById("navigation-links");
  var topBackground = document.getElementById("top-section");
  if (x.className === "nav-links") { // 1ο κλικ στο responsive κουμπι, εμφανιση μενου
    x.className += " responsive";
    document.body.style.overflow = "hidden";
  } else { // 2ο κλικ στο responsive κουμπι, αποκρυψη
    x.className = "nav-links";
    document.body.style.overflow = "auto";
  }
}

var navigation = document.getElementById("navigation-links");
navigation.addEventListener("click", function(event) {
  navigation.className = "nav-links"
  document.body.style.overflow = "auto";
});
  


function disableNavigationBar() {
  var x = document.getElementById("navigation-links");
  if (x.className === "nav-links responsive") {
    x.className = "nav-links";
    document.body.style.overflow = "auto";

  }
}
var isGreaterThan800 = window.innerWidth;
if (isGreaterThan800 > 800)
  disableNavigationBar();


// Make everything visible with a transition
const elements = document.querySelectorAll('.fade-in, .slide-in');

function fadeInAndSlideIn(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}

let rootMargin = '10px'; // Default rootMargin value
let threshold = 0.65; // Default threshold value

if (window.innerWidth > 800) {
  threshold = 0.65; // Adjusted threshold value for the fade-in animation
} else if (window.innerWidth > 550) {
  threshold = 0.75; // Adjusted threshold value for the fade-in animation
} else if (window.innerWidth > 350) {
  threshold = 0.9; // Adjusted threshold value for the fade-in animation
}

const observer = new IntersectionObserver(fadeInAndSlideIn, {
  rootMargin: rootMargin,
  threshold: threshold
});

elements.forEach(element => {
  observer.observe(element);
});



// Check visibility of containers and trigger animations on page load
function checkVisibility() {
  for (let container of containers) {
    const containerTop = container.getBoundingClientRect().top;
    const containerBottom = container.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    if (containerTop < windowHeight - 350 && containerBottom >= 0) {
      container.style.opacity = 1;
      observer.observe(container); // Trigger animation immediately on page load
    }
  }
}

const containers = document.querySelectorAll('.container');
window.addEventListener('DOMContentLoaded', checkVisibility);
window.addEventListener('scroll', checkVisibility);






// Get all container elements and the scrolling container
const containerElements = document.querySelectorAll('.container');
const scrollContainer = document.getElementById('project-container');

// Set initial active project to 1 and isAnimating to false
let activeProject = 1;
let isAnimating = false;

// Check if the browser is Firefox
const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;

// Use different scrolling behavior based on the browser
if (isFirefox) {
  // Store the scroll position
  let scrollPosition = 0;

  // Add event listener for scrolling using the mouse wheel
  scrollContainer.addEventListener('wheel', (event) => {
    event.preventDefault();

    // Return early if animation is currently in progress
    if (isAnimating) {
      return;
    }

    // Get the width of a container element and the container width
    const containerWidth = containerElements[0].offsetWidth;
    const containerScrollWidth = scrollContainer.scrollWidth;

    // Get the direction of the scroll
    const delta = event.deltaY || event.detail;
    const direction = delta > 0 ? 1 : -1;

    // Update the active project based on the scroll direction
    if (direction === 1) {
      if (activeProject < 3) {
        activeProject++;
      } else if (activeProject === 3) { // scroll down
        window.scrollBy({
          top: 200,
          left: 0,
          behavior: 'smooth'
        });
        return;
      }
    } else {
      if (activeProject > 1) {
        activeProject--;
      } else if (activeProject === 1) {
        window.scrollBy({
          top: -200,
          left: 0,
          behavior: 'smooth'
        });
        return;
      }
    }

    // Calculate the new scroll position based on the active project and container width
    scrollPosition = (activeProject - 1) * containerWidth;
    scrollPosition = Math.min(scrollPosition, containerScrollWidth - scrollContainer.offsetWidth);

    // Scroll the container to the new position using a smooth animation
    isAnimating = true;
    smoothScrollTo(scrollContainer, scrollPosition, 600, () => {
      isAnimating = false;
    });

    // Log the active project for debugging purposes
  });

  // Helper function for smooth scrolling to a target scroll position
  function smoothScrollTo(element, targetScrollPosition, duration, callback) {
    const start = element.scrollLeft;
    const change = targetScrollPosition - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = function() {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      } else {
        callback();
      }
    };

    animateScroll();
  }

  // Easing function for smooth scrolling
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
} else {
  // Add event listener for scrolling using the mouse wheel
  scrollContainer.addEventListener('wheel', (event) => {
    event.preventDefault();

    // Return early if animation is currently in progress
    if (isAnimating) {
      return;
    }
    // Get the width of a container element, the current scroll position, and the direction of the scroll
    const containerWidth = containerElements[0].offsetWidth;
    const scrollPosition = scrollContainer.scrollLeft;
    const delta = event.deltaY;

    if (delta === -0 || delta === 0)
      return;
    // If scrolling down, and activeProject is less than 3
    if (delta > 0) {
      if (activeProject < 3) {
        // Increment activeProject and set isAnimating to true
        activeProject++;
        isAnimating = true;
        
        // Scroll the container to the next project using a smooth animation
        const targetScrollPosition = scrollPosition + containerWidth;
        scrollContainer.scrollTo({
          left: targetScrollPosition,
          behavior: 'smooth'
        });
        
        // Set isAnimating back to false after 600ms to allow for next animation
        setTimeout(() => {
          isAnimating = false;
        }, 600);
      } else {
        // If activeProject is already 3, scroll down the page
        window.scrollBy({
          top: 200,
          left: 0,
          behavior: 'smooth'
        });
      }
    } else { // If scrolling up
      if (activeProject > 1) {
        // Decrement activeProject and set isAnimating to true
        activeProject--;
        isAnimating = true;
        
        // Scroll the container to the previous project using a smooth animation
        const targetScrollPosition = scrollPosition - containerWidth;
        scrollContainer.scrollTo({
          left: targetScrollPosition,
          behavior: 'smooth'
        });
        
        // Set isAnimating back to false after 600ms to allow for next animation
        setTimeout(() => {
          isAnimating = false;
        }, 600);
      } else {
        // If activeProject is already 1, scroll up the page
        window.scrollBy({
          top: -200,
          left: 0,
          behavior: 'smooth'
        });
      }
    }

  });
}



// Add event listener for scrolling of the container
scrollContainer.addEventListener('scroll', () => {
  // Return early if animation is currently in progress
  if (isAnimating) {
    return;
  }
  
  // Get the width of a container element and the current scroll position
  const containerWidth = containerElements[0].offsetWidth;
  const scrollPosition = scrollContainer.scrollLeft;

  // Determine which project is currently active based on scroll position
  if (scrollPosition < containerWidth / 2) {
    if (activeProject !== 1) {
      activeProject = 1;
    }
  } else if (scrollPosition < containerWidth * 1.5) {
    if (activeProject !== 2) {
      activeProject = 2;
    }
  } else {
    if (activeProject !== 3) {
      activeProject = 3;
    }
  }
});













// take every button with the tag "cata-carousel-button"
const buttons = document.querySelectorAll("[data-carousel-button]")

// for each one of them add event listener
// click event listener = when any button of the array gets clicked
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // if the button that is clicked has the value next or not
    // depends value to the offset variable
    let offset
    if (button.dataset.carouselButton === "next1" ||
    button.dataset.carouselButton === "next2" ||
    button.dataset.carouselButton === "next3")
      offset = 1
    else
      offset = -1

      let slides
      let project // gets which project is pressed to check the radio button later
    if (button.dataset.carouselButton === "next1" || button.dataset.carouselButton === "prev1") {
      // the closest object with the tag "data-carousel"
      // from the parent select the son with the tag "data-slides"
      slides = button.closest("[data-carousel1]").querySelector("[data-slides1]")
      project = 1
    }
    else if (button.dataset.carouselButton === "next2" || button.dataset.carouselButton === "prev2") {
      slides = button.closest("[data-carousel2]").querySelector("[data-slides2]")
      project = 2
    }
    else if (button.dataset.carouselButton === "next3" || button.dataset.carouselButton === "prev3") {
      slides = button.closest("[data-carousel3]").querySelector("[data-slides3]")
      project = 3
    }
    // from the parent, select the son with the tag "data-active"
    const activeSlide = slides.querySelector("[data-active]")

    // newIndex should be applied to the input-radio-buttons too
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    // if its the first picture and it goes to the previous one
    // it should go to the last image (where index = length - 1)
    if (newIndex < 0)
      newIndex = slides.children.length - 1
    // if its the last picture and it goes to the next one
    // it should go to the first image (where index = 0)
    if (newIndex >= slides.children.length)
      newIndex = 0

    // show this image and make the visibility active
    slides.children[newIndex].dataset.active = true
    // remove the visibility of this image
    delete activeSlide.dataset.active

    // we get the element of the project's radio button which is pressed
    let radioButton
    if (project === 1) {
      radioButton= document.getElementsByName("input1")
    } else if (project === 2) {
      radioButton= document.getElementsByName("input2")
    } else if (project === 3) {
      radioButton= document.getElementsByName("input3")
    }
    // after we get the element we make it checked
    radioButton[newIndex].checked = true
  })
});

const radioButtons = document.querySelectorAll("[data-radio-button]")

radioButtons.forEach(radioButton => {
  radioButton.addEventListener("click", () => {

    // we check of which project's radio button is pressed
    let slides
    if (radioButton.name === "input1") {
      // from all the slides of the first project
      slides = document.querySelector("[data-slides1]")

    } else if (radioButton.name === "input2") {
      // from all the slides of the second project
      slides = document.querySelector("[data-slides2]")

    } else if (radioButton.name === "input3") {
      // from all the slides of the third project
      slides = document.querySelector("[data-slides3]")
    }

    // get the active one according to the tag
     const activeSlide = slides.querySelector("[data-active]")
    // from all the child get the specific index of the above data
    const oldIndex = [...slides.children].indexOf(activeSlide)

    // getting the value of the new index of the button that is clicked
    const newIndex = radioButton.getAttribute("data-radio-button")

    // if he clicked the same radio button that is active
    if (oldIndex == newIndex)
      return

    // check the specific radio button
    radioButton.checked = true;

    // activate the image
    slides.children[newIndex].dataset.active = true
    // delete the previous one
    delete activeSlide.dataset.active


  })
})
