//--- 02.03.2022 ---

console.log("Before");

getUser(1, (user) => {
  getRepositories(user.gitHubUserName, (repositories) => {
    getCommits(repositories[0], (commits) => {
      console.log(commits);
    });
  });
});

console.log("After");

//callback default bir isimdir ve tanınımlıdır. Bu çekilde yazılması gerekiyor.
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUserName: "ta2lsm" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading user's repositories form GitHub...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading commits from GitHub...");
      resolve(["commit"]);
    });
  });
}
