import React, { useState, useContext, useEffect } from 'react';
import Context from '../context/Context';
import CurrencyInput from 'react-currency-input-field';
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

  const handleCancel = () => {
    resetFieldValues();
    props.history.push('/');
  };

  const renderLoading = () => {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  };

  return (
    <div className="container">
      <h2 className="text-xl font-semibold my-4">
        {edit ? 'Update' : 'Create'} an stock item
      </h2>
      {loading && renderLoading()}
      <div className="mt-6">
        <div className="flex justify-between gap-3">
          <span class="w-1/2">
            <label
              htmlFor="quantity"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Quantity
              <input
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </label>
          </span>
          <span class="w-1/2">
            <label
              htmlFor="price"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Price
              <CurrencyInput
                className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                id="price"
                prefix={currency}
                defaultValue={price}
                value={price}
                allowDecimals={true}
                decimalsLimit={2}
                onChange={(value) => setPrice(value)}
              />
            </label>
          </span>
        </div>
        <div>
          <label
            htmlFor="product"
            className="block text-xs font-semibold text-gray-600 uppercase my-4"
          >
            Product
            <input
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              type="text"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="client"
            className="block text-xs font-semibold text-gray-600 uppercase my-4"
          >
            Client
            <input
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              type="text"
              id="client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </label>
        </div>
        <div className="">
          <label
            htmlFor="active"
            className="block text-xs font-semibold text-gray-600 uppercase my-4"
          >
            <input
              className="m-3"
              type="checkbox"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active
          </label>
        </div>
        <div>
          <button
            onClick={handleClick}
            className="bg-white text-black px-10 py-2 border rounded-md hover:bg-red-500 border-red-500 hover:text-white"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-white text-black px-8 py-2 border rounded-md hover:bg-yellow-500 border-yellow-500 hover:text-white mx-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEdit;
