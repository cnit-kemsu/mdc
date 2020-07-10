import React from 'react';
import ReactDOM from 'react-dom';

function App() {

  const [show, toggleTirdOption] = React.useState(false);
  const [val, changeSecondOptionValue] = React.useState('2');

  return <div style={{ paddingTop: '50px', paddingBottom: '50px', textAlign: 'center', borderBottom: '2px solid var(--m-secondary-color)' }}>
    <m-button leading-icon="favorite" raised label="Click me" onClick={() => console.log('click')} />
    <m-button trailing-icon="copyright" outlined label="Click me" disabled onClick={() => console.log('click')} />

    <br />

    <m-checkbox checked onInput={event => console.log(event.target.checked)} />
    <m-checkbox disabled onInput={event => console.log(event.target.checked)} />

    <br />

    <m-textfield disabled={false || null} onInput={event => console.log('input:', event.target.value)} />

    <br />

    <button onClick={() => toggleTirdOption(!show)}>add/remove third option</button>
    <button onClick={() => changeSecondOptionValue('a')}>chval</button>

    <br />

    <m-select label="Choose" value="1">
      <m-option value="1" label="option 1" />
      <m-option value={val} label="option 2" />
      {show && <m-option value="b" label="option 3" />}
    </m-select>

    <br />

    <m-datefield></m-datefield>
  </div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

require('./material.config');