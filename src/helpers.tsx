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

export const searchMsg = (query: string): {
  title: string;
  contents: string[]
} => {
  const searchResult = fuse.search(query) as (ReturnDef[]);
  let result: CommandsDef;
  console.log(searchResult);
  switch (true) {
    case !!query?.match(/^[A-Z]+$/):
      result = COMMANDS.filter(v => v.title === 'HELLO')[0];
      break;
    // @ts-ignore
    case !searchResult[0]:
    case searchResult[0].score > 0.2:
      if (Math.random() > 0.3) {
        result = COMMANDS.filter(v => v.title === 'find')[0];
      } else {
        result = COMMANDS.filter(v => v.title === 'tell me why')[0];
      }
      break;

    default:
      result = searchResult[0].item;
      break;
  }
  return {
    ...result,
    contents: splitContentStringIntoLineArrays(result.contents)
  };
}

export const splitContentStringIntoLineArrays = (str: string) => str.replace(/\s{4}/g, '//').split('//').map(v => v.trim());
