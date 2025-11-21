document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');

    // Exercise 2: Show all superheroes in alert when button clicked
    searchButton.addEventListener('click', function() {
        // Make AJAX request using Fetch API
        fetch('superheroes.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Show the list of superheroes in an alert
                alert(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error fetching superhero data');
            });
    });
});