import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import loadingIcon from '../assets/loading.gif';

const Create = () => {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [product, setProduct] = useState('');
  const [client, setClient] = useState('');
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetFieldValues = () => {
    setQuantity('');
    setPrice('');
    setProduct('');
    setClient('');
    setActive(true);
  };

  const handleClick = async () => {
    setLoading(true);
    const data = {
      quantity,
      price,
      active,
      product: {
        name: product,
      },
      client: {
        name: client,
      },
    };

    await axios({
      method: 'post',
      url: 'https://crudcrud.com/api/32dd51cce83b4f8b8c4a25e08a563db2/stock',
      data,
    });

    resetFieldValues();
    setLoading(false);
  };

  const renderLoading = () => {
    return (
      <div>
        <img src={loadingIcon} alt="loading..." />
      </div>
    );
  };

  return (
    <div>
      <h2>Create an stock item</h2>
      {loading && renderLoading()}
      <div>
        <div>
          <label htmlFor="quantity">
            Quantity
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="price">
            Price
            <CurrencyInput
              id="price"
              prefix="$ "
              // placeholder="$ 1,000"
              defaultValue={price}
              value={price}
              allowDecimals={true}
              decimalsLimit={2}
              onChange={(value) => setPrice(value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="product">
            Product
            <input
              type="text"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="client">
            Client
            <input
              type="text"
              id="client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="active">
            Active
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <button onClick={handleClick}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
