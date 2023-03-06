import {Component} from 'react';
import EmployeesService from '../../services/EmployeesService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


import './app.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      term: '',
      filter: 'all',
      loading: false,
      error: false 
    }

    this.maxId = 4; 
  }

  employeesService = new EmployeesService();


  componentDidMount() {
    this.updateEmployees()
  }

  onEmployeesLoaded = (data) => {
    this.setState({
      data,
      loading: false
    })
  }

  onEmployeesLoading = () => {
    this.setState({
      loading: true
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  updateEmployees = () => {
    this.onEmployeesLoading();

    this.employeesService
        .getAllEmployees()
        .then(this.onEmployeesLoaded)
        .catch(this.onError)
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      // const index = data.findIndex(elem => elem.id === id);
      
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr = [...before, ...after];

      const newArr = data.filter(item => item.id != id)

      return {
        data: newArr
      }
    })
  }

  addItem = (name, salary) => {

    const newItem = {
      name, 
      salary,
      increase: false, 
      rise: false,
      id: this.maxId++
    }
    
    this.setState(({data}) => {
      const newArr = [...data, newItem];

      return {
        data: newArr
      }
    })
  }

  // onToggleIncrease = (id) => {
    // this.setState(({data}) => {
    //   const index = data.findIndex(elem => elem.id === id);
    //   const old = data[index];
    //   const newItem = {...old, increase: !old.increase};
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //   return {
    //     data: newArr
    //   }

    // })

  //   this.setState(({data}) => ({
  //     data: data.map(item => {
  //       if (item.id === id) {
  //         return {...item, increase: !item.increase}
  //       }

  //       return item;
  //     })
  //   }))
  // }

  
  onToggleProp = (id, prop) => {    
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }

        return item;
      })
    }))
  }

  onUpdateSalary = (id, value) => {
    this.setState(({data})=> ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, salary: value}
        } else {
          return item;
        }
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise' : 
        return items.filter(item => item.rise);
        break;
      case 'moreThen1000' : 
        return items.filter(item => item.salary > 1000);
        break;
      default: 
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }



  render() {
    const {data, term, filter, error, loading} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    
    const content = !(loading || error) ? <EmployeesList 
            data={visibleData}
            onDelete = {this.deleteItem}
            onToggleProp = {this.onToggleProp} 
            onUpdateSalary = {this.onUpdateSalary}/> : null;


    return (
      <>
      
      <div className="app">
        <ErrorBoundary>
          <AppInfo employees={employees} increased={increased}/>
        </ErrorBoundary>

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter 
            filter={filter}
            onFilterSelect={this.onFilterSelect} />
        </div>

          {errorMessage}
          {spinner}
          {content}

          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
      </>
    );
  }

  
}

export default App;