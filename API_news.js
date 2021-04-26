

function onJsonNews(json) {

    console.log(json);


    const result = json.news;
    let num_result = result.length;
    if(num_result > 3) num_result = 3;

    for(let i = 0; i < num_result; i++){
        const data_article = result[i];
        const art_title = data_article.title;
        const art_img = data_article.image;       
        const art_des = data_article.description;
        const art_url = data_article.url;
        

        const article = document.createElement("div");
        article.classList.add("article");

        const img = document.createElement("img");
        img.src = art_img;
        const title = document.createElement("h3");
        title.textContent = art_title;
        const content = document.createElement("p");
        content.textContent = art_des;
        const url = document.createElement("a")
        url.textContent = 'Leggi tutto';
        url.href = art_url;

        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(content);
        article.appendChild(url);
        

        document.querySelector("#news .articoli").appendChild(article);
    }
}

function onResponse(resp){
    console.log(resp);
    return resp.json();
}

const apikey_news = 'xJSoxcevRm202A2XvQVeFZc9ASRczGRzcU_WdrZiORH1k_6A';

const endpoint_news = 'https://api.currentsapi.services/v1/latest-news?' 
const request = endpoint_news   + 'category=auto&'+'keywords=veicoli&' + 'language=it&' +'apiKey=' + apikey_news;


fetch(request).then(onResponse).then(onJsonNews)

