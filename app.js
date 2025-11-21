document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchQuery = document.getElementById('searchQuery');
    const resultDiv = document.getElementById('result');

    // Handle form submission (both button click AND enter key)
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });

    function performSearch() {
        const query = searchQuery.value.trim();
        
        // Sanitize input
        const sanitizedQuery = query.replace(/[<>]/g, '');
        
        // Build URL with query parameter
        let url = 'superheroes.php';
        if (sanitizedQuery) {
            url += '?query=' + encodeURIComponent(sanitizedQuery);
        }

        // Make AJAX request
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                
                // Display in result div
                if (response === 'Superhero not found') {
                    resultDiv.innerHTML = '<div class="error-message">SUPERHERO NOT FOUND</div>';
                } else if (sanitizedQuery) {
                    // For single superhero - EXACTLY as specified in PDF
                    // Assuming PHP returns: Alias|Name|Biography
                    const parts = response.split('|');
                    if (parts.length >= 3) {
                        resultDiv.innerHTML = 
                            '<h3 class="superhero-alias">' + parts[0] + '</h3>' +
                            '<h4 class="superhero-name">' + parts[1] + '</h4>' +
                            '<p class="superhero-bio">' + parts[2] + '</p>';
                    } else {
                        // Fallback if format is different
                        resultDiv.innerHTML = response;
                    }
                } else {
                    // For all superheroes - display as list
                    const heroes = response.split('\n').filter(h => h.trim());
                    let html = '<ul>';
                    heroes.forEach(hero => {
                        if (hero.trim()) {
                            html += '<li>' + hero.trim() + '</li>';
                        }
                    });
                    html += '</ul>';
                    resultDiv.innerHTML = html;
                }
            }
        };
        
        xhr.open('GET', url, true);
        xhr.send();
    }
});