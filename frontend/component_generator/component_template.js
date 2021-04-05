// component.js
exports.component = name => `import React from 'react';
import './${name}.css';

const ${name} = () => {
  return(
    <div>
      Hello, I am a ${name} component.
    </div>
  );
};

export default ${name};
`;

// index.js
exports.idx = name => `export { default } from './${name}';`