//--- 02.03.2022 ---

console.log("Before");

// getUser(1, (user) => {
//   getRepositories(user.gitHubUserName, (repositories) => {
//     getCommits(repositories[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

/*
// getUser fonksiyonu bir promise dönüyor
const p = getUser(1);
// kontrol amaçlı user değişkenine, resolve değeri olarak aldığımız objeyi konsola yazdırdık.
p.then((user) => console.log(user));
//getUser(1).then((user) => console.log(user)); // şeklinde de yazılabilir. (kullanılan bu)
*/

getUser(1)
  .then((user) =>
    getRepositories(user.gitHubUserName).then((repositories) =>
      getCommits(repositories[0]).then((commits) => console.log("All commits:", commits))
    )
  )
  .catch((err) => console.log("Error:", err.message));
// buradaki catch yukarıdaki async işlemlerden herhangi birinde sıkıntı olursa çalışacak.

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
    }, 2000);
  });
}
