import './sources.css';

interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface ISourcesResponse {
  status: string;
  sources: ISource[];
}

export class Sources {
  draw(data: ISource[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item: ISource) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      const sourceItemName = sourceClone.querySelector('.source__item-name');
      if (sourceItemName) sourceItemName.textContent = item.name;

      const sourceItem = sourceClone.querySelector('.source__item');
      if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sourcesContainer = document.querySelector('.sources');
    if (sourcesContainer) sourcesContainer.append(fragment);
  }
}
