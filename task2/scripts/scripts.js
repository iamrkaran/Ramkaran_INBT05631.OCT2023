const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const loadMoreBtn = document.querySelector(".gallery .load-more");
const middle = document.querySelector(".middle");
const downloadImgBtn = middle.querySelector(".uil-import");
const closeImgBtn = middle.querySelector(".close-icon");


const apiKey = "YfzKJ7r1f8OGvD8nm8SuCGmREUru6GnwAJUtmxezU4GWPDq5pDdDaHdJ";
const perPage = 12;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgUrl) => {
    
    fetch(imgUrl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
}

const showLightbox = (name, img) => {
    
    middle.querySelector("img").src = img;
    middle.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    middle.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideMiddlebox = () => {
    
    middle.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) => {
    
    imageWrapper.innerHTML += images.map(img =>
        `<li class="card">
            <img onclick="showLightbox('${img.photographer}', '${img.src.large2x}')" src="${img.src.large2x}" alt="img">
            <div class="details">
                <button onclick="downloadImg('${img.src.large2x}');">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    ).join("");
}

const getImages = (apiURL) => {
   
    searchInput.blur();
    loadMoreBtn.innerText = "Discovering...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Discover More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
}

const loadMoreImages = () => {
    currentPage++; 
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
    getImages(apiUrl);
}

const loadSearchImages = (e) => {
    
    if (e.target.value === "") return searchTerm = null;
    
    if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideMiddlebox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));