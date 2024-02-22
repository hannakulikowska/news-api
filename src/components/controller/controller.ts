import AppLoader from './appLoader';
import { ILoader } from './loader';

import { IArticlesResponse } from '../view/news/news';
import { ISourcesResponse } from '../view/sources/sources';

export interface IAppController extends ILoader {
  getSources(callback: (data: ISourcesResponse) => void): void;
  getNews(e: MouseEvent, callback: (data: IArticlesResponse) => void): void;
}

export class AppController extends AppLoader implements IAppController {
  getSources(callback: (data: ISourcesResponse) => void): void {
    super.getResp<ISourcesResponse>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: MouseEvent, callback: (data: IArticlesResponse) => void): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}
