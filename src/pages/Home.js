import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import { apiGetList, apiDelete } from '../services/API';

const Home = () => {
  const { data, setData, setEdit, currency } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetList().then((items) => {
      setData(items.data);
      setLoading(false);
    });
  }, [setData]);

  const handleDelete = async (id) => {
    await apiDelete(id);
    apiGetList().then((items) => {
      setData(items.data);
    });
  };

  const renderLoading = () => {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  };

  const renderDataTable = (element) => {
    return (
      <tr key={element._id} className="bg-white border-2 border-gray-200">
        <td className="text-center ml-2 px-2 py-2">{element._id}</td>
        <td className="text-center ml-2 px-2 py-2">{element.quantity}</td>
        <td className="text-center ml-2 px-2 py-2">
          {currency} {element.price}
        </td>
        <td className="text-center ml-2 px-2 py-2">{element.product.name}</td>
        <td className="text-center ml-2 px-2 py-2">{element.client.name}</td>
        <td className="text-center ml-2 px-2 py-2">
          {element.active ? (
            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Yes
            </p>
          ) : (
            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              No
            </p>
          )}
        </td>
        <td className="text-center ml-2 px-2 py-2">
          <Link
            to="/create-edit"
            onClick={() => setEdit(element._id)}
            className="bg-white text-black px-4 py-2 border rounded-md hover:bg-indigo-500 border-indigo-500 hover:text-white mx-2"
          >
            Select
          </Link>
          <Link
            to="/"
            onClick={() => handleDelete(element._id)}
            className="bg-white text-black px-4 py-2 border rounded-md hover:bg-red-500 border-red-500 hover:text-white"
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col">
      <div>{loading && renderLoading()}</div>
      <div className="flex my-3 justify-end">
        <Link
          to="/create-edit"
          className="bg-green-400 hover:bg-green-500 text-gray-100 p-2 px-10 rounded-md text-right"
        >
          Add new
        </Link>
      </div>
      <div className="container">
        {data.length === 0 && !loading ? (
          <p>There is no data to show</p>
        ) : (
          <table className="min-w-full table-fixed">
            <thead className="justify-between">
              <tr className="bg-gray-800">
                <th className="px-2 py-2 text-gray-200">Id</th>
                <th className="px-2 py-2 text-gray-200">Quantity</th>
                <th className="px-2 py-2 text-gray-200">Price</th>
                <th className="px-2 py-2 text-gray-200">Product Name</th>
                <th className="px-2 py-2 text-gray-200">Client Name</th>
                <th className="px-2 py-2 text-gray-200">Active</th>
                <th className="px-2 py-2 text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>{data.map((element) => renderDataTable(element))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
