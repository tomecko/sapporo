export interface Item {
  author: string;
  belongsToItems: string[];
  category: string;
  description: string;
  id: number;
  lastUpdate: string;
  links: string[]; // TODO: -> LinkInfo
  priority: number;
  tags: string[];
  title: string;
  votes: number;
}
