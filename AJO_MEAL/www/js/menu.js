let timer; 
const navbar = document.querySelector('.navbar');


function hideNavbar() {
  navbar.classList.add('hidden'); 
}

function showNavbar() {
  navbar.classList.remove('hidden'); 
  resetTimer(); 
}

function resetTimer() {
  clearTimeout(timer); 
  timer = setTimeout(hideNavbar, 2000); 
}

document.addEventListener('mousemove', function() {
  showNavbar(); 
});

document.addEventListener('touchstart', function() {
  showNavbar(); 
});

document.addEventListener('click', function(event) {
  if (event.target.id === 'search-icon') {
    showSearchBar();
  } else {
    showNavbar(); 
  }
});

document.addEventListener('scroll', function() {
  showNavbar(); 
});


