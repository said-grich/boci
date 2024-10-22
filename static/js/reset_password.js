document.getElementById("resetPasswordForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from submitting the normal way

    // Get the email input value
    const email = document.getElementById("email").value;
    
    // Prepare data for the API request
    const data = JSON.stringify({
        email: email
    });

    // Make an AJAX request to the password reset API
    fetch('/api/accounts/password-reset/', { // Adjust the URL based on your endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => {
        // Handle successful response
        if (response.ok) {
            return response.json(); // Parse the JSON response
        } else {
            throw new Error('Failed to reset password'); // Handle error response
        }
    })
    .then(result => {
        // If the request was successful, redirect to the index.html page
        if (result.message) {
            window.location.href = "/logine/"; // Redirect to index.html after success
        }
    })
    .catch(error => {
        // Handle errors and display them on the Forget Password page
        document.getElementById("message").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});
