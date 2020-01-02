export const INTERVAL_CHAR_FAST = 25;
export const INTERVAL_CHAR = 40;
export const INTERVAL_CHAR_SLOW = 120;
export const INTERVAL_CHAR_VERYSLOW = 180;
export const SPEED_ANNOTATION_SYMBOL = '@';

export const INTERVAL_LINE = 400;
export const INTERVAL_INPUT = 40;

export const WAIT_ANNOTATION_SYMBOL = '|';

export const LOGIN_ERROR_MSG = `You are not authorized. ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}Please try to enter again once you have got small enough.

It is strongly recommended to keep eating something very quiet.`

export const COMMANDS = [
  {
    title: "Alphabet",
    contents: `Cannot read property ‘Alphabet’ of undefined. ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}It has been long since we last talked there.

    The meaning of them has been lost.`,
    tags: ['character']
  },
  {
    title: 'login',
    contents: `Enter your username...`,
    tags: ['enter', 'login', 'ssh', 'authorization'],
  },
  {
    title: "apple",
    contents: `‘Apple’ is not defined. ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}Now it would perhaps be way more troublesome to think about myth or math.`,
    tags: ['apple', 'fruit']
  },
  {
    //
    title: 'hero',
    contents: `‘Hero’ must be the correct type. ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}Prepare the value of more sophisticated type and try again.

    Describe cracked types, ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}worn-out types, ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}weeping types....
    .
    .
    .
    .
    .
    But it is still not the type.`,
    tags: ['hero', 'superman', 'ultraman', 'spiderman']
  },
  {
    //
    title: 'connect',
    contents: 'Unfortunately you are not connected....',
    tag: ['connect', 'network']
  },
  {
    //
    title: 'unknown error',
    contents: `Unknown error occurred.
    
    Anyway I’m glad to know I don’t know nobody knows what is known nor anybody know it’s unknown.${SPEED_ANNOTATION_SYMBOL}${INTERVAL_CHAR_FAST}`,
    tags: ['unknown']
  },
  {
    title: 'HELLO',
    contents: `PLEASE REFRAIN FROM TYPING LOUDLY.
    Something is sleeping over your screen.`,
    tags: []
  },
  {
    title: 'find',
    contents: `404 not found. ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}Anywhere. ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}But it shall come around here right after you go. ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}I promise that it shall come. ${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}${WAIT_ANNOTATION_SYMBOL}Don’t worry.`,
    tags: ['curl', `wget`, `apt-get`]
  },
  {
    title: 'hi',
    contents: `Say ‘Hello World’ to me, ${WAIT_ANNOTATION_SYMBOL}right here, ${WAIT_ANNOTATION_SYMBOL}right away.${SPEED_ANNOTATION_SYMBOL}${INTERVAL_CHAR_SLOW}
    .
    .
    .
    .
    .
    I beg you.${SPEED_ANNOTATION_SYMBOL}${INTERVAL_CHAR_SLOW}`,
    tags: []
  },
  {
    title: 'Hello World',
    contents: `Fatal Error: The monitor is looking at you.${SPEED_ANNOTATION_SYMBOL}${INTERVAL_CHAR_FAST}
    
    It is aware that you have not been that talkative since the miserable bird has flown away last year.`,
    tags: []
  }
] as const