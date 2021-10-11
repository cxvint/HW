const apiKey = 'f18e2f999f5a8b9182af0a3e3ed37d86';
const main = document.querySelector('.main');
const input = document.querySelector('.form__input');
const incorrectCity = document.querySelector('.form__incorrect-city');
const select = document.querySelector('.form__select');
const weatherTitle = document.querySelector('.weather__title');
const weatherImg = document.querySelector('.weather__img');
const weatherTemp = document.querySelector('.weather__temp');

function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('readystatechange', (e) => {
    if (e.target.readyState !== 4) {
      return;
    }
    if (xhr.status != 200) {
      console.log(`${xhr.status} + ': ' + ${xhr.statusText}`);
      return;
    }

    const responseText = JSON.parse(e.target.responseText);

    callback(responseText);
  });

  xhr.send();
}

request('by-cities.json', (data) => {
  let сity;

  input.addEventListener('input', () => {
    сity = input.value[0].toUpperCase() + input.value.slice(1);

    let newArrayCities;

    function getArrCities(arrCities) {
      newArrayCities = [];

      for (i = 0; i < arrCities.length; i++) {
        if (сity === arrCities[i].name.substring(0, сity.length)) {
          newArrayCities.push(arrCities[i].name);
        }
      }
    }
    getArrCities(data);
    incorrectCity.textContent = '';
    select.textContent = '';

    if (newArrayCities.length === 0) {
      incorrectCity.textContent = '';
      p = document.createElement('p');
      p.classList.add('cities');
      p.textContent = 'Такого города не существует';
      incorrectCity.appendChild(p);
    }

    for (let i = 0; i < newArrayCities.length; i++) {
      div = document.createElement('div');
      div.classList.add('cities');
      div.textContent = `${newArrayCities[i]}`;
      select.appendChild(div);
    }
  });

  select.addEventListener('mouseover', (e) => {
    let target = e.target;
    target.classList.add('new-cities');
  });

  select.addEventListener('mouseout', (e) => {
    target = e.target;
    target.classList.remove('new-cities');
  });

  select.addEventListener('click', (e) => {
    target = e.target;
    input.value = target.textContent;
    nameCity = input.value;
    getWeather();
    select.textContent = ``;
  });

  main.addEventListener('click', () => {
    select.textContent = ``;
  });
});

input.addEventListener('focus', () => {
  weatherTitle.textContent = '';
  weatherImg.src = '';
  weatherTemp.textContent = '';
  input.value = '';
});

function getWeather() {
  request(
    `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${apiKey}`,
    (data) => {
      weatherTitle.textContent = data.name;

      if (data.weather[0].main === 'Clear') {
        if (data.weather[0].icon.includes('d')) {
          weatherImg.src = 'images/sun.png';
        } else {
          weatherImg.src = 'images/clear.png';
        }
      }

      weatherImg.src = 'images/' + data.weather[0].main.toLowerCase() + '.png';

      let temp = Math.round(data.main.temp - 273);
      if (temp > 0) {
        weatherTemp.textContent = '+' + temp;
      }
      if (temp < 0) {
        weatherTemp.textContent = '-' + temp;
      }
      if ((temp = 0)) {
        weatherTemp.textContent = temp;
      }
      return;
    }
  );
}
