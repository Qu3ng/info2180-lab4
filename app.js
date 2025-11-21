document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchQuery = document.getElementById('searchQuery');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', function() {
        // Get and sanitize input (basic sanitization)
        let query = searchQuery.value.trim();
        query = query.replace(/[<>]/g, ''); // Remove < and > characters
        
        // Build URL with query parameter exactly as specified
        let url = 'superheroes.php';
        if (query) {
            url += '?query=' + encodeURIComponent(query);
        }

        // Make AJAX request
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                
                // Display in result div (NOT alert)
                if (response === 'Superhero not found') {
                    resultDiv.innerHTML = 'SUPERHERO NOT FOUND';
                } else if (query) {
                    // For single superhero - split by | as shown in instructions
                    const parts = response.split('|');
                    if (parts.length >= 3) {
                        resultDiv.innerHTML = 
                            '<h3>' + parts[0] + '</h3>' +
                            '<h4>' + parts[1] + '</h4>' +
                            '<p>' + parts[2] + '</p>';
                    } else {
                        resultDiv.innerHTML = response;
                    }
                } else {
                    // For all superheroes - display as list
                    const heroes = response.split('\n').filter(h => h.trim());
                    let html = '<ul>';
                    heroes.forEach(hero => {
                        html += '<li>' + hero + '</li>';
                    });
                    html += '</ul>';
                    resultDiv.innerHTML = html;
                }
            }
        };
        
        xhr.open('GET', url, true);
        xhr.send();
    });
});