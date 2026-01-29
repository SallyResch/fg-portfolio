const reposApi = "https://api.github.com/users/SallyResch/repos";
const repoLanguagesApi = "https://api.github.com/repos/SallyResch/{repo}/languages";
const projectsContainer = document.querySelector(".github-projects");

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

};
