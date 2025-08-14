// Blog functionality
        document.addEventListener('DOMContentLoaded', function () {
            initializeBlog();
        });

        function initializeBlog() {
            setupFilterButtons();
            setupSidebarCategories();
            setupSearch();
            simulateLoading();
        }

        // Filter functionality
        function setupFilterButtons() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const blogCards = document.querySelectorAll('.blog-card');

            filterButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const category = this.dataset.category;

                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Filter cards
                    filterBlogPosts(category);
                });
            });
        }

        // Sidebar categories
        function setupSidebarCategories() {
            const categoryItems = document.querySelectorAll('.category-list li');

            categoryItems.forEach(item => {
                item.addEventListener('click', function () {
                    const category = this.dataset.category;

                    // Update active category
                    categoryItems.forEach(cat => cat.classList.remove('active'));
                    this.classList.add('active');

                    // Update filter buttons
                    const filterBtn = document.querySelector(`.filter-btn[data-category="${category}"]`);
                    if (filterBtn) {
                        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                        filterBtn.classList.add('active');
                    }

                    // Filter cards
                    filterBlogPosts(category);
                });
            });
        }

        // Search functionality
        function setupSearch() {
            const searchInput = document.getElementById('blogSearch');

            searchInput.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                searchBlogPosts(searchTerm);
            });
        }

        // Filter blog posts by category
        // Filter blog posts by category
        function filterBlogPosts(category) {
            const blogCards = document.querySelectorAll('.blog-card');

            blogCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Search blog posts
        function searchBlogPosts(searchTerm) {
            const blogCards = document.querySelectorAll('.blog-card');

            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title a').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                const category = card.querySelector('.blog-category').textContent.toLowerCase();

                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm) || searchTerm === '') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Simulate loading animation
        function simulateLoading() {
            const loading = document.getElementById('loading');
            const blogGrid = document.getElementById('blogGrid');

            // Show loading initially
            loading.classList.add('show');
            blogGrid.style.display = 'none';

            // Hide loading after 1.5 seconds
            setTimeout(() => {
                loading.classList.remove('show');
                blogGrid.style.display = 'grid';

                // Animate cards in
                const blogCards = document.querySelectorAll('.blog-card');
                blogCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        card.style.transition = 'all 0.6s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }, 1500);
        }

        // Smooth scroll for anchor links
        function smoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Add scroll animations
        function addScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe elements that should animate on scroll
            document.querySelectorAll('.blog-card, .sidebar-section').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });
        }

        // Handle recent posts clicks
        function setupRecentPosts() {
            const recentPosts = document.querySelectorAll('.recent-post');

            recentPosts.forEach(post => {
                post.addEventListener('click', function () {
                    // Add click animation
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);

                    // You can add navigation logic here
                    console.log('Clicked on recent post:', this.querySelector('h6').textContent);
                });
            });
        }

        // Handle tag clicks
        function setupTags() {
            const tags = document.querySelectorAll('.tag');

            tags.forEach(tag => {
                tag.addEventListener('click', function (e) {
                    e.preventDefault();
                    const tagText = this.textContent.toLowerCase();

                    // Search for posts containing this tag
                    searchBlogPosts(tagText);

                    // Update search input
                    const searchInput = document.getElementById('blogSearch');
                    searchInput.value = tagText;

                    // Add active state to tag
                    tags.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        // Handle pagination
        function setupPagination() {
            const pageButtons = document.querySelectorAll('.page-btn');

            pageButtons.forEach(button => {
                button.addEventListener('click', function (e) {
                    e.preventDefault();

                    // Don't process arrow buttons
                    if (this.innerHTML.includes('chevron')) return;

                    // Update active page
                    pageButtons.forEach(btn => {
                        if (!btn.innerHTML.includes('chevron')) {
                            btn.classList.remove('active');
                        }
                    });
                    this.classList.add('active');

                    // Scroll to top of blog section
                    document.querySelector('.blog-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // You can add logic here to load different pages of content
                    console.log('Page clicked:', this.textContent);
                });
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function () {
            initializeBlog();
            smoothScroll();
            addScrollAnimations();
            setupRecentPosts();
            setupTags();
            setupPagination();
        });

        function initializeBlog() {
            setupFilterButtons();
            setupSidebarCategories();
            setupSearch();
            simulateLoading();
        }

        // Filter functionality
        function setupFilterButtons() {
            const filterButtons = document.querySelectorAll('.filter-btn');

            filterButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const category = this.dataset.category;

                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Filter cards
                    filterBlogPosts(category);

                    // Update sidebar category
                    const sidebarCategories = document.querySelectorAll('.category-list li');
                    sidebarCategories.forEach(cat => cat.classList.remove('active'));
                    const matchingSidebarCategory = document.querySelector(`.category-list li[data-category="${category}"]`);
                    if (matchingSidebarCategory) {
                        matchingSidebarCategory.classList.add('active');
                    }
                });
            });
        }

        // Sidebar categories
        function setupSidebarCategories() {
            const categoryItems = document.querySelectorAll('.category-list li');

            categoryItems.forEach(item => {
                item.addEventListener('click', function () {
                    const category = this.dataset.category;

                    // Update active category
                    categoryItems.forEach(cat => cat.classList.remove('active'));
                    this.classList.add('active');

                    // Update filter buttons
                    const filterButtons = document.querySelectorAll('.filter-btn');
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    const matchingFilterBtn = document.querySelector(`.filter-btn[data-category="${category}"]`);
                    if (matchingFilterBtn) {
                        matchingFilterBtn.classList.add('active');
                    }

                    // Filter cards
                    filterBlogPosts(category);
                });
            });
        }

        // Search functionality
        function setupSearch() {
            const searchInput = document.getElementById('blogSearch');
            const searchButton = searchInput.nextElementSibling;

            // Search on input
            searchInput.addEventListener('input', function () {
                const searchTerm = this.value.toLowerCase();
                searchBlogPosts(searchTerm);

                // Reset category filters when searching
                if (searchTerm) {
                    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
                    document.querySelectorAll('.category-list li').forEach(cat => cat.classList.remove('active'));
                    document.querySelector('.category-list li[data-category="all"]').classList.add('active');
                }
            });

            // Search on button click
            searchButton.addEventListener('click', function () {
                const searchTerm = searchInput.value.toLowerCase();
                searchBlogPosts(searchTerm);
            });

            // Search on Enter key
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value.toLowerCase();
                    searchBlogPosts(searchTerm);
                }
            });
        }

        // Add CSS for smooth transitions
        const additionalStyles = `
    .blog-card {
        transition: all 0.4s ease, opacity 0.3s ease, transform 0.3s ease;
    }
    
    .tag.active {
        background: var(--light-green) !important;
        color: white !important;
        border-color: var(--light-green) !important;
    }
`;

        // Add the additional styles to the document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = additionalStyles;
        document.head.appendChild(styleSheet);