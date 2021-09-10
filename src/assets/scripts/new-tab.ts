/**
 * @description Load url via document.location
 */
function loadUrlOnWebview(url: string): void {
    document.location.href = url;
}

// ––– B ––– SEARCH INPUT ––––––––––––––––––––––––––––––––––––––––––––––––

const ecosiaSearchInput = document.getElementById('ecosiaSearchInput') as HTMLInputElement;
const searchEcosiaBtn = document.getElementById('search-ecosia-btn');
const ecosiaUrl = 'https://www.ecosia.org/search?q=';

searchEcosiaBtn.addEventListener('click', () => {
    loadUrlOnWebview(`${ecosiaUrl}${ecosiaSearchInput.value}`);
});

// ––– E ––– SEARCH INPUT ––––––––––––––––––––––––––––––––––––––––––––––––

// ––– B ––– LOAD SERVER INPUT –––––––––––––––––––––––––––––––––––––––––––

const localServerInput = document.getElementById('localServerInput') as HTMLInputElement;
const localServerBtn = document.getElementById('local-server-btn');

localServerBtn.addEventListener('click', () => {
    loadUrlOnWebview(localServerInput.value);
});

// ––– E ––– LOAD SERVER INPUT –––––––––––––––––––––––––––––––––––––––––––
