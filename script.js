document.addEventListener('DOMContentLoaded', async () => {
    await loadSkills();
    await loadProjects();
});

async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const skillsData = await response.json();
        const container = document.getElementById('skills-container');
        
        container.innerHTML = '';
        
        Object.entries(skillsData).forEach(([category, skills]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category;
            categoryDiv.appendChild(categoryTitle);
            
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'skill-tags';
            
            skills.forEach(skill => {
                const tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.textContent = skill;
                tagsDiv.appendChild(tag);
            });
            
            categoryDiv.appendChild(tagsDiv);
            container.appendChild(categoryDiv);
        });
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const container = document.getElementById('repos-container');
        
        container.innerHTML = '';
        
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            
            const name = document.createElement('h3');
            name.className = 'repo-name';
            name.textContent = project.name;
            card.appendChild(name);
            
            const desc = document.createElement('p');
            desc.className = 'repo-description';
            desc.textContent = project.description;
            card.appendChild(desc);
            
            const techDiv = document.createElement('div');
            techDiv.className = 'repo-tech';
            project.tech.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                techDiv.appendChild(tag);
            });
            card.appendChild(techDiv);
            
            const linksDiv = document.createElement('div');
            linksDiv.className = 'repo-links';
            
            const repoLink = document.createElement('a');
            repoLink.href = project.repo;
            repoLink.target = '_blank';
            repoLink.rel = 'noopener noreferrer';
            repoLink.className = 'btn btn-primary';
            repoLink.innerHTML = '<span>Repo</span>';
            linksDiv.appendChild(repoLink);
            
            if (project.demo) {
                const demoLink = document.createElement('a');
                demoLink.href = project.demo;
                demoLink.target = '_blank';
                demoLink.rel = 'noopener noreferrer';
                demoLink.className = 'btn btn-primary';
                demoLink.innerHTML = '<span>Demo</span>';
                linksDiv.appendChild(demoLink);
            }
            
            card.appendChild(linksDiv);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}
