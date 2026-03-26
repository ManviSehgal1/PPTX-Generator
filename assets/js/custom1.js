

      // Set active navigation link based on current page
      function setActiveNavLink() {
        // Get the current page filename - handles various URL structures
        var pathname = window.location.pathname;
        var currentPage = pathname.substring(pathname.lastIndexOf('/') + 1).split('?')[0] || 'index.html';
        
        // If empty (e.g., at root), default to index.html
        if (!currentPage || currentPage === '') {
          currentPage = 'index.html';
        }
        
        // console.log('Current page detected:', currentPage); // Debug line
        
        // Remove all active classes first
        document.querySelectorAll('.nav-link').forEach(function (link) {
          link.classList.remove('active');
        });

        // Set active class based on current page
        if (currentPage === 'customer-management.html' || currentPage === 'customers-details.html') {
          var customersLink = document.querySelector('.customers-link');
          if (customersLink) {
            customersLink.classList.add('active');
          }
        } else if (currentPage === 'user-management.html' || currentPage === 'user-details.html') {
          var usersLink = document.querySelector('.users-link');
          if (usersLink) {
            usersLink.classList.add('active');
          }
        }
      }

      // Hamburger Menu Toggle - Clean, single implementation
      document.addEventListener('DOMContentLoaded', function () {
        // Set active nav link
        setActiveNavLink();

        var hamburger = document.getElementById('hamburger');
        var headerRight = document.getElementById('headerRight');
        var body = document.body;

        if (!hamburger || !headerRight) return;

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function (e) {
          e.stopPropagation();
          var isOpen = headerRight.classList.contains('show');
          
          if (isOpen) {
            hamburger.classList.remove('active');
            headerRight.classList.remove('show');
            body.classList.remove('navbar-open');
          } else {
            hamburger.classList.add('active');
            headerRight.classList.add('show');
            body.classList.add('navbar-open');
          }
        });

        // Close menu when clicking on links
        headerRight.querySelectorAll('a').forEach(function (link) {
          link.addEventListener('click', function (e) {
            // Don't close if it's a dropdown toggle
            if (this.classList.contains('dropdown-toggle')) {
              return;
            }
            // Close menu for actual navigation
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    var isClickInsideMenu = headerRight.contains(e.target);
    var isClickOnHamburger = hamburger.contains(e.target);
    var isMenuOpen = headerRight.classList.contains('show');

    if (isMenuOpen && !isClickInsideMenu && !isClickOnHamburger) {
      hamburger.classList.remove('active');
      headerRight.classList.remove('show');
      body.classList.remove('navbar-open');
    }
  });

  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
});