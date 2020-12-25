import { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [name, setName] = useState('ABM Stock');

  const context = {
    name,
    setName,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Provider;
