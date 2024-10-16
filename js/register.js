// Select the form element
const form = document.getElementById('formRegister');

// Add event listener to form submit
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get username, email, and password values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Send POST request to API
        const response = await axios.post('https://asia-southeast2-gis-project-401902.cloudfunctions.net/backend-ai/registers', {
            username,
            email,
            password
        });

        // Handle successful response
        const { status, message } = response.data;
        if (status) {
            // Show SweetAlert success message with OK button
            await Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil!',
                text: message,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'login.html';
                }
            });
        } else {
            // Show SweetAlert error message
            await Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal!',
                text: message
            });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        // Show SweetAlert error message
        await Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Terjadi kesalahan saat registrasi. Silakan coba lagi nanti.'
        });
    }
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