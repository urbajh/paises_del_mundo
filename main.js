const countriesList = document.querySelector('#countries-list');

const fragment = document.createDocumentFragment();

let countries = []

const getCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    countries = await response.json()
}

const createCountriesList = async()=>{
    for(let country of countries){
        const divCountry = document.createElement('DIV');
        const {translations, capital,region,flags, languages, borders, currencies} = country;
        let totalLanguages ='';
        for(language in languages){
        totalLanguages+=`<li>${languages[language]}</li>`;
        }
        let totalBorders ='';
        if(borders){
            for(let border of borders){
                const findedCountry = countries.find(e=>e.cca3 === border);
                totalBorders+= `<li>${findedCountry.translations.spa.common}</li>`;
            }
        }
        let totalCurrencies ='';
        if(currencies){
            console.log(currencies)
            for(let currency in currencies){
                totalCurrencies+=`<li class='country__currency'>Nombre: ${(currencies[currency].name)?currencies[currency].name:'N/A'}, Simbolo: ${(currencies[currency].symbol)?currencies[currency].symbol:'N/A'}</li>`
            }
        }
        
        divCountry.innerHTML= `
        <div>
            <img src=${flags.png} alt='flag'></img> 
        </div>
            <p> <b>Nombre:</b> ${translations.spa.common}</p> 
            <p> <b>Nombre Oficial:</b> ${translations.spa.official} </p>
            <p> <b>Capital:</b> ${capital}</p>
            <p> <b>Region:</b> ${region}</p>
            <p><b>Lenguajes:</b></p>
            <ul>
                ${totalLanguages}
            </ul>
            <p><b>Paises Limitrofes:</b></p>
            <ul>
                ${totalBorders}
            </ul>
            <p><b>Moneda:</b></p>
            <ul>
                ${totalCurrencies}
            </ul>
        `
        divCountry.classList.add("countries__info-country");

        fragment.appendChild(divCountry);
    }
    countriesList.appendChild(fragment);
}

getCountries().then(()=>createCountriesList())

