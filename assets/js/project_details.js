// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to load project details
function loadProjectDetails() {
    const projectId = getUrlParameter('projectId'); // Get the project ID from the URL
    if (!projectId) {
        console.error('No project ID found in the URL');
        return;
    }

    // Use project ID to load the relevant project data (e.g., from a JSON file or database)
    const project = getProjectDetailsById(projectId);

    // Insert the project details into the page
    const projectInfoDiv = document.getElementById('projectInfo');
    projectInfoDiv.innerHTML = `
        <div class="projects-info" data-aos="fade-up" data-aos-delay="200">
            <h3>Project information</h3>
            <ul>
                <li><strong>Category</strong>: ${project.category}</li>
                <li><strong>Client</strong>: ${project.client}</li>
                <li><strong>Project date</strong>: ${project.date}</li>
                <li><strong>Project URL</strong>: <a href="${project.url}" target="_blank">${project.url}</a></li>
            </ul>
        </div>
        <div class="projects-description" data-aos="fade-up" data-aos-delay="300">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
        </div>
    `;
}

// Sample function to simulate loading project details from an object (this could be from a database, JSON file, etc.)
function getProjectDetailsById(projectId) {
    const projects = {
        1: {
            category: 'Web Design',
            client: 'ASU Company',
            date: '01 March, 2020',
            url: 'https://www.example.com',
            title: 'Exercitationem repudiandae officiis neque suscipit',
            description: 'Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.'
        },
        2: {
            category: 'Mobile App',
            client: 'Tech Innovations',
            date: '15 May, 2021',
            url: 'https://www.techinnovations.com',
            title: 'App Development for E-commerce',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit interdum venenatis.'
        },
        // Add more projects as needed
    };
    return projects[projectId];
}

// Call the function to load the project details on page load
window.onload = loadProjectDetails;
