// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to load project details
async function loadProjectDetails() {
    const projectId = getUrlParameter('projectId'); // Get the project ID from the URL
    if (!projectId) {
        console.error('No project ID found in the URL');
        return;
    }

    // Use project ID to load the relevant project data (e.g., from a JSON file or database)
    const project = await getProjectDetailsById(projectId);
    
    console.log('title:', project);


    // Insert the project details into the page
    const projectInfoDiv = document.getElementById('projectImage');
    projectInfoDiv.innerHTML = `
              <div class="col-lg-8">
            <div class="projects-details-slider swiper init-swiper">

              <script type="application/json" class="swiper-config">
                {
                  "loop": true,
                  "speed": 600,
                  "autoplay": {
                    "delay": 5000
                  },
                  "slidesPerView": "auto",
                  "pagination": {
                    "el": ".swiper-pagination",
                    "type": "bullets",
                    "clickable": true
                  }
                }
              </script>

              <div class="swiper-wrapper align-items-center">

                <div class="swiper-slide">
                  <img src="../${project.image}" alt="${project.title}">
                </div>

                <div class="swiper-slide">
                  <img src="../${project.image}" alt="${project.title}">
                </div>


              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>

          <div class="col-lg-4" >

            

              <div class="projects-info" data-aos="fade-up" data-aos-delay="200">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <ul>
                  <li><strong>Category</strong>:${project.tag}</li>
                  <li><strong>Client</strong>: ASU Company</li>
                  <li><strong>Project date</strong>: 01 March, 2020</li>
                  <li><i class="bi bi-github"> </i> <strong>Project URL</strong>:  <a href="${project.url}" target="_blank">Click Here</a></li>
                </ul>
              </div>
              

          </div>
            `;
        }

// Sample function to simulate loading project details from an object (this could be from a database, JSON file, etc.)
async function getProjectDetailsById(projectId) {

    const response = await fetch('../assets/js/projects.json');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const projects = await response.json();
    const id = Number(projectId);
    //console.log('Loaded projects:', projects); // <-- This will print the data

    return projects.find(project => project.projectId === id);

}

// Call the function to load the project details on page load
window.onload = loadProjectDetails;
