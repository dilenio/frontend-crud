import { useContext } from 'react';
import Context from '../context/Context';

const Header = () => {
  const { name } = useContext(Context);

  return (
    <header className="bg-gray-800 text-gray-100 text-2xl p-4">
      <h1 className="text-left">{name}</h1>
    </header>
  );
};

export default Header;
