// Function to fetch and display projects
fetch('assets/js/projects.json')
  .then(response => response.json())
  .then(data => {
    const projectsContainer = document.getElementById('projects-container');

    // Clear existing projects if any
    projectsContainer.innerHTML = '';


    const categoryMap = {
      "AIML": "filter-aiml",
      "Visual": "filter-visual",
      "Games": "filter-games"
    };


    data.forEach(project => {

      const categoryClass = categoryMap[project.category] || '';

      const projectItem = document.createElement('div');
      projectItem.classList.add('col-4' ,'isotope-item', `filter-${project.category.toLowerCase()}`);
      
      projectItem.innerHTML = `
          <div class="projects-card">
            <a href="${project.link}" title="More Details" class="text-decoration-none text-reset">
              <div class="projects-content h-100">
                <img src="${project.image}" class="img-fluid" alt="${project.title}">
              </div>

              <div class="projects-description-box p-3">
                <small class="text-primary fw-bold text-uppercase">${project.category}</small>
                <h5 class="mt-2 mb-1">${project.title}</h5>
                <p class="text-muted mb-0">${project.description}</p>
              </div>
            </a>
          </div>
      `;

      projectsContainer.appendChild(projectItem);
    });

    // ✅ Once all projects are loaded, initialize Isotope
    imagesLoaded(projectsContainer, function () {
      const iso = new Isotope(projectsContainer, {
        itemSelector: '.isotope-item',
        layoutMode: 'masonry',
        filter: '*'
      });

      // ✅ Hook filter buttons to this isotope instance
      document.querySelectorAll('.isotope-filters li').forEach(btn => {
        btn.addEventListener('click', function () {
          document.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');

          const filterValue = this.getAttribute('data-filter');
          iso.arrange({ filter: filterValue });
        });
      });

      // ✅ Hook header filter triggers too
      document.querySelectorAll('.header-filter').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const targetFilter = this.getAttribute('data-filter');
          const matchingFilterBtn = document.querySelector(`.isotope-filters li[data-filter="${targetFilter}"]`);
          if (matchingFilterBtn) matchingFilterBtn.click();

          const portfolioSection = document.querySelector('#projects');
          if (portfolioSection) {
            const scrollMarginTop = parseInt(getComputedStyle(portfolioSection).scrollMarginTop || 0);
            const top = portfolioSection.offsetTop - scrollMarginTop;

            window.scrollTo({ top, behavior: 'smooth' });
            history.pushState(null, null, '#projects');
          }
        });
      });

    });
  })
  .catch(error => console.error('Error loading projects:', error));
