function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return 'f3bf1a0e6efbe18eeb88aa7b78ddc158343d2852';
}

function forkRepo() {
  const repo = 'https://api.github.com/repos/learn-co-curriculum/js-ajax-fetch-lab/forks';
  fetch(repo,
    {
    method: 'POST',
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(res => res.json())
    .then(json => showResults(json));
}

function showResults(json) {
  document.getElementById('results').innerHTML = '<a href="' + json.html_url + '"data-fork=' + json.url + '>' + json.html_url + '</a>';
}

function createIssue() {
  const issueData = {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value
  }

  const repo = document.getElementById('results').firstChild.dataset.fork + '/issues';

  fetch(repo,
  {
    method: 'POST',
    body: JSON.stringify(issueData),
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => console.log(res))
  .then(getIssues());

}

function getIssues() {
  const repo = document.getElementById('results').firstChild.dataset.fork + '/issues';

  fetch(repo,
  {
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
  .then(res => res.json())
  .then(json => showIssues(json));
}

function showIssues(json) {
const issues = json;
const issueList = `<ul>${issues
  .map(
    issue =>
    '<li><strong>' +
    issue.title +
    '-' +
    issue.body +
    '</strong></li>'
  )
  .join('')}</ul>`;
  document.getElementById('issues').innerHTML = issueList;
}
