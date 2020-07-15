function getGithubData() {
  let dataContainer = document.getElementById("github_data_container");

  // get all personal github repos
  fetch("https://api.github.com/users/bryannilsen/repos?page=1&per_page=100", {
    headers: new Headers({
      "User-Agent": "BryanNilsen",
      Accept: "application/vnd.github.v3+json",
      Authorization: "token " + githubToken
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // go through each repo and do something
      data.forEach(element => {
        fetch(
          `https://api.github.com/repos/bryannilsen/${element.name}/events`,
          {
            headers: new Headers({
              "User-Agent": "BryanNilsen",
              Accept: "application/vnd.github.v3+json",
              Authorization: "token " + githubToken
            })
          }
        )
          .then(response => response.json())
          .then(repoData => {
            console.log(repoData);
          });

        // create DOM element to append github repo info
        let dataEl = document.createElement("p");
        dataEl.innerHTML = `<a href="${element.html_url}" target="blank">${
          element.name
        }</a>`;
        dataContainer.appendChild(dataEl);
      });
    })
    .catch(error => console.error(error));
}

getGithubData();
