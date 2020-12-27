import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import { apiGetList, apiDelete } from '../services/API';
import loadingIcon from '../assets/loading.gif';

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
        <img src={loadingIcon} alt="loading..." />
      </div>
    );
  };

  const renderDataTable = (element) => {
    return (
      <tr key={element._id}>
        <td>{element._id}</td>
        <td>{element.quantity}</td>
        <td>
          {currency} {element.price}
        </td>
        <td>{element.product.name}</td>
        <td>{element.client.name}</td>
        <td>{element.active ? 'Yes' : 'No'}</td>
        <td>
          <Link to="/create-edit" onClick={() => setEdit(element._id)}>
            Select
          </Link>
          <Link to="/" onClick={() => handleDelete(element._id)}>
            Delete
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Link to="/create-edit">Add new</Link>
      {loading && renderLoading()}
      <div>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product Name</th>
                <th>Client Name</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{data.map((element) => renderDataTable(element))}</tbody>
          </table>
        ) : (
          <p>There is no data to show</p>
        )}
      </div>
    </div>
  );
};

export default Home;
