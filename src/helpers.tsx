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

export const searchMsg = (query: string): string[] => {
  const searchResult = fuse.search(query) as ReturnDef[];
  let result = "";
  if (!searchResult[0] || searchResult[0].score > 0.3)  {
    result = COMMANDS.filter(v => v.title === '404')[0].contents;
  } else {
    result = searchResult[0].item.contents
  }
  return result.replace(/\s{4}/g, '//').split('//').map(v => v.trim());
}
