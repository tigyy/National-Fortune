document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            country: document.getElementById('country').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        fetch('http://localhost:3001/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
                alert('Thank you for contacting us!');
                form.reset();
            } else {
                return res.json().then(data => {
                    throw new Error(data.error || 'Send failed');
                });
            }
        })
        .catch(err => {
            alert('Error: ' + err.message);
        });
    });
});