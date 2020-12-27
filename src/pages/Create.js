import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import CurrencyInput from 'react-currency-input-field';
import loadingIcon from '../assets/loading.gif';
import { Link } from 'react-router-dom';
import { apiCreate } from '../services/API';

const CreateEdit = () => {
  const {
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
  } = useContext(Context);
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

    await apiCreate(data);

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
          <Link to="/">Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default CreateEdit;
