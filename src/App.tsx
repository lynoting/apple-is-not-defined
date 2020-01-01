import React from 'react';
// @ts-ignore
import Terminal from 'terminal-in-react/src/js/index';
import { searchMsg } from './helpers';

const App: React.FC = () => {
  return (
    <div className="l-terminalwrapper">
      <div className="l-terminalwrapper__inner">
      <Terminal
      color='white'
      backgroundColor='transparent'
      barColor='black'
      style={{ fontWeight: "bold", fontSize: "1em" }}
      allowTabs={false}
      hideTopBar={true}
      commands={{
        help: () => 'I need some body',
        'type-text': (args:any, print:any, runCommand:any, instance: any) => {
          const text = args.slice(1).join(' ');
          print('');
          console.log(instance);
          for (let i = 0; i < text.length; i += 1) {
            setTimeout(() => {
              runCommand(`edit-line ${text.slice(0, i + 1)}`);
            }, 100 * i);
          }
        }
      }}
      commandPassThrough={(cmd: any,print: any) => {
        // @ts-ignore
        print(searchMsg(cmd[0]));
      }}
      // @ts-ignore
      description={{ 'type-text': 'Types a input text', /* disable default option */show: false, clear: false }}

      msg='Tap screen, click screen or input some command'
    />

      </div>
  </div>

  );
}

export default App;
