import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'string',
      input: '',
      inputError: '',
      result: '',
      user_steps: ''
    };

    this.datatype_handleChange = this.datatype_handleChange.bind(this);
    this.input_handleChange = this.input_handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Validate user input at frontend
  validate = () => {
    let isValid;
    if (this.state.value === 'integer') {
      // only allow integer 
      const numberRegex = /^([+-]?[1-9]\d*|0)$/;
      isValid = this.state.input.split(',').every(val => numberRegex.test(val));
    } else {
      // only allow alphabet
      const alRegex = /^[a-zA-Z,]*$/;
      isValid = this.state.input.split(',').every(val => alRegex.test(val));
    }
    // if input not valid, alert user 
    if (!isValid) {
      this.setState({ inputError: 'invalid input' });
      return false;
    } else {
      // if input valid, return true
      this.setState({ inputError: '' })
      return true;
    }
  }
  //axios post data to backend for sorting
  sort_list = () => {
    const data = {
      list: this.state.input,
      data_type: this.state.value
    }
    axios.post('http://localhost:3001/sort', { data })
      .then(res => {
        console.log(res);
        this.setState({ result: res.data.sorted.join(',') });
        this.setState({ user_steps: res.data.steps });
      })
  }

  datatype_handleChange(event) {
    this.setState({ value: event.target.value });
  }
  input_handleChange(event) {
    this.setState({ input: event.target.value });
  }

  // handle submit and make sure input is not empty
  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validate();
    if (this.state.input && isValid) {
      alert('your data type is: ' + this.state.value + ' \nyour input is: ' + this.state.input);
      this.sort_list();
    } else if (!this.state.input) {
      alert('your input is empty!');
    }
  }




  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* chose datatype between integer and string */}
        <label>
          Pick your data type:
          <select value={this.state.value} onChange={this.datatype_handleChange}>
            <option value="string">string</option>
            <option value="integer">integer</option>
          </select>
        </label>
        <br />
        {/* input aera */}
        <label>
          Input:
          <input type="text" value={this.state.input} onChange={this.input_handleChange} />
        </label>
        {/* invalid input error  */}
        <div style={{ color: "red" }}>
          {this.state.inputError}
        </div>
        {/* sumbit button */}
        <br />
        <input type="submit" value="Submit" />
        {/* show sorted result */}
        {this.state.result ? <div>
          <h3> Your sorted array </h3>
          <p> {this.state.result}</p>
        </div> : null}
        {/* show each step   */}
        {this.state.user_steps ? <div>
          <h3> Your steps </h3>
          {this.state.user_steps.map((step, i) => {
            return (
              <li key={i}>
                {step}
              </li>
            )
          })}
        </div> : null}
      </form>
    );
  }
}


export default App;
