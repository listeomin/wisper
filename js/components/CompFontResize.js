/* ===================================================================
   CompFontResize
   js/components/CompFontResize.js
   🐭 Компонент изменения размеров шрифта

   Контракт компонента:
   – Используется в HTML как <comp-font-resize></comp-font-resize>
   – Сам регистрируется через customElements.define
   – Не требует инициализации в HTML или JS
   – Работает только с DOM (без глобального состояния)

   Поведение:
   – Меняет font-size у целевых элементов (по умолчанию: main, .title)
   – Элементы с атрибутом data-no-resize игнорируются

   Ограничения:
   – Не управляет стилями напрямую (CSS живёт отдельно)
   – Не хранит состояние между перезагрузками

   =================================================================== */


   export class CompFontResize extends HTMLElement {
    constructor() {
      super();
  
      // Вставляем кнопки прямо внутрь компонента
      this.innerHTML = `
        <div class="comp-font-resize">
          <button id="font-decrease">A-</button>
          <button id="font-increase">A+</button>
        </div>
      `;
    }
  
    connectedCallback() {
      // Цели для изменения шрифта (main, .title и т.п.)
      const targets = Array.from(document.querySelectorAll('main, .title'))
        .filter(el => !el.hasAttribute('data-no-resize'));
  
      // Сохраняем текущий размер шрифта
      targets.forEach(el => {
        el.dataset.fontSize = parseFloat(getComputedStyle(el).fontSize);
        el.style.transition = 'font-size 0.2s ease';
      });
  
      // Кнопки внутри компонента
      const increaseBtn = this.querySelector('#font-increase');
      const decreaseBtn = this.querySelector('#font-decrease');
  
      increaseBtn.addEventListener('click', () => {
        targets.forEach(el => {
          let size = parseFloat(el.dataset.fontSize) * 1.1;
          size = Math.min(size, 24);
          el.style.fontSize = size + 'px';
          el.dataset.fontSize = size;
        });
      });
  
      decreaseBtn.addEventListener('click', () => {
        targets.forEach(el => {
          let size = parseFloat(el.dataset.fontSize) * 0.9;
          size = Math.max(size, 12);
          el.style.fontSize = size + 'px';
          el.dataset.fontSize = size;
        });
      });
    }
  }
  
  // Регистрируем компонент
  customElements.define('comp-font-resize', CompFontResize);
  