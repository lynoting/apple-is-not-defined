import React, {useRef} from 'react';
// @ts-ignore
import Terminal from 'terminal-in-react/src/js/index';
import { searchMsg } from './helpers';


const App: React.FC = () => {
  const terminalRef = useRef<Terminal>(null);
  const handleClick = () => {
    console.log('clicked');
    if (terminalRef && terminalRef.current) {
      terminalRef.current.state.instances[0].instance.handleChange({ target: { value: 'text' }, key: 'Enter' });
          
    }
  }
  

  return (
    <div className="l-terminalwrapper">
      <div className="l-terminalwrapper__inner" onClick={handleClick}>
      <Terminal
      ref={terminalRef}
      color='white'
      backgroundColor='transparent'
      barColor='black'
      style={{ fontWeight: "bold", fontSize: "1em" }}
      allowTabs={false}
      hideTopBar={true}
      commands={{
        help: () => `Tap screen, click screen or input some command
        `,
        'type-text': (args:any, print:any, runCommand:any, instance: any) => {
          const text = args.slice(1).join(' ');
          print('');
          console.log(instance);
          for (let i = 0; i < text.length; i += 1) {
            setTimeout(() => {
              runCommand(`edit-line ${text.slice(0, i + 1)}`);
            }, 50 * i);
          }
        }
      }}
      commandPassThrough={(cmd: any,print: any,runCommand:any) => {
        const INTERVAL_LINE = 400;
        const INTERVAL_CHAR = 40;
        // @ts-ignore
        const messages = searchMsg(cmd[0]);
        const waitForMs = () => new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, INTERVAL_LINE)
        })
        const msgPromises = messages.map((msg) => {
          return () => new Promise<void>((resolve) => {
            print('');
            console.log(msg)
            for (let i = 0; i < msg.length; i += 1) {
              setTimeout(() => {
                runCommand(`edit-line ${msg.slice(0, i + 1)}`);
                if (i === msg.length -1) {
                  console.log(i);
                  resolve();
                }
              }, INTERVAL_CHAR * i);
            }
          });
        });
        console.log(msgPromises)
        msgPromises.reduce((promise, currentValue) => {
          return promise.then(waitForMs).then(currentValue);
        },Promise.resolve());     

        
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
