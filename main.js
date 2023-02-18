// Main variables
let input = document.querySelector(".get-repos input");
let button = document.querySelector(".get-button");
let repos = document.querySelector(".show-data");

button.onclick = function () {
  getRepos();
};

function getRepos() {
  if (input.value == "") {
    repos.innerHTML = "<span>Please write valid Github username</span>";
  } else {
    fetch(`http://api.github.com/users/${input.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((repositories) => {
        //Empty the container
        repos.innerHTML = "";
        //loop on repositories
        repositories.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          let repoLink = document.createElement("a");
          let repoLinkText = document.createTextNode("visit");
          repoLink.appendChild(repoLinkText);
          repoLink.href = repo.html_url;
          repoLink.setAttribute("target", "_blank");
          let stars = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );
          let containerDiv = document.createElement("div");
          containerDiv.appendChild(repoLink);
          containerDiv.appendChild(stars);
          stars.appendChild(starsText);
          mainDiv.appendChild(repoName);
          mainDiv.appendChild(containerDiv);
          mainDiv.className = "repo-container";
          containerDiv.className = "buttons-container";
          repos.appendChild(mainDiv);
        });
      })
      .catch(() => {
        repos.innerHTML = "couldn't fetch data , i'm sorry";
      });
  }
}
