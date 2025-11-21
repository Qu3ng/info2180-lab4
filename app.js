// Utility: safely encode user input for query param
function safeQuery(q) {
  return encodeURIComponent(q.trim());
}

function showResult(html) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = html;
}

document.getElementById('searchBtn').addEventListener('click', function () {
  const q = document.getElementById('searchInput').value;

  // Build URL with query param (if present)
  const url = q.trim() === '' ? 'superheroes.php' : 'superheroes.php?query=' + safeQuery(q);

  fetch(url)
    .then(resp => {
      if (!resp.ok) throw new Error('Network response was not ok');
      return resp.text();
    })
    .then(text => {
      // If server returned plain list or hero HTML or "Superhero not found", put it into #result
      showResult(text);
    })
    .catch(err => {
      showResult('<p>Error fetching data: ' + String(err) + '</p>');
    });
});
