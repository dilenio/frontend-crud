import { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [name, setName] = useState('ABM Stock');
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [product, setProduct] = useState('');
  const [client, setClient] = useState('');
  const [active, setActive] = useState(true);

  const context = {
    name,
    setName,
    data,
    setData,
    quantity,
    setQuantity,
    price,
    setPrice,
    product,
    setProduct,
    client,
    setClient,
    active,
    setActive,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Provider;
