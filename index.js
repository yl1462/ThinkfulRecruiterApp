'use strict'

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    console.log("ready to search");
    let userName = $('#userInput').val();
    console.log(userName);
    fetchUserName(userName);
  })
}

function fetchUserName(userName) {
  console.log("fetching User")
  fetch(`https://api.github.com/users/${userName}/repos`)
    .then(res => res.json())
    .then(resJson => showResults(resJson))
    .catch(error => {
      console.log(error.message);
    });
}

function showResults(resJson, userName) {
  console.log(resJson);
  let userInfo = `<h2>User:${userName}</h2>`
  let repoResults = ''
  $('#results').html(userInfo)
  for (let i = 0; i < resJson.length; i++) {
    repoResults += `<ol><h4>${resJson[i].name}</h4><br>
    <a href="${resJson[i].clone_url}">${resJson[i].clone_url}</a>
    <p>${resJson[i].description}</p>
    <hr>
    </ol>    
    `}
  $('#results').html(repoResults)
}


function errorMessage(error) {
  console.log("errorMessage running");
  $('#results').html(`<p>Error: ${error.message}</p>`)
}

$(
  watchForm()
)