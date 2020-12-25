import { useContext } from 'react';
import Context from '../context/Context';

const Header = () => {
  const { name } = useContext(Context);
  return <header>{name}</header>;
};

export default Header;
