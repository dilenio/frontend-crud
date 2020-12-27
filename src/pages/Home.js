import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import apiGetList from '../services/API';

const Home = () => {
  const { data, setData } = useContext(Context);

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
        <td>$ {element.price}</td>
        <td>{element.product.name}</td>
        <td>{element.client.name}</td>
        <td>{element.active}</td>
        <td>
          <Link to="/create">Select</Link>
          <button>Delete</button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Link to="/create">Add new</Link>
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
