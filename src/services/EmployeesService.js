class EmployeesService {

  _apiBase = 'http://localhost:3000';


  getResourse = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`)
    }

    return await response.json();
  }

  getAllEmployees = async () => {
    return await this.getResourse(`${this._apiBase}/data`)
  }

}

export default EmployeesService;