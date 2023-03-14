import { Octokit } from "https://cdn.skypack.dev/octokit?dts";

const octokit = new Octokit({
  auth: "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",
});

const input = document.getElementById("repo-name"),
  button = document.getElementById("submit-btn"),
  reposList = document.getElementById("repos-list");

button.addEventListener("click", async function (e) {
  e.preventDefault();

  if (input.value !== "") {
    const result = await octokit.request("GET /search/repositories", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      q: input.value,
      per_page: 10,
    });
    result.data.total_count == 0
      ? (reposList.innerHTML = "Ничего не найдено")
      : render(result.data.items);
  } else {
    alert('Ошибка')
  }
});

function render(repos) {
  for (const repo of repos) {
    const $li = document.createElement("li"),
      $repoTitle = document.createElement("a"),
      $repoOwner = document.createElement("p"),
      $repoCreateTime = document.createElement("p");

    $repoTitle.textContent = repo.name;
    $repoTitle.setAttribute("href", `${repo.html_url}`);
    $repoTitle.setAttribute("target", "_blank");
    $repoCreateTime.textContent = `Создан ${new Date(
      repo.created_at
    ).toLocaleDateString()}`;

    $repoOwner.textContent = repo.owner.login;

    $li.classList.add("list-item");
    $repoTitle.classList.add("repo-title");
    $repoOwner.classList.add("repo-owner");
    $repoCreateTime.classList.add("repo-create-time");

    $li.append($repoTitle);
    $li.append($repoOwner);
    $li.append($repoCreateTime);
    reposList.append($li);
  }
}
