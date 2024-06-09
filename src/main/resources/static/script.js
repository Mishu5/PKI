$(document).ready(function() {
    // Sign In Form Submission
    $('#signin-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
        var formData = {
            "password": document.getElementById("signin-password").value,
            "email": document.getElementById("signin-email").value
        }

        // AJAX request to sign in endpoint
        $.ajax({
            url: 'auth/signin',
            method: 'POST',
            Accept : "application/json",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle success response
                console.log('Sign in successful:', response);
                alert("Logged In");
                document.cookie = "jwt=" + response;
                console.log(document.cookie);
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error('Sign in failed:', error);
                alert(error);
            }
        });
    });

    // Sign Up Form Submission
    $('#signup-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
        var formData = {
            "name": document.getElementById("signup-name").value,
            "password": document.getElementById("signup-password").value,
            "email": document.getElementById("signup-email").value
        }
        // AJAX request to sign up endpoint
        $.ajax({
            url: '/auth/signup',
            method: 'POST',
            Accept : "application/json",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle success response
                console.log('Sign up successful:', response);
                alert("Created")
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error('Sign up failed:', error);
                alert(error);
            }
        });
    });
});

function deleteJwtTokenFromCookie(){
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}