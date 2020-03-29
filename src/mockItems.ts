import { Item } from './types';

const ITEMS_COUNT = 87;

const getRandomElement = <T>(list: T[]): T =>
  list[Math.floor((Math.random() * list.length))];

const randomWords = [
  'of the',
  'solution',
  'query builder',
  'query',
  'metrics',
  'type',
  'input',
  'user',
  'has',
  'should',
  'it',
  'page',
  'new',
  'click',
];

const names = ['John H. Junior', 'Bryan Roberts', 'Oleg Korelski', 'Jessica Smith'];
const getRandomPerson = (): string =>
  names[Math.floor(Math.random() * names.length)];

const getRandomJIRA = () => `JIRA-${100000 + Math.floor(Math.random() * 10000)}`;
const getRandomSlack = () => `#channel-${Math.ceil(Math.random() * 100)} post`;
const getRandomLink = () => `some-link-${Math.ceil(Math.random() * 10)}`;

const getRandomItem = () => `#item-${Math.ceil(Math.random() * ITEMS_COUNT)}`;

const getRandomArray = (maxLength: number, creatorFn: () => string): string[] =>
  Array.from(Array(Math.ceil(Math.random() * maxLength)).keys()).map(creatorFn);

const getRandomString = (length: number): string =>
  Array.from(Array(length).keys()).reduce(
    (acc) => `${acc} ${randomWords[Math.floor(Math.random() * randomWords.length)]}`,
    '',
  );

const getMockItem = (id: number): Item => ({
  author: getRandomPerson(),
  belongsToItems: Array.from(new Set(getRandomArray(2, getRandomItem))),
  category: getRandomElement(['bug', 'redesign', 'new feature']),
  description: getRandomString(20),
  id,
  lastUpdate: '2020-03-14 14:55',
  links: Array.from(new Set([
    ...getRandomArray(2, getRandomJIRA),
    ...getRandomArray(2, getRandomSlack),
    ...getRandomArray(2, getRandomLink),
  ])),
  priority: Math.ceil(Math.random() * 4),
  tags: Array.from(new Set([getRandomString(1), getRandomString(1)])),
  title: getRandomString(5),
  votes: Math.ceil(Math.random() * 9),
});

export const mockItems: Item[] =
  Array.from(Array(ITEMS_COUNT).keys()).map((_, i) => getMockItem(i + 1));
