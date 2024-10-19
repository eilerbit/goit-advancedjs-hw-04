import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const galleryElement = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const loadingElement = document.querySelector('.loading');
const gallery = new SimpleLightbox('.gallery a');

let query = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = event.target.elements[0].value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term!'
        });
        return;
    }

    galleryElement.innerHTML = '';
    loadMoreButton.classList.add('hidden');    
    currentPage = 1;
    fetchAndRenderImages();
});    

async function fetchAndRenderImages() {
    try {
        loadingElement.classList.remove('hidden');
        const data = await fetchImages(query, currentPage);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({
                title: 'No Results',
                message: 'Sorry, there are no images matching your search query. Please, try again!'
            });
            return;
        }

        renderImages(data.hits);
        gallery.refresh();

        if (currentPage * 15 < totalHits) {
            loadMoreButton.classList.remove('hidden');
        } else {
            iziToast.info({
                title: 'End of Results',
                message: "We're sorry, but you've reached the end of search results."
            });
            loadMoreButton.classList.add('hidden');
        }

        const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
                
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong, please try again later!'
        });
    } finally {
        loadingElement.classList.add('hidden');
    }
}

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    fetchAndRenderImages();
});