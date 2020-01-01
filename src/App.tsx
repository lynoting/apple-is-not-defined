import React, {useRef, useState, SyntheticEvent} from 'react';
import { COMMANDS } from './commands';
import classNames from 'classnames';

// @ts-ignore
import Terminal from 'terminal-in-react/src/js/index';
import { searchMsg } from './helpers';

const INTERVAL_LINE = 400;
const INTERVAL_CHAR = 40;
const INTERVAL_INPUT = 40;

const waitForMs = (ms = INTERVAL_LINE) => () => new Promise<void>(resolve => {
  setTimeout(() => {
    resolve();
  }, ms)
})

const App: React.FC = () => {
  const terminalRef = useRef<Terminal>(null);
  const [tapIndex, settapIndex] = useState(0);
  const [isShowing, setisShowing] = useState(false)

  const handleClick = (event: SyntheticEvent<HTMLElement>) => {
    // @ts-ignore
    const targetTag:string = event.target.tagName;
    if (targetTag === 'INPUT') {
      return;
    }
    if (isShowing) {
      return;
    }
    setisShowing(true);
    if (terminalRef && terminalRef.current) {
      const targetStr = COMMANDS[tapIndex].title;
      targetStr
      .split('')
      .map((char, idx) => () => new Promise<void>(resolve => {
        setTimeout(() => {
          terminalRef.current.state.instances[0].instance
          .com.value = targetStr.slice(0, idx + 1);
          resolve();
        }, INTERVAL_INPUT * (Math.random() / 2 + 1))
      }))
      .reduce((promise, cv) => {
        return promise.then(cv)
      }, Promise.resolve())
      .then(waitForMs())
      .then(() => {
        terminalRef.current.state.instances[0].instance.handleChange({ target: { value: targetStr }, key: 'Enter' });
        terminalRef.current.state.instances[0].instance
          .com.value = "";
        if (tapIndex === COMMANDS.length - 1) {
          settapIndex(0)
        } else {
          settapIndex(tapIndex + 1);
        }  
      })
      
    }
  }
  

  return (
    <div className={
      classNames({
        'l-terminalwrapper': true,
        'l-terminalwrapper--disabled': isShowing
      })
    }
    onClick={handleClick}
    >
      <div className="l-terminalwrapper__inner">
      <Terminal
      ref={terminalRef}
      color='white'
      backgroundColor='#333'
      barColor='black'
      prompt='white'
      style={{ fontWeight: "normal", fontSize: "1em" }}
      allowTabs={false}
      hideTopBar={true}
      commands={{
        help: () => `Tap screen, click screen or input some command such as "Apple", "login"`
      }}
      commandPassThrough={(cmd: any,print: any,runCommand:any) => {
        setisShowing(true);
        terminalRef.current.state.instances[0].instance
          .com.blur();
        // @ts-ignore
        const messages = searchMsg(cmd[0]);
        const msgPromises = messages.map((msg) => {
          return () => new Promise<void>((resolve) => {
            print('');
            if (msg.length === 0) {
              resolve();
            }
            for (let i = 0; i < msg.length; i += 1) {
              setTimeout(() => {
                runCommand(`edit-line ${msg.slice(0, i + 1)}`);
                if (i === msg.length - 1) {
                  resolve();
                }
              }, INTERVAL_CHAR * i);
            }
          });
        });
        msgPromises
        .reduce((promise, currentValue) => {
          return promise.then(waitForMs()).then(currentValue);
        },Promise.resolve())
        .then(() => {
          setisShowing(false);
        });     

        
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
