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

function showResults(resJson) {
  console.log(resJson);
  let userInfo = `<h3>User:${userName}</h3>`
  $('#results').html(userInfo)
  for (let i = 0; i < resJson.length; i++) {
    $('#results').html(`
    <li>
    <h4>${resJson[i].name}</h4><br>
    <a href="$resJson[i].html_url">${resJson[i].html_url}</a><br>
    <p>${resJson[i].description}</p>
    </li>    
    `)}
}

function errorMessage(error) {
  console.log("errorMessage running");
  $('#results').html(`<p>Error: ${error.message}</p>`)
}

$(
  watchForm()
)