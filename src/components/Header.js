import { useContext } from 'react';
import Context from '../context/Context';

const Header = () => {
  const { name } = useContext(Context);

  return (
    <header>
      <h1>{name}</h1>
    </header>
  );
};

export default Header;
