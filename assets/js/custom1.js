

      // Hamburger Menu Toggle - Clean, single implementation
      document.addEventListener('DOMContentLoaded', function () {
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
            hamburger.classList.remove('active');
            headerRight.classList.remove('show');
            body.classList.remove('navbar-open');
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
      });