
			fetch('includes/sidebar.html')
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.text();
				})
				.then(data => {
					document.getElementById('sidebar').innerHTML = data;

					if (window.jQuery) {
						var $menu = $('#menu'),
							$menu_openers = $menu.find('.opener');

						// Re-bind click events for collapsible menu items
						$menu_openers.each(function() {
							var $this = $(this);
							$this.on('click', function(event) {
								event.preventDefault();
								$menu_openers.not($this).removeClass('active');
								$this.toggleClass('active');
								
								// Recalculate sidebar height when menu expands/collapses
								$(window).triggerHandler('resize.sidebar-lock');
							});
						});

						// Force main.js to recalculate height and lock the sticky position
						setTimeout(function() {
							$(window).trigger('resize');
							$(window).triggerHandler('resize.sidebar-lock');
						}, 100);
					}
				})
				.catch(error => {
					console.error('Error loading sidebar:', error);
				});
                
		document.addEventListener("DOMContentLoaded", function() {
			const loadMoreBtn = document.getElementById("load-more-btn");
			const postsPerPage = 4;

			if (loadMoreBtn) {
				loadMoreBtn.addEventListener("click", function() {
					// Find hidden posts
					const hiddenPosts = document.querySelectorAll(".posts .hidden-post");

					// Reveal the next set of 4 posts
					for (let i = 0; i < postsPerPage && i < hiddenPosts.length; i++) {
						hiddenPosts[i].classList.remove("hidden-post");
						hiddenPosts[i].classList.add("fade-in");
					}

					// If no more hidden posts remain, hide the button
					if (document.querySelectorAll(".posts .hidden-post").length === 0) {
						loadMoreBtn.parentElement.style.display = "none";
					}

					// Recalculate sticky sidebar lock height
					if (window.jQuery) {
						$(window).triggerHandler("resize.sidebar-lock");
					}
				});
			}
		});
 
		document.addEventListener("DOMContentLoaded", function() {
    const postsContainer = document.getElementById("posts-container");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreContainer = document.getElementById("load-more-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let allArticles = [];
    let filteredArticles = [];
    let currentIndex = 0;
    const postsPerPage = 4;

    // 1. Fetch JSON file
    fetch('/articles.json')
        .then(response => {
            if (!response.ok) throw new Error("Could not load articles.json");
            return response.json();
        })
        .then(data => {
            allArticles = data;
            filteredArticles = allArticles; // Default to 'Show All'
            
            // Render first batch
            renderArticles();
        })
        .catch(error => console.error("Error loading articles:", error));

    // 2. Render articles function
    function renderArticles() {
        const nextBatch = filteredArticles.slice(currentIndex, currentIndex + postsPerPage);

        nextBatch.forEach(article => {
            const card = document.createElement("article");
            card.className = "post-card fade-in";

            card.innerHTML = `
                <a href="${article.link}" class="image">
                    <img src="${article.image}" alt="${article.alt || article.title}" />
                </a>
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <ul class="actions">
                    <li><a href="${article.link}" class="button">Read More</a></li>
                </ul>
            `;

            postsContainer.appendChild(card);
        });

        currentIndex += postsPerPage;

        // Toggle 'Load More' button visibility
        if (currentIndex >= filteredArticles.length) {
            loadMoreContainer.style.display = "none";
        } else {
            loadMoreContainer.style.display = "block";
        }

        // Recalculate sticky sidebar lock height
        if (window.jQuery) {
            $(window).triggerHandler("resize.sidebar-lock");
        }
    }

    // 3. Handle Category Filter Clicks
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            const selectedFilter = this.getAttribute("data-filter");

            // Update active button styles
            filterButtons.forEach(btn => {
                btn.classList.remove("primary", "active");
            });
            this.classList.add("primary", "active");

            // Clear posts container and reset indexes
            postsContainer.innerHTML = "";
            currentIndex = 0;

            // Filter articles array
            if (selectedFilter === "all") {
                filteredArticles = allArticles;
            } else {
                filteredArticles = allArticles.filter(item => item.category === selectedFilter);
            }

            // Render newly filtered articles
            renderArticles();
        });
    });

    // 4. Handle 'Load More' Click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", renderArticles);
    }
});

		
