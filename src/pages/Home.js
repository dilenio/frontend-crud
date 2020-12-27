import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import { apiGetList, apiDelete } from '../services/API';

const Home = () => {
  const { data, setData, setEdit, currency } = useContext(Context);

  useEffect(() => {
    apiGetList().then((items) => {
      setData(items.data);
    });
  }, [setData]);

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
        <td>{element.active}</td>
        <td>
          <Link to="/create-edit" onClick={() => setEdit(element._id)}>
            Select
          </Link>
          <Link to="/" onClick={async () => await apiDelete(element._id)}>
            Delete
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Link to="/create-edit">Add new</Link>
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
