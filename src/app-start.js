import { Global } from './services/global-service.js';

function startApp() {
  console.info('Starting application...');

  const global = new Global(document.getElementById('rootElement'));
  global.startApplication();
}

if (document.readyState === 'loading') {  
  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', startApp);
} else {  
  // `DOMContentLoaded` has already fired
  startApp();
}
