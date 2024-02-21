import { News } from './news/news';
import { Sources } from './sources/sources';

import { IArticlesResponse } from './news/news';
import { ISourcesResponse } from './sources/sources';

export class AppView {
  news: News;
  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IArticlesResponse): void {
    const values = data.articles ? data.articles : [];
    this.news.draw(data);
  }

  drawSources(data: ISourcesResponse): void {
    const values = data.sources ? data.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
