// Function to fetch user profile data
function fetchUserProfile() {
    $.ajax({
        url: '/api/accounts/profile/', // The URL of your profile endpoint
        type: 'GET',
        beforeSend: function(xhr) {
            setAuthHeaders(xhr); 
        },
        success: function(data) {
            // Update HTML elements with user data
            $('#username').text(data.username);
            $('#email').text(data.email);
            
            // Update profile image if available
            if (data.profile_picture) {
                $('#profileImage').attr('src', data.profile_picture);
            }
        },
        error: function(xhr, status, error) {
            console.error('There was a problem with the AJAX request:', error);
        }
    });
}

// Function to preview the selected image
function previewImage(event) {
    const image = document.getElementById('profileImage');
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader(); // Create a FileReader object

        reader.onload = function(e) {
            image.src = e.target.result; // Set the img src to the loaded data
        };

        reader.readAsDataURL(file); // Read the file as Data URL
    } else {
        // If no file is selected, revert to default placeholder
        image.src = 'https://via.placeholder.com/100';
    }
}

// Function to upload the profile picture
function uploadProfilePicture() {
    const imageUpload = document.getElementById('imageUpload').files[0];
    const formData = new FormData();
    formData.append('profile_picture', imageUpload);

    fetch('/api/accounts/profile/update/', {
        method: 'PUT', // Use PATCH if you want partial updates
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Profile picture updated successfully!');
        fetchUserProfile(); // Refresh profile data
    })
    .catch(error => {
        console.error('There was a problem with the upload operation:', error);
    });
}

// Event listener for the upload button
document.getElementById('savePictureButton').addEventListener('click', uploadProfilePicture);

// Call the function to fetch user profile data when the document is ready
$(document).ready(function() {
    fetchUserProfile(); // Fetch user profile when the document is ready
});







// Function to fetch user profile data
/*function previewImage(event) {
    const image = document.getElementById('profileImage');
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            image.src = e.target.result; // Set the src of the image to the selected file's data URL
        };
        
        reader.readAsDataURL(file); // Read the file as a data URL
    }
}

function fetchUserProfile() {
    $.ajax({
        url: '/api/accounts/profile/', // The URL of your profile endpoint
        type: 'GET',
        beforeSend: function(xhr) {
            setAuthHeaders(xhr); 
          },
        success: function(data) {
            // Update HTML elements with user data
            $('#username').text(data.username);
            $('#email').text(data.email);
            
            // Update profile image if available
            if (data.profile_picture) {
                $('#profileImage').attr('src', data.profile_picture);
            }
        },
        error: function(xhr, status, error) {
            console.error('There was a problem with the AJAX request:', error);
        }
    });
}
function previewImage(event) {
    const image = document.getElementById('profileImage');
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            image.src = e.target.result; // Set the src of the image to the selected file's data URL
        };
        
        reader.readAsDataURL(file); // Read the file as a data URL
    }
}

*/

// Call the function on page load
// document.addEventListener('DOMContentLoaded', fetchUserProfile);
// document.getElementById('savePictureButton').addEventListener('click', function () {
//     const imageUpload = document.getElementById('imageUpload').files[0];
//     const formData = new FormData();
//     formData.append('profile_picture', imageUpload);

//     fetch('/api/accounts/profile/update/', {
//         method: 'PUT', // Use PATCH if you want partial updates
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem('token'),
//         },
//         body: formData
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         alert('Profile picture updated successfully!');
//         fetchUserProfile(); // Refresh profile data
//     })
//     .catch(error => {
//         console.error('There was a problem with the upload operation:', error);
//     });
// });



$(document).ready(function() {
    $('button[type="submit"]').on('click', function() {
        // Collecting the data from input fields
        const username = $('#usernameInput').val();
        const email = $('#emailInput').val();
        const password = $('#passwordInput').val();
        const confirmPassword = $('#confirmPasswordInput').val();

        // You can include additional validations here

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Create the data object to send
        const data = {
            username: username,
            email: email,
            password: password,
        };

        $.ajax({
            url: '/api/accounts/profile/update/', // Adjust the URL as necessary
            method: 'PUT',
            contentType: 'application/json', // Set content type to JSON
            beforeSend: function(xhr) {
                setAuthHeaders(xhr); // Assuming setAuthHeaders is defined elsewhere
            },
            data: JSON.stringify(data), // The request payload
            success: function(response) {
                console.log('Profile updated successfully:', response);
                fetchUserProfile()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('There was a problem with the AJAX operation:', textStatus, errorThrown);
            }
        });
    });
});


$(document).ready(function() {
    fetchUserProfile(); // Fetch user profile when the document is ready
});
