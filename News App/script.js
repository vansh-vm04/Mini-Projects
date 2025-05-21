const apikey = "b0db1f6430e94dea8311f6afad20af17";
const url = "https://newsapi.org/v2/everything?";
const search = document.getElementById("search-input");

async function getdata() {
  let keyword = search.value.trim();
  try {
    let response = await fetch(
      url +
        `q=${keyword}&` +
        "sortBy=popularity&" +
        `pageSize=99&` +
        `apiKey=${apikey}`
    );
    if(response.status==404 || response.status==400 || response.status==426){
      let msg = document.getElementById("welcome-msg");
      msg.innerHTML="Some Error Occured, Search Again!";
    }
    else{
    let data = await response.json();
    console.log(data);
    return data.articles;}
  } catch (error) {
    let msg = document.getElementById("welcome-msg");
      msg.innerHTML="Some Error Occured, Search Again!";
  }
}

async function getcards(articles) {
  let container = document.getElementById("card-container");
  container.innerHTML = "";
  articles.forEach((a) => {
    let card = document.createElement("div");
    card.id = "news-card";
    let image = document.createElement("img");
    image.src = a.urlToImage;
    image.alt = a.title;
    let title = document.createElement("h2");
    title.innerText = a.title;
    let para = document.createElement("p");
    const desc =
      a.description.length > 120
        ? a.description.slice(0, 150) + "..."
        : a.description;
    para.innerText = desc;
    let container = document.getElementById("card-container");
    container.appendChild(card);
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(para);
    card.addEventListener("click", () => {
      window.open(a.url, "_blank");
    });
    if (a.urlToImage == null) {
      container.lastElementChild.remove();
    }
  });
}

async function printcards() {
  let keyword = search.value.trim();
  let msg = document.getElementById("welcome-msg");
  if (keyword == "") {
    msg.innerHTML = "Enter Something To Search";
  } else {
    try {
      let articles = await getdata();
      getcards(articles);
    } catch (error) {
      console.error("Error occured", error);
    }
  }
}

//BIND WITH ENTER
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    printcards();
  }
});
