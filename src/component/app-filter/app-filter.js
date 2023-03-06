import './app-filter.css';
import PropTypes from 'prop-types';

const AppFilter = (props) => {

  const buttonsData = [
    {name: 'all', label: 'Все сотрудники'},
    {name: 'rise', label: 'На повышение'},
    {name: 'moreThen1000', label: 'З/П больше 1000$'},
  ]

  const buttons = buttonsData.map(({name, label}) => {
    const active = props.filter === name;
    const clazz = active ? 'btn-light' : 'btn-outline-light';

    return (
      <button 
        type="button"
        className={`btn ${clazz}`}
        key={name}
        onClick={() => props.onFilterSelect(name)}>
          {label}
      </button>
    );
  });

   return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  
}

AppFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
}

export default AppFilter;