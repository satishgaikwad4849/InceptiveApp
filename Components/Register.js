import React, {Component} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Card,
} from 'native-base';
import * as yup from 'yup';
import {Formik} from 'formik';
import {StyleSheet,View} from 'react-native';
import {StateCity} from './StateCity';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName:'',
      emailAddress: '',
      phone: '',
      password: '',
      confirmPassword: '',
      state_s: '',
      city: StateCity,
      client:''
    };

  }
  render() {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName:'',
          emailAddress: '',
          phone:'',
          password: '',
          confirmPassword: '',
        } }
        onSubmit={(values) => {
          console.log(values);
          AsyncStorage.setItem('key',values.firstName);
          this.props.navigation.navigate("Home");
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string().required('Please, provide your First Name!'),
          lastName: yup.string().required('Please, provide your Last Name!'),
          emailAddress: yup
            .string()
            .email()
            .required(`Coudn't find your Email Account`),
          phone:yup
            .string()
            .min(10)
            .max(10, 'Mobile No should not excced 10 chars.')
            .required('Mobile No is required'),
          password: yup
            .string()
            .min(8)
            .max(10, 'Password should not excced 10 chars.')
            .required(),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Confirm Password must matched Password')
            .required('Confirm Password is required'),
        })}>
        {(formikProps) => (
          <React.Fragment>
            <Container>
              <Content>
                <Card style={styles.card}>
                  <Form style={styles.form}>
                    <Item>
                      <Label>First Name</Label>
                      <Input
                        onBlur={() => formikProps.setFieldTouched('firstName')} 
                        autoCorrect={false}
                        value={this.props.firstName}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onChangeText={formikProps.handleChange('firstName')} />   
                    </Item>
                    <Text style={styles.text_err}>
                      {formikProps.touched.firstName && 
                        formikProps.errors.firstName && (
                          <Text style={styles.text_error}>
                            {formikProps.errors.firstName}
                          </Text>
                        )}
                    </Text>
                    <Item>
                      <Label>Last Name</Label>
                      <Input
                        onBlur={() => formikProps.setFieldTouched('lastName')} 
                        autoCorrect={false}
                        value={this.props.lastName}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onChangeText={formikProps.handleChange('lastName')} />
                    </Item>
                    <Text style={styles.text_err}>
                      {formikProps.touched.lastName && 
                        formikProps.errors.lastName && 
                          (<Text style={styles.text_error}>
                            {formikProps.errors.lastName}
                          </Text>
                        )}
                    </Text>
                    <Item fixed>
                      <Label>E-mail Address</Label>
                      <Input
                        onBlur={() => formikProps.setFieldTouched('emailAddress')} 
                        autoCapitalize="none"
                        value={this.props.emailAddress}
                        onChangeText={formikProps.handleChange('emailAddress')}
                      />
                    </Item>
                    <Text style={styles.text_err}>
                      {formikProps.touched.emailAddress &&
                        formikProps.errors.emailAddress && (
                          <Text style={styles.text_error}>
                            {formikProps.errors.emailAddress}
                          </Text>
                        )}
                    </Text>
                    <Item>
                      <Label>Mobile No</Label>
                      <Input
                        onChangeText={formikProps.handleChange('phone')}
                        onBlur={() => formikProps.setFieldTouched('phone')}
                        secureTextEntry={true}
                        placeholder='+91766554433'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'phone-pad'}
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        //value={this.state.phone}
                        // onFocus={(val) => this.onChangeText('phone', val)}
                      />
                    </Item>
                    <Text style={{marginLeft:20}}>
                      {formikProps.touched.phone &&
                        formikProps.errors.phone && (
                          <Text style={styles.text_error}>
                            {formikProps.errors.phone}
                          </Text>
                        )}
                    </Text> 
                    <StatePicker city={this.state.city}/>
                    <Item>
                      <Label>Password</Label>
                      <Input
                        onChangeText={formikProps.handleChange('password')}
                        secureTextEntry={true} 
                        onBlur={() => formikProps.setFieldTouched('password')}
                      />
                    </Item>
                    <Text style={styles.text_err}>
                      {formikProps.touched.password &&
                        formikProps.errors.password && (
                          <Text style={styles.text_error}>
                            {formikProps.errors.password}
                          </Text>
                        )}
                    </Text>
                    <Item>
                      <Label>Confirm Password</Label>
                      <Input
                        onChangeText={formikProps.handleChange('confirmPassword')}
                        onBlur={() => formikProps.setFieldTouched('confirmPassword')}
                        secureTextEntry={true}
                      />
                    </Item>
                    <Text style={styles.text_err}>
                      {formikProps.touched.confirmPassword &&
                        formikProps.errors.confirmPassword && (
                          <Text style={{ fontSize: 12, color: '#FF0D10' }}>
                            {formikProps.errors.confirmPassword}
                          </Text>
                        )}
                    </Text> 
                  </Form>
                  <Button
                    style={styles.submit_btn}
                    onPress={formikProps.handleSubmit}>
                    <Text style={styles.submit_btn_txt}>Register</Text>
                  </Button> 
                  {/* <Text>{this.state.city[0].city.map((item)=><Text>{item}</Text>)}</Text> */}
                </Card>
              </Content>
            </Container>
          </React.Fragment>
        )}
      </Formik>
    );
  }
}

export default Register;

class  StatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selected_state:'',
      cities: []
    }
  }
  onChangeStatePicker = (itemValue,itemIndex )=>{
    console.log(itemValue);
    this.setState({selected_state: itemValue});
    this.setCities(itemValue);
  }

  setCities = (selected_state) => {
    let that = this;
    let state = this.props.city.find(function (item) {
      return item.state == selected_state;
    });
    console.log("state.cities");
    console.log(state);
    this.setState({cities: state["cities"]});
  }
  render() {
    const StateCity_props = this.props.city;
    return (
      <View>
        <Item>
          <Label>State</Label>
          <Picker
            selectedValue={this.state.selected_state}
            style={{marginLeft: 80 ,height: 50, width: 160}}
            onValueChange={this.onChangeStatePicker}>
            {StateCity_props.map((item, index) =>
              <Picker.Item label={item.state} value={item.state} key={index} />
            )}
          </Picker>
        </Item>
        {console.log(this.state.cities)}
        <CityPicker cities={this.state.cities} />
      </View>
    );
}
}
class CityPicker extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      selected_city:''
    }
  }
  onChangeCityPicker=(itemValue,itemIndex)=>{
    this.setState({selected_city:itemValue})
  }
  render() {
    return (
      <View>
        <Item>
          <Label>City</Label>
          <Picker
            selectedValue={this.state.selected_city}
            style={{marginLeft: 80 ,height: 50, width: 160}}
            onValueChange={this.onChangeCityPicker}>
            {console.log(this.props.cities)}
            {this.props.cities.map((item, index) =>
              <Picker.Item label={item} value={item} key={index} />
            )}
          </Picker>
        </Item>
        {/* <Text >{StateCity_props.filter(function(item){return item.state==state_props}).map((item)=><Text>{item.city.map(item_=><Text>{item_}</Text>)}</Text>)}</Text> */}
      </View>
    )
 }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  card: {
    marginTop: 10,
    width: 350,
    marginLeft: 20, 
    height: 700,
  },
  form:{
    marginTop: 20,
    marginLeft: 25,
    width: 300
  },
  text_err:{
    marginLeft:20,
  },
  text_error: {
    fontSize: 12,
    color: '#FF0D10'
  },
  submit_btn: {
    marginTop:40,
    marginLeft:25,
    width:300,
    backgroundColor: '#052c65'
  },
  submit_btn_txt:{
    marginLeft:110
  }
});
