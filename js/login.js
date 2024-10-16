// Select the form element
const form = document.getElementById('formlogin');

// Add event listener to form submit
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Send POST request to API
        const response = await axios.post('https://asia-southeast2-gis-project-401902.cloudfunctions.net/backend-ai/login', {
            username,
            password
        });

        // Handle successful response
        const { status, token, message } = response.data;
        if (status) {
            // Set cookie with token
            document.cookie = `user_login=${token}; path=/`;

            // Set login flag in local storage
            localStorage.setItem('isLoggedIn', 'true');

            // Show SweetAlert success message with OK button
            await Swal.fire({
                icon: 'success',
                title: 'Login Berhasil!',
                text: message,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'chat.html';
                }
            });
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Login Gagal!',
                text: message
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Terjadi kesalahan saat login. Silakan coba lagi nanti.'
        });
    }
});

// login.js

async function getUserData(username) {
    const response = await fetch(`https://asia-southeast2-gis-project-401902.cloudfunctions.net/backend-ai/getuser?username=${username}`);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Lakukan logika login di sini
        // Jika login berhasil, lanjutkan mengambil data pengguna dan menyimpan username di localStorage
        
        try {
            const userData = await getUserData(username);
            localStorage.setItem('username', userData.username);
            window.location.href = 'chat.html'; // Redirect ke chat.html setelah login berhasil
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    });
});


// Show Password Function
const showPassword = document.getElementById('showPassword');
const passwordField = document.getElementById('password');
showPassword.addEventListener('change', function () {
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});