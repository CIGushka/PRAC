document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('keyword')?.toLowerCase();
    const resultsContainer = document.getElementById('results');

    if (!keyword) {
        resultsContainer.textContent = 'Ключевое слово не указано';
        return;
    }

    const filteredArticles = articles.filter(article => 
        article.keywords.some(k => k.toLowerCase() === keyword)
    );
    
    if (filteredArticles.length > 0) {
        const list = document.createElement('ul');
        filteredArticles.forEach(article => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            console.log (article);
            link.href = article.url;
            link.textContent = article.title;
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
        resultsContainer.appendChild(list);
    } else {
        resultsContainer.textContent = 'Статей по данному запросу не найдено';
    }
});
