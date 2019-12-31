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

export const searchMsg = (query: string): string => {
  const searchResult = fuse.search(query) as ReturnDef[];
  console.log(searchResult);
  if (!searchResult[0] || searchResult[0].score > 0.3)  {
    return COMMANDS.filter(v => v.title === '404')[0].contents;
  } else {
    console.log(searchResult)
    return searchResult[0].item.contents
  }
}
