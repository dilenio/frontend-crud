import { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [name, setName] = useState('ABM Stock');
  const [data, setData] = useState([]);

  const context = {
    name,
    setName,
    data,
    setData,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Provider;
