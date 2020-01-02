import Fuse from 'fuse.js';
import { COMMANDS } from './commands';

type CommandsDef = typeof COMMANDS[number];
type ReturnDef = {
  item: CommandsDef;
  score: number;
}

const options: Fuse.FuseOptions<CommandsDef> = {
  shouldSort: true,
  includeScore: true,
  caseSensitive: true,
  keys: [{
    name: 'title',
    weight: 0.4
  },
   {
    name: 'contents',
    weight: 0.3
  },
  {
    name: 'tags',
    weight: 0.4
  }
],
};


const fuse = new Fuse(COMMANDS, options);

export const searchMsg = (query: string): string[] => {
  const searchResult = fuse.search(query) as (ReturnDef[]);
  let result = "";
  switch (true) {
    case !!query?.match(/^[A-Z]+$/):
      result = COMMANDS.filter(v => v.title === 'HELLO')[0].contents;
      break;
    // @ts-ignore
    case !searchResult[0]:
    case searchResult[0].score > 0.2:
      if (Math.random() > 0.3) {
        result = COMMANDS.filter(v => v.title === 'find')[0].contents;
      } else {
        result = COMMANDS.filter(v => v.title === 'unknown error')[0].contents;
      }
      break;

    default:
      result = searchResult[0].item.contents
      break;
  }
  return splitContentStringIntoLineArrays(result);
}

export const splitContentStringIntoLineArrays = (str: string) => str.replace(/\s{4}/g, '//').split('//').map(v => v.trim());
