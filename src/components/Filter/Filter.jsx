import { useContacts } from '../../hooks/useContacts';
import style from './Filter.module.css'; // Asigurați-vă că acesta este calea corectă către fișierul CSS

const Filter = () => {
  const { filter, setFilter } = useContacts();
  return (
    <div className={style.cont__container}>
      <h2 className={style.home__title}>Filter contacts by name</h2>
      <input
        type="text"
        name="filter"
        value={filter}
        placeholder="Find contact by name"
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  );
};

export default Filter;
