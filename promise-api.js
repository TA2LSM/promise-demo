// --- 02.03.2022 ---
// Video 09 kısmıyla ilgili koddur.

/*
// Birşeyleri test etmek için çoktan çözümlenmiş promise kullanılabilir.
// Çoktan çözümlenmiş (resolved) bir promise oluşturmak için;
const p1 = Promise.resolve({ id: 1 }); //bir değer, dizi ya da obje dönebiliriz
p1.then((result) => console.log(result));

// Çokten reddedilmiş promise oluşturmak için;
const p2 = Promise.reject(new Error("Reason for rejection is: ..."));
//reject ederken her zaman error objesi kullanmak faydalı olur.
p2.catch((err) => console.log(err));
// err objesi kullanılırsa call stack ile birlikte error'ları gösterir
//p2.catch((err) => console.log(err.message));
// bu şekilde ise sadece tanımladığımız error mesajını görürüz.
*/

// const p1 = new Promise((resolve, reject) => {
//   //calling API 1
//   setTimeout(() => {
//     console.log("Async operation 1 ...");
//     //resolve(1);
//     reject(new Error("Something failed!"));
//   }, 2000);
// });
const p1 = new Promise((resolve) => {
  //calling API 1
  setTimeout(() => {
    console.log("Async operation 1 ...");
    resolve(1);
  }, 2000);
});

// bu kısımda reject olmayacağı için bu parametre kullanılmadı
const p2 = new Promise((resolve) => {
  //calling API 2
  setTimeout(() => {
    console.log("Async operation 2 ...");
    resolve(2);
  }, 2000);
});

// herhangi bir promise reject olursa aşağıdaki kodun sonucunda error oluşur.
// Promise.all([p1, p2])
//   .then((result) => console.log(result))
//   .catch((err) => console.log("Error:", err.message));

// herhangi bir promise resolve olduğu anda aşağıdaki kod da çözümlenir devamını beklemez.
// sonuç oalrak da ilk çözümlenen promise dönüş değeri gözükür.
Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error:", err.message));
