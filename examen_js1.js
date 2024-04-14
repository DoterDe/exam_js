document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.reg').addEventListener('click', function(event) {
        const userData = localStorage.getItem('userData');
        if (userData) {
            alert('User is registered.');
            const nav = document.querySelector('nav')
            const ext = document.createElement('button')
            ext.innerHTML = 'Exte on acount ?'
            ext.addEventListener('click', (event)=>{
                localStorage.clear()
                window.location.href = 'examen_js.html'
            })
            nav.append(ext)

        } else {
            console.log('User is not registered.');
            window.location.href = 'examen_js.html'
            createRegistrationForm();
        }
    });
})


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

document.addEventListener('DOMContentLoaded', (event) => {
    const carousel1 = document.getElementById('carousel1');
        let index = 0;

        fetch(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=100`)
            .then((response) => response.json())
            .then((data) => {
                data.data.forEach(anime => {
                    const poster = document.createElement('img');
                    poster.src = anime.attributes.posterImage.original;
                    poster.classList.add('poster1');
                    carousel1.append(poster);
                });
            
                const images = carousel1.getElementsByTagName('img');
            
                function updateCarousel1() {
                    for (let i = 0; i < images.length; i++) {
                        images[i].style.transform = `translateX(${-100 * index}%)`;
                    }
                }
            
                setInterval(() => {
                    index = (index + 1) % images.length;
                    updateCarousel1();
                }, 2000);
            });
        
});




function display_anime(data) {
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
        poster.classList.add('poster_anime');
        const div = document.createElement('div');
        div.classList.add('anime_des');
        div.innerHTML = `
            Name: ${data[i].attributes.canonicalTitle} <br> 
            Original Title : ${data[i].attributes.titles.ja_jp} <br> 
            Age: ${data[i].attributes.ageRatingGuide} <br>
            Episodes : ${data[i].attributes.episodeLength} <br>
            Start-Date: ${data[i].attributes.startDate} <br> 
            End-Date: ${data[i].attributes.endDate} <br>
        `
        const des = document.createElement('div');
        des.classList.add('anime_des');
        des.innerHTML = `
            Description : ${data[i].attributes.description}
        `;
        const buy = document.createElement('button')
        buy.classList.add('button1')
        buy.innerHTML = `
            BUY price : ${data[i].attributes.popularityRank} $
        `
        buy.addEventListener('click', function(event) {
            alert('Товар приобретен и будет доставлен вам в ближайшее время');
        });
    
        div.append(poster);
        pro.append(div);
        pro.append(des);
        pro.append(buy);
    }
}

function display_anime_list(data) {
    const pro = document.querySelector('.products');
    pro.innerHTML = '';

    if (data.length === 0) {
        const button = document.createElement('button');
        const layout = document.querySelector('.layout');
        layout.innerHTML = '';
        button.classList.add('product');
        button.innerHTML = 'Ничего не найдено по вашему запросу';
        pro.append(button);
        return;
    }

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
}

function fetch_data(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка запроса к API');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}


document.querySelector('.search-btn').addEventListener('click', function(event) {
    event.preventDefault();

    const searchText = document.querySelector('.search-txt').value;
    const selectedGenre = document.querySelector('select[name="select"]').value;
    const selectedDate = document.querySelector('select[name="Date"]').value;
    const layout = document.querySelector('.layout');
    layout.innerHTML = '';
    let apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${searchText}&page[limit]=20&page[offset]=0`;

    if (selectedGenre) {
        apiUrl += `&filter[categories]=${selectedGenre}`;
    }
    if (selectedDate) {
        apiUrl += `&filter[year]=${selectedDate}`;
    }

    fetch_data(apiUrl)
        .then(data => {
            display_anime_list(data.data);
        });
});


document.querySelectorAll('.numbers').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const num = this.textContent * 20;
        const apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${num}`;
    
        fetch_data(apiUrl)
            .then(data => {
                display_anime_list(data.data);
            });
    });
});

document.querySelector('.products').addEventListener('click', function(event) {
    if (event.target.classList.contains('product')) {
        const nameAnime = event.target.dataset.title;
        const apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${nameAnime}&page[limit]=1&page[offset]=0`;
    
        fetch_data(apiUrl)
            .then(data => {
                display_anime(data.data);
            });
    }
});

const Url = 'https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0';
fetch_data(Url)
    .then(data => {
        display_anime_list(data.data);
        console.log(data.data);
    });