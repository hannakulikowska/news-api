import './news.css';

interface IArticleSource {
  id: string | null;
  name: string;
}

interface IArticle {
  source: IArticleSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

interface IArticlesResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

class News {
  draw(data: IArticlesResponse): void {
    const news = data.articles.length >= 10 ? data.articles.filter((_item, idx) => idx < 10) : data.articles;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

    if (!newsItemTemp) return;

    news.forEach((item: IArticle, idx: number) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      const newsItem = newsClone.querySelector('.news__item') as HTMLElement;
      if (newsItem && idx % 2) newsItem.classList.add('alt');

      const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const metaAuthor = newsClone.querySelector('.news__meta-author');
      if (metaAuthor) metaAuthor.textContent = item.author || item.source.name;

      const metaDate = newsClone.querySelector('.news__meta-date');
      if (metaDate) metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const descriptionTitle = newsClone.querySelector('.news__description-title');
      if (descriptionTitle) descriptionTitle.textContent = item.title;

      const descriptionSource = newsClone.querySelector('.news__description-source');
      if (descriptionSource) descriptionSource.textContent = item.source.name;

      const descriptionContent = newsClone.querySelector('.news__description-content');
      if (descriptionContent) descriptionContent.textContent = item.description;

      const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
      readMoreLink.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news');
    if (newsContainer) {
      newsContainer.innerHTML = '';
      newsContainer.appendChild(fragment);
    }
  }
}

export default News;
