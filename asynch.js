//Api key
const auth = "563492ad6f91700001000001acb0009be8c444479e5f3212c3cc3b64";

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

//Event Listener
searchInput.addEventListener('input' ,updateInput);

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

//Functions
function updateInput(e){
    searchValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch( url, 
        {
            method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: auth
                }
        }
    );

    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach( photo =>{
        const gallergyImg = document.createElement('div');
        gallergyImg.classList.add('gallery-img');
        gallergyImg.innerHTML = `
            <div class='gallery-info'>
                <p>${photo.photographer}</p>
                <a href=${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}></img> 
        `;

        gallery.appendChild(gallergyImg);
    });
}

async function cureatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function searchPhotos(query){
    clear();
    let fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

function clear(){
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);
}


cureatedPhotos();
//"https://api.pexels.com/v1/curated?per_page=1"