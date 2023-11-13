var btn = document.getElementById("contact-btn");

var modal = document.getElementById("email-modal");
var email = document.getElementById("email1");
var message = document.getElementById("message1");
var email2 = document.getElementById("email2");
var message2 = document.getElementById("message2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];
  // When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    $('body').css('overflow', 'hidden');
    email.value = '';
    message.value = '';
}
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    $('body').css('overflow', 'auto');
    email.value = '';
    message.value = '';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    $('body').css('overflow', 'auto');
    email.value = '';
    message.value = '';
  }
}

function isValidEmail(email) {
  // Regular expression to match email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check if the email matches the regex
  return emailRegex.test(email);
}

function sendErrorAlert(message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: message
      });     
}
function checkInputFieldsValues(form) {
  var emailValue;
  var messageValue;
  if (form == "1") {// form1 = modal form
    emailValue = email.value.trim();
    messageValue = message.value.trim();
  } else {
    emailValue = email2.value.trim();
    messageValue = message2.value.trim();
  }
  
  if (emailValue === '' && messageValue === '') {
    sendErrorAlert("Please fill out the fields before submitting your message!");
    return false;

  } else if (emailValue === '') {
      sendErrorAlert("Please fill out the email field before submitting your message!");
      return false;

  } else if (!isValidEmail(emailValue)) {
      sendErrorAlert("Please enter a valid email address before submitting your message!");
      return false;

  } else if (messageValue === '') {
      sendErrorAlert("Please fill out the message field before submitting your message!");
      return false;
  }
  return true;
}
function sendSuccessAlert(message) {
    // var introduction = document.getElementById("introduction-section");
    // var projects = document.getElementById("project-section");
    // const borders = document.querySelectorAll('.border-bottom');
    // var info = document.getElementById("info-section");
    // var socials = document.getElementById("socials-section");
    
    // introduction.style.visibility = "hidden";
    // projects.style.visibility = "hidden";
    // borders.forEach(border => {
    //   border.style.visibility = 'hidden';
    // });
    // info.style.visibility = "hidden";
    // socials.style.visibility = "hidden";

    Swal.fire({
        // position: 'top',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'my-swal-popup',
          content: 'my-swal-content',
          title: 'my-swal-title'
        }
      });
      
    
    setTimeout(
        function() {
          window.location.href = 'index.html';
        }, 1500)
}

// formspree

window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  var form1 = document.getElementById("emailform");
  var form2 = document.getElementById("email-me");
  // var button = document.getElementById("my-form-button");
  // var status = document.getElementById("status");
  // Success and Error functions for after the form is submitted

  function success() {
    // form1.reset();
    // form2.reset();
    // status.classList.add("success");
    // status.innerHTML = "Thanks!";
    sendSuccessAlert('Email has been sent!')
  }

  function error() {
    // status.classList.add("error");
    // status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form1.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form1);
    ajax(1,form1.method, form1.action, data, success, error);
  });
  form2.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form2);
    ajax(2,form2.method, form2.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(form, method, url, data, success, error) {
  if (!checkInputFieldsValues(form))
    return;
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}