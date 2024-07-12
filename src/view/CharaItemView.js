import { element } from "./html-util.js";

export class CharaItemView {

  createElement(item) {
    const todoItemElement = element`<li><p>${item.name}（${item.category}）</p><img src="https://ihatov08.github.io${item.image}"></li>`;

    return todoItemElement;
  }
}
