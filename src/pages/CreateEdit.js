import React, { useState, useContext, useEffect } from 'react';
import Context from '../context/Context';
import CurrencyInput from 'react-currency-input-field';
import loadingIcon from '../assets/loading.gif';
import { Link } from 'react-router-dom';
import { apiCreate, apiGetById, apiUpdate } from '../services/API';

const CreateEdit = (props) => {
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
    edit,
    setEdit,
    currency,
  } = useContext(Context);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit !== '') {
      apiGetById(edit).then((item) => {
        setQuantity(item.quantity);
        setPrice(item.price);
        setProduct(item.product.name);
        setClient(item.client.name);
        setActive(item.active);
      });
    }
  }, [edit, setQuantity, setPrice, setProduct, setClient, setActive]);

  const resetFieldValues = () => {
    setQuantity('');
    setPrice('');
    setProduct('');
    setClient('');
    setActive(true);
    setEdit('');
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

    if (edit !== '') {
      data.id = edit;
      await apiUpdate(data);
    } else {
      await apiCreate(data);
    }

    resetFieldValues();
    setLoading(false);
    props.history.push('/');
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
              prefix={currency}
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
