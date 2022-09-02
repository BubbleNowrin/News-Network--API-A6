// Fetch category items

const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}

const setCategory = async () => {
    const data = await loadCategory();
    const category = data.data.news_category;
    console.log(category);
    const categoryContainer = document.getElementById('category-container');
    const unique = [];
    for (const news of category) {
        // console.log(news.category_name);
        if (unique.indexOf((news.category_name) === -1)) {

            unique.push(news.category_name);

            const li = document.createElement('li');
            li.innerHTML = `<a href="">${news.category_name}</a>`;
            categoryContainer.appendChild(li);

        }
    }
}


setCategory();