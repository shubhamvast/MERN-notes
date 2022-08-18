//promise
// it is object which holds the result or output of asynchronours activity
// promise rejected
// promise resolved

// const promise = new Promise((resolve, reject) => {
//   // setTimeout(()=>resolve(1),2000);

//   setTimeout(() => reject({ message: "something faild" }), 2000);
// });

// promise
//   .then((response) => console.log(response))
//   .catch((err) => console.log(err.message));

// console.log("before");

// getUser(1).then((response)=>console.log(response)).catch((err)=>console.log(err));

// console.log("after");

// function getUser(id) {
//   return new Promise((resolve, reject) => {
//     // setTimeout(() => resolve({ id, name: "shubham" }), 2000);

//     setTimeout(()=> reject({message:"somthig going wrong..."}));
//   });
// }

console.log("before");

getUser(1)
  .then((response) => {
    console.log(response);
    getGitHubRepo(response.name)
      .then((response) => {
        console.log(response);
        getComments(response[0])
          .then((response) => console.log(response))
          .catch((err) => console.log(err.message));
      })
      .catch((err) => {
        console.log(err.message);
      });
  })
  .catch((err) => console.log(err));

console.log("after");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id, name: "shubham" }), 2000);

    // setTimeout(()=> reject({message:"somthig going wrong..."}));
  });
}

function getGitHubRepo(gitHubUserName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(["repo1", "repo2", "repo3"]), 2000);
    // setTimeout(() =>reject({message:"repos not fetched"}), 2000);
  });
}

function getComments(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(["comment1", "comment2", "comment3"]));
    // setTimeout(()=> reject({message:"comments not fetched...."}));
  });
}
