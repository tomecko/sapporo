export interface Item {
  author: string;
  belongsToItems: number[];
  category: string;
  description: string;
  id: number;
  lastUpdate: string;
  links: (number | string)[];
  priority: number;
  tags: string[];
  title: string;
  votes: number;
}
