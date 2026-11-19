require('dotenv').config();
const ai = require('./utils/ai');
ai('Say hi in one line')
  .then(r => console.log('RESULT:', r))
  .catch(e => console.log('ERR:', e.message));
  