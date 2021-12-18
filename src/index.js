import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

export const refs = {
    input: document.getElementById("search-box"),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info")
}

refs.input.addEventListener("input", debounce(event => {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    if(refs.input.value.trim() == ""){
        return;
    }
    fetchCountries(refs.input.value);
}, DEBOUNCE_DELAY));