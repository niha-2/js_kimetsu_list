import { CharaItemView } from "./CharaItemView.js"
import { element } from "./html-util.js";

export class CharaListView {

  createElement(json) {
    const charaListElement = element`<ul></ul>`;
    const charaItemVIew = new CharaItemView();
    for (const chara of json) {
      const charaItemElement = charaItemVIew.createElement(chara);
      charaListElement.appendChild(charaItemElement);
    }
    return charaListElement;
  }
}
