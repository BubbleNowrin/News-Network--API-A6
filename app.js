// Fetch category items

// const loadCategory = async() => {
//     const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
//     const data = await response.json();
//     return data;
// }

const loadCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => setCategory(data.data.news_category))
}
const setCategory = (newsdata) => {
    // console.log(newsdata);
    // const data = loadCategory();
    // const category = data.data.news_category;
    // console.log(category);
    const categoryContainer = document.getElementById('category-container');
    const unique = [];
    for (const news of newsdata) {
        // console.log(news.category_id);
        if (unique.indexOf((news.category_name) === -1)) {

            unique.push(news.category_name);
            // console.log(news.category_id);
            const div = document.createElement('div');
            div.innerHTML = `<li class="pointer" onclick="loadNews('${news.category_id}')" class="text-decoration-none" >${news.category_name}</li>`;
            categoryContainer.appendChild(div);
        }

    }
}

// const setCategory = async() => {
//     const data = await loadCategory();
//     const category = data.data.news_category;
//     // console.log(category);
//     const categoryContainer = document.getElementById('category-container');
//     const unique = [];
//     for (const news of category) {
//         // console.log(news.category_id);
//         if (unique.indexOf((news.category_name) === -1)) {

//             unique.push(news.category_name);
//             // console.log(news.category_id);
//             const li = document.createElement('li');
//             li.innerHTML = `<a href="" onclick="loadNews('${news.category_id}')" class="text-decoration-none" >${news.category_name}</a>`;
//             categoryContainer.appendChild(li);
//         }

//     }
// }
// const loadNews = async (category_id) => {
//     // console.log('clicked');
//     const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
//     console.log(url);
//     const res = await fetch(url);
//     const data = await res.json();
//     return data;
// }

const loadNews = category_id => {
    console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))

}

const displayNews = (data) => {
    // console.log(data.data);
    // const data = loadNews();
    // const newsData = data.data;

    const cardDiv = document.getElementById('card-container');
    cardDiv.innerText = "";
    for (const news of data) {
        // console.log(news);
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
                <p class="card-text"> <img class="img-fluid custom-img" src="${news.author.img}"><small class="text-muted ms-2">${news.author.name ? news.author.name : "No Author Found"} <i class="fa-solid fa-eye ms-4"> ${news.total_view ? news.total_view : "No views"}</i><a class="ms-4" href="">Details<i class="fa-solid fa-arrow-right-long "></i></a></small></p>


                </div>
        </div>
    </div>
`;
        cardDiv.appendChild(div);
    }
}


// displayNews();
// setCategory();
loadCategory();

