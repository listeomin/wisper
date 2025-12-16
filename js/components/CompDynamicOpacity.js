/*
=====================================
CompDynamicOpacity
js/components/CompDynamicOpacity.js

🐸 Компонент динамической прозрачности картинки статьи

Сутры:
– Используется в HTML как <comp-dynamic-opacity></comp-dynamic-opacity>
– Сам регистрируется через customElements.define
– Не требует инициализации в HTML или JS
– Работает только с DOM, ищет body.art-image

Поведение:
– Меняет opacity картинки (.art-image) в зависимости от ширины окна
– 1500px и больше: opacity = 1
– 780px и меньше: opacity = 0.25
– Между 780px и 1500px: плавная линейная прозрачность
– Плавный переход через CSS transition (0.3s ease)

Ограничения:
– Не изменяет структуру HTML
– Не трогает другие модули и глобальные стили
– Не хранит состояние между перезагрузками страницы
===================================== */
   
export class CompDynamicOpacity extends HTMLElement {
constructor() {
  super();
  this.artImage = null;
  this.updateOpacity = this.updateOpacity.bind(this);
}

connectedCallback() {
  // Ищем картинку глобально (на body), а не внутри компонента
  this.artImage = document.querySelector('body.art-image');
  if (!this.artImage) return;

  // Сразу применяем прозрачность при загрузке
  this.updateOpacity();

  // Следим за изменением размера окна
  window.addEventListener('resize', this.updateOpacity);
}

disconnectedCallback() {
  // Чистим слушатель при удалении компонента
  window.removeEventListener('resize', this.updateOpacity);
}

updateOpacity() {
  if (!this.artImage) return;
  const width = window.innerWidth;
  let opacity = 1;

  if (width >= 1500) {
    opacity = 1;
  } else if (width <= 780) {
    opacity = 0.25;
  } else {
    // Плавная линейная прозрачность между 780px и 1500px
    opacity = 0.25 + ((width - 780) / (1500 - 780)) * (1 - 0.25);
  }

  this.artImage.style.opacity = opacity;
}
}

// Регистрируем компонент
customElements.define('comp-dynamic-opacity', CompDynamicOpacity);
