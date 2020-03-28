export interface Item {
  author: string;
  category: string;
  description: string;
  id: number;
  lastUpdate: string;
  links: string[]; // TODO: -> LinkInfo
  priority: number;
  relatedItems: string[];
  tags: string[];
  title: string;
  votes: number;
}
