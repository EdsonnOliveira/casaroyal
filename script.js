const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  mobileNav.hidden = open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

const choices = {
  luz: { label: 'LUZ NA MEDIDA CERTA', heading: 'Leveza para transformar o dia.', description: 'Cortinas de tecido criam uma luz delicada e deixam a sala mais acolhedora, sem perder a sensação de amplitude.', image: 'assets/10-480.webp', alt: 'Sala com cortinas leves filtrando a luz', message: 'Olá! Quero uma solução para deixar a luz mais suave no meu ambiente.' },
  privacidade: { label: 'CONFORTO E PRIVACIDADE', heading: 'Um refúgio para chamar de seu.', description: 'Com o tecido e o modelo certos, você escolhe quando deixar a luz entrar e quando criar um ambiente mais reservado.', image: 'assets/7-480.webp', alt: 'Quarto com cortina do teto ao piso', message: 'Olá! Quero mais privacidade no meu ambiente. Podemos conversar sobre cortinas ou persianas?' },
  praticidade: { label: 'PRATICIDADE NO DIA A DIA', heading: 'O conforto acompanha sua rotina.', description: 'Persianas e opções motorizadas deixam o controle da luz mais simples, com soluções que se integram ao seu espaço.', image: 'assets/19-480.webp', alt: 'Persiana rolô em ambiente residencial', message: 'Olá! Quero uma solução prática para controlar a luz. Gostaria de conhecer as persianas e opções motorizadas.' }
};
const choiceButtons = [...document.querySelectorAll('.finder-option')];
const finderResult = document.getElementById('finder-result');
function selectChoice(button) {
  const item = choices[button.dataset.choice];
  choiceButtons.forEach(other => { other.classList.toggle('is-active', other === button); other.setAttribute('aria-selected', String(other === button)); other.tabIndex = other === button ? 0 : -1; });
  finderResult.setAttribute('aria-labelledby', button.id);
  const image = document.getElementById('finder-image');
  image.src = item.image; image.alt = item.alt;
  document.getElementById('finder-label').textContent = item.label;
  document.getElementById('finder-heading').textContent = item.heading;
  document.getElementById('finder-description').textContent = item.description;
  document.getElementById('finder-cta').href = `https://wa.me/5561981526151?text=${encodeURIComponent(item.message)}`;
}
choiceButtons.forEach((button, index) => {
  button.tabIndex = index === 0 ? 0 : -1;
  button.addEventListener('click', () => selectChoice(button));
  button.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    const next = choiceButtons[(index + direction + choiceButtons.length) % choiceButtons.length];
    selectChoice(next); next.focus();
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
