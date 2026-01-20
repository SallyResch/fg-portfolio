const projectsContainer = document.querySelector(".projects");

const reposApi =
  "https://api.github.com/users/SallyResch/repos";
const repoLanguagesApi =
  "https://api.github.com/repos/SallyResch/{repo}/languages";


const fetchRepoLanguages = async (repoName) => {
  try {
    const response = await fetch(
      repoLanguagesApi.replace("{repo}", repoName)
    );

    if (!response.ok) {
      throw new Error("Could not fetch languages");
    }

    return await response.json();
  } catch (error) {
    console.error("Language fetch error:", error);
    return {};
  }
};

const renderProject = (repo, languages) => {
  const languageList = Object.keys(languages);

  projectsContainer.innerHTML += `
    <article class="project-card">
            <iframe
            src=${repo.homepage}
            frameborder="1"
            scrolling="no"
          ></iframe>
      <h3>${repo.name}</h3>
      <p>Description:</p>
      <p>${repo.description || "No description available."}</p>
      <div class="languages">
        <h4>Languages</h4>
        ${languageList.length
      ? languageList
        .map(lang => `<span class="language-tag">${lang}</span>`)
        .join("")
      : "<p>No languages found</p>"
    }
      </div>
      <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">
        Website
      </a>
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
        GitHub Repo
      </a>
    </article>
  `;
};
const fetchRepos = async () => {
  try {
    const response = await fetch(reposApi);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const repos = await response.json();

    const filteredRepos = repos.filter(repo => !repo.fork);

    for (const repo of filteredRepos) {
      const languages = await fetchRepoLanguages(repo.name);
      renderProject(repo, languages);
    }
  } catch (error) {
    console.error(error);
    projectsContainer.innerHTML = "<p>Could not load projects.</p>";
  }
};

fetchRepos();