import { AppView } from '../view/appView';
import { AppController, IAppController } from '../controller/controller';
import { IArticlesResponse } from '../view/news/news';
import { ISourcesResponse } from '../view/sources/sources';

class App {
  private controller: IAppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sources = document.querySelector('.sources');

    if (sources) {
      sources.addEventListener('click', (e: Event) => {
        if (e instanceof MouseEvent) {
          this.controller.getNews(e, (data: IArticlesResponse) => {
            this.view.drawNews(data);
          });
        }
      });
    }

    this.controller.getSources((data: ISourcesResponse) => this.view.drawSources(data));
  }
}

export default App;
