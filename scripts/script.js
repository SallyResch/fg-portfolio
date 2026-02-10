const githubRepoApi = "https://api.github.com/users/SallyResch/repos";
const githubRepoContainer = document.querySelector(".github-projects");

const fetchRepos = async () => {
  try {
    githubRepoContainer.innerHTML = "<p>Loading projects...</p>";

    const response = await fetch(githubRepoApi);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const repos = await response.json();

    const reposWithHomepage = repos.filter(
      repo => repo.homepage && repo.homepage.trim() !== ""
    );

    renderRepos(reposWithHomepage);
  } catch (error) {
    githubRepoContainer.innerHTML =
      "<p>Could not load repositories from GitHub</p>";
  }
};

const renderRepos = (repos) => {
  githubRepoContainer.innerHTML = "";

  repos.forEach((repo) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.setAttribute("tabindex", "0");

    const iframe = document.createElement("iframe");
    iframe.src = repo.homepage;
    iframe.loading = "lazy";
    iframe.setAttribute("frameborder", "1");
    iframe.setAttribute("scrolling", "no");

    const textDiv = document.createElement("div");
    textDiv.classList.add("text-div");

    textDiv.innerHTML = `
      <h3 class="project-card-header">${repo.name}</h3>

      <a
        class="website-link"
        href="${repo.homepage}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Website
      </a>

      <h4 class="project-card-header">Description:</h4>
      <p class="description">
        ${repo.description || "No description provided."}
      </p>

      <h4 class="project-card-header">Language</h4>
      <p>${repo.language || "Not specified"}</p>
    `;

    projectCard.addEventListener("click", () => {
      document
        .querySelectorAll(".project-card")
        .forEach(card => card.classList.remove("active"));

      projectCard.classList.add("active");
    });

    projectCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        projectCard.click();
      }
    });

    projectCard.appendChild(iframe);
    projectCard.appendChild(textDiv);
    githubRepoContainer.appendChild(projectCard);
  });
};

if (githubRepoContainer) {
  fetchRepos();
}