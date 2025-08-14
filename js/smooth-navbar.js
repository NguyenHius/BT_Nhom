        // Add scroll effect
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Submenu hover effects
        document.querySelectorAll('.dropdown-submenu').forEach(function (element) {
            element.addEventListener('mouseenter', function () {
                const submenu = this.querySelector('.dropdown-menu');
                if (submenu) submenu.style.display = 'block';
            });

            element.addEventListener('mouseleave', function () {
                const submenu = this.querySelector('.dropdown-menu');
                if (submenu) submenu.style.display = 'none';
            });
        });