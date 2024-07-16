import { CharaListView } from "./view/CharaListView.js";
import { render } from "./view/html-util.js";
import { element } from "./view/html-util.js";

export class App {

  mount() {
    const containerElement = document.querySelector("#chara-list");
    const charaFilterElements = document.querySelectorAll('input[name="filter"]');

    fetchAndRenderCharaInfo('all');

    charaFilterElements.forEach(emt => {
      emt.addEventListener("change", (event) => {
        // ローディング画面を表示
        const loadingElement = element`<img src="../img/loading.jpeg">`;
        render(loadingElement, containerElement);

        fetchAndRenderCharaInfo(event.target.value);
      });
    });

    async function fetchAndRenderCharaInfo(currentFilter) {
      const fetchUrl = `https://ihatov08.github.io/kimetsu_api/api/${currentFilter}.json`;
      const response = await fetch(fetchUrl);
      const json = await response.json();
      const charaListView = new CharaListView();
      const charaListElement = charaListView.createElement(json);
      render(charaListElement, containerElement);
    }
  }

}
