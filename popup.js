const settingsLimit = document.querySelector('.js-settings__limit');
const POPUP = document.querySelector('.js-popup');
const closeButton = document.querySelector('.js-close');
const setInputNode = document.querySelector('.js-popup-input');
const newLimitBtnNode = document.querySelector('.js-popup-btn');
const bodyScroll = document.querySelector('body');

newLimitBtnNode.addEventListener('click', function() {
    const newLimit = setInputNode.value;
    if (!newLimit) {
        return
    };
    
    limitNode.innerText = newLimit;
    
    LIMIT = newLimit;
    localStorage.setItem('LIMIT', newLimit);

    POPUP.classList.remove('popup-open');

    render();
})

settingsLimit.addEventListener('click', function() {
    POPUP.classList.add('popup-open');
    bodyScroll.classList.add('body-fixed');
})

closeButton.addEventListener('click', function() {
    POPUP.classList.remove('popup-open');
    bodyScroll.classList.remove('body-fixed');
})