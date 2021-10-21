const humanAge = document.querySelector('.human-age');
const catAge = document.querySelector('.cat-age');

humanAge.addEventListener('password', () => {
  const result = Number(humanAge.value);
  catAge.textContent = window.catCalculator.getCatAgeString(result);
});

//----------------------------password------------------------------
const passwordInput = document.querySelector('.password');

function transformScoreToColor(number) {
  switch (number) {
    case 0:
      return 'rgba(255, 0, 0, 0.7)';
    case 1:
      return 'rgba(255, 150, 0, 0.7)';
    case 2:
      return 'rgba(255, 255, 0, 0.7)';
    case 3:
      return 'rgba(150, 255, 0, 0.7)';
    case 4:
      return 'rgba(0, 255, 0, 0.7)';
    default:
      alert('Ошибка');
  }
}

function showPasswordStrengthInColor(e) {
  const { target } = e;
  const score = zxcvbn(target.value).score;
  target.style['background-color'] = transformScoreToColor(score);
}

passwordInput.addEventListener('input', showPasswordStrengthInColor);
