const projectsContainer = document.querySelector(".projects");

const fetchRepos = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/SallyResch/repos"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const repos = await response.json();

    repos
      .filter(repo => !repo.fork)
      .forEach(repo => {
        projectsContainer.innerHTML += `
          <article class="project-card">
            <img
            src="./images/ac2eea7ff7c76aff36c2e7a090f7018f.png"
            alt="picture of girl coding"
            width="1024"
            hight="1024"
            class="coding-picture"
            />
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available."}</p>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
              GitHub Link
            </a>
          </article>
        `;
      });

  } catch (error) {
    console.error(error);
    projectsContainer.innerHTML = "<p>Could not load projects.</p>";
  }
};

fetchRepos();

/*const starredProjectsContainer = document.querySelector(".starred-projects");
const fetchStarredRepos = async () => {
    try {
        const response = await fetch(
            "https://api.github.com/users/SallyResch/starred"
        );

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const repos = await response.json();

        repos
            .filter(repo => !repo.fork)
            .forEach(repo => {
                starredProjectsContainer.innerHTML += `
          <article class="project">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available."}</p>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </article>
        `;
            });

    } catch (error) {
        console.error(error);
        projectsContainer.innerHTML = "<p>Could not load projects.</p>";
    }
};

fetchStarredRepos();*/