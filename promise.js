// --- 02.03.2022 ---
// Promise bir objedir. Async bir olayın sonucunu tutar. Yaratılır yaratılmaz "pending"
// state oalrak çalışır. Hata olursa "rejected", olumlu çözümlenirse "resolve (fulfilled)"
// duruma geçer.

//const p = new Promise(function(resolve, reject) { //ya da aşağıdaki gibi yazılabilir
const p = new Promise((resolve, reject) => {
  // Burada async fonksiyonlarla işlem yapıldığı düşünülüyor...
  // ...
  //resolve(...);
  //reject(new Error("Error message"));

  setTimeout(() => {
    //resolve(1);
    reject(new Error("Error message")); //bu tip error tanımlanırsa buna err.message olarak erişilebilir.
  }, 2000);
});
// buradaki resolve ve reject birer fonksiyondur. Kısacası promise'e iki parametreli
// bir fonksiyon girdisi olmalıdır ve bu fonksiyonun iki parametresi de aslında bir
// fonksiyondur !!!

//p.catch() //error durumu (reject)
//p.then()  //promise çözülme durumu (resolve)
//p.finally() //kurs zamanında yokmuş bu metot

p.then((result) => console.log("Result:", result)).catch((err) =>
  console.log("Error:", err.message)
);
