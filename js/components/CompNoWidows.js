/*
=====================================
CompNoWidows
js/components/CompNoWidows.js

🪶 Автоматически убирает висячие предлоги и союзы

Суть:
– Заменяет пробелы после коротких слов (предлогов и союзов) на неразрывные (&nbsp;)
– Работает с элементами: p, li, span, h1–h6
– Игнорирует элементы с атрибутом data-no-widows
– Не управляет стилями и не хранит состояние между перезагрузками
===================================== */

const shortWords = [
  'и', 'в', 'во', 'не', 'на', 'но', 'а', 'с', 'со', 'к', 'ко', 'от', 'за', 'у', 'о', 'об'
];

function fixTextNode(node) {
  node.nodeValue = node.nodeValue.replace(
    new RegExp(`\\b(${shortWords.join('|')})\\s+`, 'gi'),
    '$1\u00A0'
  );
}

function fixWidows(element) {
  element.childNodes.forEach(node => {
    if (node.nodeType === 3) { // текстовый узел
      fixTextNode(node);
    } else if (node.nodeType === 1 && !node.hasAttribute('data-no-widows')) { // элемент
      fixWidows(node);
    }
  });
}

export class CompNoWidows extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    requestAnimationFrame(() => {
      document.querySelectorAll('p, li, span, h1, h2, h3, h4, h5, h6, div')
        .forEach(el => {
          if (!el.hasAttribute('data-no-widows')) {
            fixWidows(el);
          }
        });
    });
  }
}

if (!customElements.get('comp-no-widows')) {
  customElements.define('comp-no-widows', CompNoWidows);
}




