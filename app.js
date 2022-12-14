

const loadCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => setCategory(data.data.news_category))
        .catch(error => console.log(error));
}
const setCategory = (newsdata) => {

    const categoryContainer = document.getElementById('category-container');
    const unique = [];
    newsdata.forEach(news => {

        if (unique.indexOf((news.category_name) === -1)) {

            unique.push(news.category_name);

            const div = document.createElement('div');
            div.style.cursor = 'pointer';
            div.innerHTML = `<li  onclick="loadNews('${news.category_id}')" class="text-decoration-none" >${news.category_name}</li>`;
            categoryContainer.appendChild(div);
        }

    })
}



const loadNews = category_id => {
    //start loader
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error));
}

const displayNews = (data) => {
    //total news found 
    const newsItemCount = document.getElementById('count');
    const noNews = document.getElementById('no-count');
    if (data.length === 0) {
        noNews.classList.remove('d-none');
        newsItemCount.classList.add('d-none');
    }
    else {
        noNews.classList.add('d-none');
        newsItemCount.classList.remove('d-none');
        newsItemCount.innerText = `${data.length} News Found`;
    }
    const cardDiv = document.getElementById('card-container');
    cardDiv.innerText = "";

    //sort data by views
    let sort = data.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    sort.forEach(news => {
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="col">
        <div class="card">
            <img src="${news.image_url}" class="card-img-top" alt="...">
                <div class="card-body custom-height">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.length > 200 ? news.details.slice(0, 200) + '...' : news.details}</p>

                </div>
                <div class="card-footer footer-height">
                <p class="card-text">
                <div class="d-flex justify-content-evenly">
                <div>
                     <img class="img-fluid custom-img" src="${news.author.img}">
                     <small class="text-muted">${news.author.name ? news.author.name : "No Author"}</small>
                </div>
                <div class="mt-2">
                    <i class="fa-solid fa-eye ms-4"></i> ${news.total_view ? news.total_view : "No views"}
                    <a class="ms-4" href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadDetail('${news._id}')"><i class="fa-solid fa-arrow-right-long"></i></a>
                </div>
                </div>
                </p>


                </div>
        </div>
    </div>
`;
        cardDiv.appendChild(div);
    })
    //end loader
    toggleSpinner(false);
}

const loadDetail = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
        .catch(error => console.log(error));
}

const showDetails = (data) => {

    data.forEach(detail => {
        const modalTitle = document.getElementById('staticBackdropLabel');
        modalTitle.innerText = `${detail.title}`;

        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = `<img class="img-fluid w-100 mb-4" src="${detail.thumbnail_url}">
                 <p>${detail.details}</p>`;

    })

}

const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}


loadCategory();

