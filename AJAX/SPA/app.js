function getNewPage(data) {
  const index = JSON.parse(data);
  title.textContent = index.title;
  subtitle.textContent = index.subtitle;
  text.textContent = index.body;
}

function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('readystatechange', function (e) {
    if (e.target.readyState !== 4) {
      return;
    }
    if (e.target.status !== 200) {
      console.log('Ошибка');
      return;
    }
    const responseText = e.target.responseText;

    callback(responseText);
  });
  xhr.send();
}

const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const text = document.querySelector('.text');
const link = document.querySelector('.link');
const link1 = document.querySelector('.link1');

document.addEventListener('DOMContentLoaded', function (e) {
  request('index.json', function (data) {
    index = JSON.parse(data);

    title.textContent = index.title;
    subtitle.textContent = index.subtitle;
    text.textContent = index.body.text;
    link.href = index.body.link;
    link.textContent = 'about.html';
    link1.href = index.body.link1;
    link1.textContent = 'contacts.html';
  });
});

document.body.addEventListener('click', function (e) {
  if ((e.target = 'a')) {
    e.preventDefault();
  }
  if (e.target.innerText === 'about.html') {
    request('about.json', getNewPage);
  } else if (e.target.innerText === 'contacts.html') {
    request('contacts.json', getNewPage);
  }
});
