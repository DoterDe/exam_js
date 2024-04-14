document.addEventListener('DOMContentLoaded', (event) => {
    const carousel = document.getElementById('carousel');
        let index = 0;

        fetch(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=10`)
            .then((response) => response.json())
            .then((data) => {
                data.data.forEach(anime => {
                    const poster = document.createElement('img');
                    poster.src = anime.attributes.posterImage.original;
                    poster.classList.add('poster1');
                    carousel.append(poster);
                });

                const images = carousel.getElementsByTagName('img');

                function updateCarousel() {
                    for (let i = 0; i < images.length; i++) {
                        images[i].style.transform = `translateX(${-100 * index}%)`;
                    }
                }

                setInterval(() => {
                    index = (index + 1) % images.length;
                    updateCarousel();
                }, 2000);
            });

});

fetch('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0')
    .then((response) => response.json())
    .then((data) => {
        data = data.data;
        console.log(data.data);
        const pro = document.querySelector('.products');
        pro.innerHTML = '';
        const layout = document.querySelector('.layout');
        layout.innerHTML = '';
        const search = document.querySelector('.search');
        search.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            const pro = document.querySelector('.products');
            const poster = document.createElement('img');
            poster.src = data[i].attributes.posterImage.original;
            poster.classList.add('poster');
        
            const button = document.createElement('button');
            button.classList.add('product');
            button.innerHTML = `Name: ${data[i].attributes.canonicalTitle} <br> Age: ${data[i].attributes.ageRatingGuide} `;
            button.dataset.title = data[i].attributes.canonicalTitle;
            button.append(poster);
        
            pro.append(button);
        }
    });



document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.reg').addEventListener('click', function(event) {
        const userData = localStorage.getItem('userData');
        if (userData) {
            alert('User is registered.');
            window.location.href = 'examen_js1.html'
            localStorage.clear()
            

        } else {
            console.log('User is not registered.');
            createRegistrationForm();
        }
    });

    function createRegistrationForm() {
        const registrationContainer = document.getElementById('registrationContainer');

        const pro = document.querySelector('.products');
        pro.innerHTML = '';
        const layout = document.querySelector('.layout');
        layout.innerHTML = '';
        const search = document.querySelector('.search');
        search.innerHTML = '';
        const carousel = document.querySelector('.cor');
        carousel.innerHTML = '';
        registrationContainer.classList.add('registrationContainer1')
        const form = document.createElement('form');
        form.id = 'registrationForm';
        form.classList.add('registration-form');


        const register = document.createElement('h1')
        register.innerHTML = 'REGISTER'
        form.append(register)

        const usernameLabel = document.createElement('label');
        usernameLabel.htmlFor = 'username';
        usernameLabel.textContent = 'Username:';
        form.append(usernameLabel);

        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'username';
        usernameInput.name = 'username';
        usernameInput.required = true;
        form.append(usernameInput);

        form.append(document.createElement('br'));

        const emailLabel = document.createElement('label');
        emailLabel.htmlFor = 'email';
        emailLabel.textContent = 'Email:';
        form.append(emailLabel);

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.id = 'email';
        emailInput.name = 'email';
        emailInput.required = true;
        form.append(emailInput);

        form.append(document.createElement('br'));

        const passwordLabel = document.createElement('label');
        passwordLabel.htmlFor = 'password';
        passwordLabel.textContent = 'Password:';
        form.append(passwordLabel);

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        passwordInput.name = 'password';
        passwordInput.required = true;
        form.append(passwordInput);

        form.append(document.createElement('br'));
        form.append(document.createElement('br'));

        const submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Register';
        form.append(submitButton);

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!username || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            const userData = {
                username: username,
                email: email,
                password: password
            };
            localStorage.setItem('userData', JSON.stringify(userData));

            alert('Registration successful!');
            window.location.href = 'examen_js1.html'
            location.replace('examen_js1.html');
        });

        registrationContainer.append(form);
    }
})

// if (myStorage === 10){
//     pass
// }
// else{
    
    
// }
