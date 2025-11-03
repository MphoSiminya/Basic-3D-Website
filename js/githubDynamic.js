
// GitHub repositories with custom image URLs
const projects = [
    {
        "name": "Project 1",
        "description": "A web application built with React and Node.js",
        "html_url": "https://github.com/username/project1",
        "homepage": "https://project1-demo.com",
        "language": "JavaScript",
        "stargazers_count": 42,
        "updated_at": "2023-06-15T14:32:12Z",
        "image_url": "/images/project1.jpg"
    },
    // Add more projects as needed
];

// Or to fetch from GitHub API (note: GitHub doesn't provide project images)
fetch('https://api.github.com/users/MphoSiminya/repos')
    .then(response => response.json())
    .then(repos => {
        const grid = document.querySelector('.projects-grid');
        grid.innerHTML = '';
        
        repos.forEach(repo => {
            if (!repo.fork) {
                const card = document.createElement('article');
                card.className = 'project-card';
                card.setAttribute('data-aos', 'fade-up');
                
                // You would need to manually map repo names to image URLs
                const imageUrl = getProjectImage(repo.name);
                
                card.innerHTML = `
                    <div class="project-image-container">
                        <img src="${imageUrl}" alt="${repo.name} screenshot" class="project-image">
                        <div class="project-links">
                            <a href="${repo.html_url}" class="github-link" title="View on GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            ${repo.homepage ? `<a href="${repo.homepage}" class="live-demo" title="Live Demo">🌐</a>` : ''}
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${repo.name}</h3>
                        <p class="project-description">${repo.description || 'No description provided.'}</p>
                        <div class="project-footer">
                            <div class="project-tags">
                                ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
                            </div>
                            <div class="project-meta">
                                <span class="stars">⭐ ${repo.stargazers_count}</span>
                                <span class="updated">Updated ${formatDate(repo.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                `;
                
                grid.appendChild(card);
            }
        });
    })
    .catch(error => console.error('Error loading projects:', error));

// Helper function to map repo names to image paths
function getProjectImage(repoName) {
    const imageMap = {
        'project1': '/img/GenshinImage_1.png',
        'project2': '/img/GenshinImage_2.png',
        // Add mappings for your projects
    };
    return imageMap[repoName.toLowerCase()] || 'https://via.placeholder.com/600x400';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
