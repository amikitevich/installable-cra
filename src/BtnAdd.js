import React from 'react';
import PropTypes from 'prop-types';

const BtnAdd = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const defferedRef = React.useRef();

  React.useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // e.preventDefault();
      console.log('beforeinstallprompt');
      // Stash the event so it can be triggered later.
      defferedRef.current = e;
      setIsVisible(true);
    });
  }, []);

  function handleShowInstall(e) {
    defferedRef.current.prompt();
    defferedRef.current.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      defferedRef.current = null;
    });
  }

  return isVisible && <button onClick={handleShowInstall}>add to home screen</button>;
};

BtnAdd.propTypes = {};

export default BtnAdd;
