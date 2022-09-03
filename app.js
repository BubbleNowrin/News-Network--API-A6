

const loadCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => setCategory(data.data.news_category))
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
    // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))

}

const displayNews = (data) => {


    const cardDiv = document.getElementById('card-container');
    cardDiv.innerText = "";
    data.forEach(news => {

        const div = document.createElement('div');
        div.innerHTML = `
    <div class="col">
        <div class="card h-100">
            <img src="${news.image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.length > 200 ? news.details.slice(0, 200) + '...' : news.details}</p>

                </div>
                <div class="card-footer">
                <p class="card-text"> <img class="img-fluid custom-img" src="${news.author.img}"><small class="text-muted ms-2">${news.author.name ? news.author.name : "No Author Found"} <i class="fa-solid fa-eye ms-4"> ${news.total_view ? news.total_view : "No views"}</i><a class="ms-4" href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadDetail('${news._id}')">Details<i class="fa-solid fa-arrow-right-long "></i></a></small></p>


                </div>
        </div>
    </div>
`;
        cardDiv.appendChild(div);
    })
}

const loadDetail = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
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


loadCategory();

