import { CharaListView } from "./view/CharaListView.js";
import { render } from "./view/html-util.js";
import { element } from "./view/html-util.js";

export class App {

  mount() {
    const containerElement = document.querySelector("#chara-list");
    const charaFilterElements = document.querySelectorAll('input[name="filter"]');

    let currentFilter = 'all';
    let fetchUrl = "https://ihatov08.github.io/kimetsu_api/api/all.json";

    charaFilterElements.forEach(emt => {
      emt.addEventListener("change", (event) => {
        // ローディング画面を表示
        const loadingElement = element`<img src="../img/loading.jpeg">`;
        render(loadingElement, containerElement);

        currentFilter = event.target.value;
        switch (currentFilter) {
          case 'kisatsutai':
            fetchUrl = "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json";
            break;
          case 'hashira':
            fetchUrl = "https://ihatov08.github.io/kimetsu_api/api/hashira.json";
            break;
          case 'oni':
            fetchUrl = "https://ihatov08.github.io/kimetsu_api/api/oni.json";
            break;
          default:
            fetchUrl = "https://ihatov08.github.io/kimetsu_api/api/all.json";
            break;
        }

        fetchCharaInfo().then(function (json) {
          const charaListView = new CharaListView();
          const charaListElement = charaListView.createElement(json);
          render(charaListElement, containerElement);
        });

      });
    });

    async function fetchCharaInfo() {
      const response = await fetch(fetchUrl);
      const json = await response.json();
      return json;
    }

    fetchCharaInfo().then(function (json) {
      const charaListView = new CharaListView();
      const charaListElement = charaListView.createElement(json);
      render(charaListElement, containerElement);
    });
  }

}
