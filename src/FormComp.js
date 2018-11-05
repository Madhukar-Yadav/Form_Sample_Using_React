import React, { Component } from 'react';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import NumberInput from 'grommet/components/NumberInput';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

class FormComp extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      temp: 25,
      humidity: 15,
      oxygenLevel: 30,
      formErrors: {tempErr: '', humidityErr: '', oxygenLevelErr:'' }
      ,Health: 'Good'
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.SubmitForm = this.SubmitForm.bind(this);
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name+": "+value);
    if(name === 'temp'){
      if(value <= 15 ){
        this.state.formErrors.tempErr = 'Temp cannot be less than 15';
      }else if(value >= 55 ){
        this.state.formErrors.tempErr = 'Temp cannot be greater than 55';
      }else{
        this.state.formErrors.tempErr = '';
      }
    }else if(name === 'oxygenLevel'){
      if(value <= 30 ){
        this.state.formErrors.oxygenLevelErr = 'Oxygen Level cannot be less than 30';
      }else if(value >= 80 ){
        this.state.formErrors.oxygenLevelErr = 'Oxygen Level cannot be greater than 80';
      }else{
        this.state.formErrors.oxygenLevelErr = '';
      }
    }else if(name === 'humidity'){
      if(value <= 5 ){
        this.state.formErrors.humidityErr = 'Humidity cannot be less than 5';
      }else if(value >= 65 ){
        this.state.formErrors.humidityErr = 'Humidity cannot be greater than 65';
      }else{
        this.state.formErrors.humidityErr = '';
      }
    }else{ }
    this.setState({ [name]: value });
  }

  SubmitForm(){
    var val = 'Good';
    if(parseInt(this.state.temp, 10) + parseInt(this.state.humidity) + parseInt(this.state.oxygenLevel) < 40 ){
      val = 'Poor';
    }else if(parseInt(this.state.temp) + parseInt(this.state.humidity) + parseInt(this.state.oxygenLevel) > 100 ){
      val = 'Danger';
    }else{
      val = 'Good';
    }
    this.setState({Health: val});
  }

  render() {

    return (
      <div className="App">

        <Box direction='row' pad={{between: 'large'}} >          
          <Box>            
            <Box direction='row' pad={{between: 'small'}} >
                <Box pad={{between: 'small'}} >
                    <Box separator='all' pad='small' >
                      <h4> Poor : </h4>
                      <h5> Summation of all 3 less than 40 </h5>
                    </Box>
                    <Box separator='all' pad='small' >
                      <h4> Good : </h4>
                      <h5> Summation of all 3 between 40 & 100 </h5>
                    </Box>
                    <Box separator='all' pad='small' >
                      <h4> Danger : </h4>
                      <h5> Summation of all 3 greater than 100 </h5>
                    </Box>
                </Box>
                <Box separator='all' pad='small' >
                      <h4> Validation : </h4>
                      <h5> Temperature cannot be less than 15 </h5>
                      <h5> Humidity cannot be less than 5 </h5>
                      <h5> Oxygen Level cannot be less than 30 </h5>
                    </Box>

            </Box>
          </Box>
          <Form style={{maxWidth: '300px' }} >
            <FormField label='Temperature' error={this.state.formErrors.tempErr} >
              <NumberInput name='temp' step={10}
                          value={this.state.temp}
                          onChange={(e) => this.handleUserInput(e)} />
            </FormField>
            <FormField label='Humidity' error={this.state.formErrors.humidityErr} >
              <NumberInput name='humidity' value={this.state.humidity} step={5}
                          onChange={(e) => this.handleUserInput(e)} />
            </FormField>
            <FormField label='Oxygen Level' error={this.state.formErrors.oxygenLevelErr} >
              <NumberInput name='oxygenLevel' value={this.state.oxygenLevel} step={10}
                          onChange={(e) => this.handleUserInput(e)} />
            </FormField>
            {this.state.formErrors.tempErr === '' && this.state.formErrors.humidityErr === '' && this.state.formErrors.oxygenLevelErr === '' ?
              <Button onClick={this.SubmitForm} primary={true} label='Check' style={{margin: '10px 0'}} /> 
            :
              <Button primary={true} label='Check' style={{margin: '10px 0'}} /> }
            <Box pad='small' >
              <h3>Health Status: {this.state.Health}</h3>
            </Box>
          </Form>          
        </Box>
      </div>
    );
  }
}

export default FormComp;
