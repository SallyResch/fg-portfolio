const skillDiv = document.querySelector(".skill");
const languages = document.querySelectorAll(".language");
const toggles = document.querySelectorAll(".language, .databases");

const dropdown = () => {
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const skill = toggle.parentElement;

      const itemsToToggle = skill.querySelectorAll(
        ".framework, .database"
      );

      itemsToToggle.forEach(item => {
        item.classList.toggle("hide");
      });
    });
  });
}
dropdown();

