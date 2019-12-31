import React from 'react';
import Terminal from 'terminal-in-react';
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
      commands={{
        'open-google': () => window.open('https://www.google.com/', '_blank'),
        popup: () => alert('Terminal in React')
      }}
      commandPassThrough={(cmd,print) => {
        print(searchMsg(cmd[0]));
      }}
      msg='Tap screen, click screen or input some command'
    />

      </div>
  </div>

  );
}

export default App;
