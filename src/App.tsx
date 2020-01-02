import React, {useRef, useState, SyntheticEvent} from 'react';
import { COMMANDS, INTERVAL_CHAR, INTERVAL_LINE, INTERVAL_INPUT, WAIT_ANNOTATION_SYMBOL, LOGIN_ERROR_MSG, HERO_ERROR_MSG } from './commands';
import classNames from 'classnames';

// @ts-ignore
import Terminal from 'terminal-in-react/src/js/index';
import { searchMsg, splitContentStringIntoLineArrays } from './helpers';


const waitForMs = (ms = INTERVAL_LINE) => () => new Promise<void>(resolve => {
  setTimeout(() => {
    resolve();
  }, ms)
})

const App: React.FC = () => {
  const terminalRef = useRef<Terminal>(null);
  const [tapIndex, settapIndex] = useState(0);
  const [isShowing, setisShowing] = useState(false);
  const [isUserNamePrompt, setisUserNamePrompt] = useState(false);
  const [isHeroTypeprompt, setisHeroTypeprompt] = useState(false);

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
      let targetStr:string = COMMANDS[tapIndex].title;

      if (isUserNamePrompt) {
        targetStr = 'admin';
      }
      if (isHeroTypeprompt) {
        targetStr = 'new Hero<strong>("AnpanMan")';
      }
      // 1文字ずつタイピング
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
          if (isUserNamePrompt || isHeroTypeprompt) {
            return;
          }
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
        // messageを検索して表示
        setisShowing(true);
        terminalRef.current.state.instances[0].instance.setState({
          'prompt': '>'
        })
        terminalRef.current.state.instances[0].instance
          .com.blur();
        // @ts-ignore
        let messages = searchMsg(cmd.join(' '));
        if (isUserNamePrompt) {
          messages = {
            title: 'loginFailed',
            contents: splitContentStringIntoLineArrays(LOGIN_ERROR_MSG)
          }
        } else if (isHeroTypeprompt) {
          messages = {
            title: 'heroFailed',
            contents: splitContentStringIntoLineArrays(HERO_ERROR_MSG)
          }
        }
        const msgPromises = messages.contents.map((msg) => {
          return () => new Promise<void>((resolve) => {
            print('');
            if (msg.length === 0) {
              resolve();
            }
            const _speedAnnotation = msg.split('@')[1];
            let _msgBody = msg;
            let _speed = INTERVAL_CHAR;
            let _speedAdditional = 0;
            if (_speedAnnotation) {
              _speed = Number(_speedAnnotation);
              _msgBody = msg.split('@')[0]
            }
            for (let i = 0; i < _msgBody.length; i += 1) {
              const nextChar = _msgBody[i];
              if (nextChar === WAIT_ANNOTATION_SYMBOL) {
                _msgBody = _msgBody.replace(WAIT_ANNOTATION_SYMBOL, '');
                i--;
                _speedAdditional += _speed * 2
              }
              setTimeout(() => {
                runCommand(`edit-line ${_msgBody.slice(0, i + 1)}`);
                if (i === _msgBody.length - 1) {
                  resolve();
                }
              }, (_speed * i) + _speedAdditional);  
            }
          });
        });
        msgPromises
        .reduce((promise, currentValue) => {
          return promise.then(waitForMs()).then(currentValue);
        },Promise.resolve())
        .then(() => {
          if (messages.title === 'Hero') {
            setisHeroTypeprompt(true);
            setTimeout(() => {
              terminalRef.current.state.instances[0].instance.setState({
                'prompt': 'type:'
              })  
              setisShowing(false);

            }, 200)
          } else if (messages.title === 'login') {
            setisUserNamePrompt(true);
            setTimeout(() => {
              terminalRef.current.state.instances[0].instance.setState({
                'prompt': 'username:'
              })
              setisShowing(false);

            }, 200)
          } else {
            setisUserNamePrompt(false);
            setisHeroTypeprompt(false);
            setisShowing(false);
          }
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
