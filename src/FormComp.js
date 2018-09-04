import React, { Component } from 'react';

import {FormErrors} from './FormErrors';

class FormComp extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, 
                    () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  render() {
    return (
      <div className="App">

        <div style={{ padding: '15px', margin: '5px', border: '2px solid grey' }} >
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <form>
          <h2>Sign up</h2>
          <div>
            <label htmlFor="email">Email address</label>
            <input type="email" name="email" 
                   value={this.state.email}
                   onChange={(event) => this.handleUserInput(event)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" 
                   value={this.state.password}
                   onChange={(event) => this.handleUserInput(event)} />
          </div>
          <button type="submit"
                  disabled={!this.state.formValid} > Sign up </button>
        </form>
      </div>
    );
  }
}

export default FormComp;
