export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => `
    <a href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}">
    </a>`).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
