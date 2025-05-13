$(document).ready(function(){
  $('.reset').click(function(){
      $('.modal-wrapper').fadeIn('fast');
  });
  $('#close-modal').click(function(){
      $('.modal-wrapper').fadeOut('fast');
  });    
});


const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('Email').value.trim();
  const password = document.getElementById('Password').value.trim();

  const emailError = document.querySelector('.email .error');
  const passwordError = document.querySelector('.password .error');

  if (email === "") {
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }

  if (password === "") {
    passwordError.style.display = "block";
  } else {
    passwordError.style.display = "none";
  }

  if (email === "" || password === "") {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/register');
    const users = await response.json();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password.');

    }
    localStorage.setItem("loggedin", JSON.stringify(user))
    window.location.href = 'declare.html';



  } catch (error) {
    console.error(error);
    document.getElementById('modal-wrap').style.display = 'block';
  }
});



