import {Component} from 'react';
import './employees-add-form.css'

import PropTypes from 'prop-types';

class EmployeesAddForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      salary: ''
    }
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    //Можно еще и сообщения добавлять, подсветку, атрибуты minlength и т.д
    if (this.state.name.length < 3 || !this.state.salary) return;
    
    this.props.onAdd(this.state.name, this.state.salary);
    this.setState({
      name: '',
      salary: '',
    })
  }

  render() {

    const {name, salary} = this.state;

    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form
          onSubmit={this.onSubmit}
          className="add-form d-flex">
          <input type="text"
              onChange={this.onValueChange}
              name="name"
              value={name}
              className="form-control new-post-label"
              placeholder="Как его зовут?" />
          <input type="number"
              onChange={this.onValueChange}
              name="salary"
              value={salary}
              className="form-control new-post-label"
              placeholder="З/П в $?" />

          <button type="submit"
              className="btn btn-outline-light">Добавить</button>
        </form>
      </div>
    )
  }
}

EmployeesAddForm.propTypes = {
  onAdd: PropTypes.func.isRequired
}

export default EmployeesAddForm;