// //callback functions

// console.log("before");

// getUser(1,function(user){
//     console.log(user);
// })

// console.log("after");

// function getUser(id,callBackFunction){

//     let user = {id,name:"shubham"};

//     setTimeout(()=>callBackFunction(user),2000);

//     getGitHubRepo(user.name,function(repo){
//         console.log(repo);

//         getComments(repo[0],function(comments){
//             console.log(comments);
//         })
//     })
// }

// function getGitHubRepo(gitHubUserName,cb){
//     setTimeout(() =>cb([1,2,34,4]), 2000);
// }

// function getComments(repo,cb){
//     setTimeout(() => cb(["comment1","comment2","comment3"]), 2000);
// }

// //callback hell or chrismas tree problem

console.log("before");
getUser(1, function (user) {
  console.log(user);
});
console.log("after");

function getUser(id, cb) {
  const user = { id, name: "shubham" };
  setTimeout(() => {
    cb(user);
  }, 2000);

  getRepo(user.name, function (repos) {
    console.log(repos);
    getComments(repos[0], function (comments) {
      console.log(comments);
    });
  });
}

function getRepo(userName, cb) {
  setTimeout(() => {
    cb(["repo1", "repo2", "repo3"]);
  }, 2000);

}

function getComments(repo,cb){
    setTimeout(()=>{
        cb(["comment1","comment2","comment3"]);
    },2000)
}
