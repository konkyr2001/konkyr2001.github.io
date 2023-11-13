// check the first radio button always
window.onload=check;
function check() {
  const radioButtonIndexs1 = document.querySelectorAll("[data-radio-button]")
  radioButtonIndexs1[0].checked = true
}

// does a smooth scrolling whenever a link is clicked
$(document).ready(function() {
  document.getElementById("html-css").click(); // project section

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
  
// event listener for #my-img on click
function createAnimationsListener() {
  console.log("mpike createanimation")
  const myimg = document.getElementById("my-img");
  myimg.classList.toggle("animate");
  let mytext = document.getElementById("my-text");
  console.log(window.getComputedStyle(mytext).opacity)
  if (window.getComputedStyle(mytext).opacity == "0") {
    mytext.style.visibility = "visible";
    mytext.style.opacity = "1";
  } else {
    mytext.style.visibility = "hidden";
    mytext.style.opacity = "0";
  }
  mytext.classList.toggle("slide-in")
  mytext.classList.toggle("fade-in")
  mytext.classList.toggle("animate")
}

// function that removes event listener so when the width 
// of the screen < 750px the text displays by itself with 
checkWidth();
function checkWidth() {
  const myimg = document.getElementById("my-img");
  const mytext = document.getElementById("my-text");
  if (window.innerWidth <= 750) {
    myimg.classList.add("animate");
    myimg.style.cursor ="default";
    mytext.classList.add("slide-in");
    mytext.classList.add("animate");
    mytext.style.opacity = "1";
    mytext.style.visibility = "visible";
    myimg.removeEventListener("click", createAnimationsListener);
  } else {
    myimg.style.cursor ="pointer";
    myimg.addEventListener("click", createAnimationsListener);
  }
}


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

//change projects according to buttons and dropdown inputs

const htmlButton = document.getElementById("html-css");
const reactButton = document.getElementById("react");
const javaButton = document.getElementById("java");
const wordpressButton = document.getElementById("wordpress");
const unityButton = document.getElementById("unity");

htmlButton.addEventListener("click", () => displayDiv("html-css"));
reactButton.addEventListener("click", () => displayDiv("react"));
javaButton.addEventListener("click", () => displayDiv("java"));
wordpressButton.addEventListener("click", () => displayDiv("wordpress"));
unityButton.addEventListener("click", () => displayDiv("unity"));


function displayDiv(divId) {

  document.getElementById("html-css").classList.remove("project-active");
  document.getElementById("react").classList.remove("project-active");
  document.getElementById("java").classList.remove("project-active");
  document.getElementById("wordpress").classList.remove("project-active");
  document.getElementById("unity").classList.remove("project-active");

  document.getElementsByClassName("html-css-projects")[0].style.display = "none";
  document.getElementsByClassName("react-projects")[0].style.display = "none";
  document.getElementsByClassName("java-projects")[0].style.display = "none";
  document.getElementsByClassName("unity-projects")[0].style.display = "none";
  document.getElementsByClassName("wordpress-projects")[0].style.display = "none";
  
  if (divId == "html-css") {
  document.getElementById(divId).classList.add("project-active");
  document.getElementsByClassName("html-css-projects")[0].style.display = "block";
  } else if (divId == "react") {
  document.getElementById(divId).classList.add("project-active");
  document.getElementsByClassName("react-projects")[0].style.display = "block";
  } else if (divId == "java") {
  document.getElementById(divId).classList.add("project-active");
  document.getElementsByClassName("java-projects")[0].style.display = "flex";
  } else if (divId == "unity") {
  document.getElementById(divId).classList.add("project-active");
  document.getElementsByClassName("unity-projects")[0].style.display = "block";
  } else if (divId == "wordpress") {
  document.getElementById(divId).classList.add("project-active");
  document.getElementsByClassName("wordpress-projects")[0].style.display = "block";
  }
}

// const selectButton = document.getElementById("select-button");
// selectButton.addEventListener("change", function() {
//   displayDiv(this.value);
// })
let selectedProject = document.getElementById("value");
const dropdown = document.getElementById("dropdown-menu");
selectedProject.addEventListener("click", function() {
  dropdown.classList.toggle("show-dropdown-menu");
});
dropdown.addEventListener("click", function(event) {
  selectedProject.innerHTML = event.target.innerHTML + "<i class='fa-solid fa-angle-down'></i>";
  selectedProject.className = event.target.className;
  selectedProject.value = event.target.value;
  displayDiv(selectedProject.value);
});

// close dropdown if clicking outisde
document.addEventListener("click", function(event) { 
  if (!selectedProject.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove("show-dropdown-menu");
  }
});

const containers = document.querySelectorAll('.container');
window.addEventListener('DOMContentLoaded', checkVisibility);
window.addEventListener('scroll', checkVisibility);


















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
    button.dataset.carouselButton === "next3" ||
    button.dataset.carouselButton === "next4" ||
    button.dataset.carouselButton === "next5")
      offset = 1
    else
      offset = -1

      let slides
      let project // gets which project is pressed to check the radio button later
    if (button.dataset.carouselButton === "next1" || button.dataset.carouselButton === "prev1") {
      // the closest object with the tag "data-carousel"
      // from the parent select the son with the tag "data-slides"
      slides = document.querySelector("[data-slides1]")
      project = 1
    }
    else if (button.dataset.carouselButton === "next2" || button.dataset.carouselButton === "prev2") {
      slides = slides = document.querySelector("[data-slides2]")

      project = 2
    }
    else if (button.dataset.carouselButton === "next3" || button.dataset.carouselButton === "prev3") {
      slides = slides = document.querySelector("[data-slides3]")

      project = 3
    }
    else if (button.dataset.carouselButton === "next4" || button.dataset.carouselButton === "prev4") {
      slides = document.querySelector("[data-slides4]")

      project = 4
    }
    else if (button.dataset.carouselButton === "next5" || button.dataset.carouselButton === "prev5") {
      slides = document.querySelector("[data-slides5]")

      project = 5
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
    } else if (project === 4) {
      radioButton= document.getElementsByName("input4")
    } else if (project === 5) {
      radioButton= document.getElementsByName("input5")
    }
    // after we get the element we make it checked
    console.log(newIndex)
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
