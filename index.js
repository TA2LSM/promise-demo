//NodeJS kodu "single thread" olarak çalışır

/** EXAMPLE (1) ***************************************************************/
/*
console.log("Before");

setTimeout(() => {
  console.log("Reading a user from a database...");
}, 2000);
//2000ms bekle sonra fonksiyonu işlet burada timeout set ediliyor ve 2sn sonra dönüşü bekleniyor.
//{} içindeki fonksiyon çağrılmak üzere zamanlanıyor(schedule ediliyor) zamanı gelince de işletiliyor.

console.log("After");
//son satırdan sonra kod işletici free duruma düşer başka işlere bakar.
//2sn geçinde yukardaki kodu çağırır yine free duruma düşer.
//konsola Before, After ve Reading a user from a database... yazılır.
*/
/******************************************************************************/

/** EXAMPLE (2) ***************************************************************/
/*
console.log("Before");
const user = getUser(1);
console.log(user); //undefined olarak gözükecektir.
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    return { id: id, gitHubUserName: "ta2lsm" };
  }, 2000);
}
*/
/******************************************************************************/

/** EXAMPLE (3) ***************************************************************/
/*
console.log("Before");
const user = getUser(1);
console.log(user); //5 olarak gözükecektir ama istediğimiz değer bu değildir.
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    return { id: id, gitHubUserName: "ta2lsm" };
  }, 2000);

  return 5;
}
*/
/******************************************************************************/

// Callbacks
// Promises
// Async/await
// bunları kullanarak async işlemleri yapıyoruz.

/** EXAMPLE (4) ***************************************************************/
/*
console.log("Before");

//getUser(1, (user) => {  //ya da aşağıdaki gibi yazılabilir...
getUser(1, function (user) {
  console.log("User:", user);
});

console.log("After");

//callback default bir isimdir ve tanınımlıdır. Bu çekilde yazılması gerekiyor.
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUserName: "ta2lsm" });
  }, 2000);
}
// yukarıdaki kodda önce konsola "before" yazar
// sonra getUser fonksiyonunu çağırır. getUser 2sn'lik timer kurar ver geri döner
// konsola "after" yazar
// 2sn sonra konsola "Reading a user from a database..." yazılır ve user odjesi
// oluşturulup callback() olarak girdi verilen fonksiyona bu bilgi girdi olarak döndürülür.
// getUser içerisinde tanımlanan function(user) işletilir ve konsola user bilgisi yazdırılır.
// *****************************************************************
*/
/******************************************************************************/

/** EXAMPLE (5) ***************************************************************/
/*
console.log("Before");

//getUser(1, (user) => {  //ya da aşağıdaki gibi yazılabilir...
getUser(1, function (user) {
  console.log("User:", user);

  //Get the repositories
  getRepositories(user.gitHubUserName, (repositories) => {
    console.log("User's Repostories:", repositories);
  });
});

console.log("After");

//callback default bir isimdir ve tanınımlıdır. Bu çekilde yazılması gerekiyor.
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUserName: "ta2lsm" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Reading user's repositories form GitHub...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
// Yukarıdaki örnekte her fonskiyon çıktısı bir diğerinin girdisi olacak şekilde yazıldığı için
// (nested structure) getUser() fonsiyonundaki gibi iç içe çok fazla girdi olabilir.
// Bu da pek istenmeyen bir durumdur. Bu duruma CALLBACK HELL problem (Christmas Tree Problem) denir.
*/
/**
 * yukarıdaki kod parçasında,
 ... (repositories) => {
    console.log("User's Repostories:", repositories);
  }...
 * kısmına "anonymous function" denir. (ismi olamayan fonksiyon)
*/

/**
 * // Yukardaki kodu synchronous olarak yazsaydık şöyle bir yapı olacaktı:
 * console.log("Before");
 * const user = getUser(1);
 * const repositories = getRepositories(user.gitHubUsername);
 * const commits = getCommits(repositories[0]);
 * console.log("After");
 */
/******************************************************************************/

/** EXAMPLE (6) ***************************************************************/
console.log("Before");

//Get the repositories
getUser(1, getRepositories);

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUserName: "ta2lsm" });
  }, 2000);
}

function getRepositories(user) {
  getUserRepositories(user.gitHubUserName, getCommits);
  //getCommits parametre değildir. fonksiyon referansıdır.
}

function getUserRepositories(username, callback) {
  setTimeout(() => {
    console.log("Reading user's repositories form GitHub...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repositories) {
  displayCommits(repositories);
  //getCommits(repositories, displayCommits); //burası mantık olarak hatalı.
}

function displayCommits(commits) {
  console.log(commits);
}
