document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchQuery = document.getElementById('searchQuery');
    const resultDiv = document.getElementById('result');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });

    function performSearch() {
        const query = searchQuery.value.trim();
        const sanitizedQuery = query.replace(/[<>]/g, '');
        
        let url = 'superheroes.php';
        if (sanitizedQuery) {
            url += '?query=' + encodeURIComponent(sanitizedQuery);
        }

        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                
                // DEBUG: Show exactly what we're getting
                console.log('Raw response:', response);
                alert('Debug - Response: ' + response); // This will show exactly what PHP returns
                
                // For now, just display whatever PHP returns
                resultDiv.innerHTML = response;
            }
        };
        
        xhr.open('GET', url, true);
        xhr.send();
    }
});