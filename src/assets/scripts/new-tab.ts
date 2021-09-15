/**
 * @description Load url via document.location
 */
function loadUrlOnWebview(url: string): void {
    document.location.href = url;
}

document.addEventListener('DOMContentLoaded', (event) => {
    // ––– B ––– SEARCH INPUT ––––––––––––––––––––––––––––––––––––––––––––––––

    const googleSearchInput = document.getElementById('googleSearchInput') as HTMLInputElement;
    const searchGoogleBtn = document.getElementById('searchGoogleBtn');
    const googleUrl = 'https://www.google.com/search?q=';

    searchGoogleBtn.addEventListener('click', () => {
        loadUrlOnWebview(`${googleUrl}${googleSearchInput.value}`);
    });

    // ––– E ––– SEARCH INPUT ––––––––––––––––––––––––––––––––––––––––––––––––

    // ––– B ––– LOAD SERVER INPUT –––––––––––––––––––––––––––––––––––––––––––

    const localServerInput = document.getElementById('localServerInput') as HTMLInputElement;
    const localServerBtn = document.getElementById('localServerBtn');

    localServerBtn.addEventListener('click', () => {
        loadUrlOnWebview(localServerInput.value);
    });

    // ––– E ––– LOAD SERVER INPUT –––––––––––––––––––––––––––––––––––––––––––
});
