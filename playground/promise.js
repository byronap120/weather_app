var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("it works");
  },2500);
});

promise.then(() => {
  console.log('Succes');
}, () => {
  console.log('Fail');
});
