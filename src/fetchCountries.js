import Notiflix from 'notiflix';
import { refs } from "./index";

export default fetchCountries;

function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok){
            Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        return response.json();
    })
    .then(country => {
        if(country.length > 10){
            refs.countryList.innerHTML = "";
            refs.countryInfo.innerHTML = "";
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        } else if(country.length === 1){
            showCountryInfo(country);
        } else if(country.length >= 1 && country.length <= 10){
            showCountryList(country);
        }
        else {
            refs.countryList.innerHTML = "";
            refs.countryInfo.innerHTML = "";
        }
    })
    .catch(console.log);
}

function showCountryInfo(country){
    country.map(item => {
        refs.countryInfo.innerHTML =
        `<img src=${item.flags.png} width=60/><span style="font-size: 40px">${item.name.official}</span></b>
        <p><b>Capital: </b> ${item.capital}</p>
        <p><b>Population: </b>${item.population}</p> 
        <p><b>Languages: </b> ${Object.values(item.languages)}</p>`
    });
}

function showCountryList(country){
    const markup = country.map((item) => { 

        return `<li><img src=${item.flags.svg} width=60/>
         <span style="font-size:40px">${item.name.common}</span></li>`
  }).join("");

  refs.countryList.insertAdjacentHTML("beforeend", markup);
}
