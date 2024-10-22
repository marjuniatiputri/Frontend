document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('https://asia-southeast2-sistemakreditasi.cloudfunctions.net/sistemakreditasi/login', {
            email: email,
            password: password
        });

        let message;

        // Check if the response contains the expected data
        if (response.data && response.data.status === 'success') {
            // Extract token and store in cookies
            const token = response.data.token;
            document.cookie = `token=${token}; path=/;`;

            // Success message with user info
            message = `Login successful! Welcome, ${response.data.data.email}. Your role is ${response.data.data.role}.`;

            // Show SweetAlert success message with OK button
            await Swal.fire({
                icon: 'success',
                title: 'Login Berhasil!',
                text: message,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to index.html
                    window.location.href = 'https://sistemakreditasi.github.io/dashboard/';
                }
            });
        } else {
            // Error message if login fails
            message = 'Login gagal. Silakan periksa kredensial Anda.';

            // Show SweetAlert error message
            await Swal.fire({
                icon: 'error',
                title: 'Login Gagal!',
                text: message
            });
        }
    } catch (error) {
        // Show SweetAlert error for other failures
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