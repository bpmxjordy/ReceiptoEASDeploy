// Register.js
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ReadReceipt from './ReadReceipt';

const Register = ({navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Handle successful registration
        Alert.alert("Registration Successful", "You are now registered!");
        navigation.navigate("Login");
      })
      .catch(error => {
        Alert.alert("Registration failed", error.message);
      });
  };

  return (
<View style={styles.container}>
<ReadReceipt/>
      <View style={{
        width: '100%',
        height: '10%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Image source={require('../images/receiptoLogoDarkText.png')} 
      containerStyle=
      {{ 
        width: '60%',
        height: undefined,
        aspectRatio: 1.3,
        
        
      }}/>
    
      {/* <Text
      
      h1Style={{}}
      h2Style={{}}
      h3Style={{}}
      h4Style={{}}
      style={{color: '#fff', width: '100%', height: '50%', textAlign: 'center', fontSize: 35, marginTop: 2}}
    >
      Receipto

    </Text> */}
      </View>
      
    <Input
      containerStyle=
      {{ 
        width: '90%',
        marginLeft: '5%'
      }}
      disabledInputStyle={{ background: "#ddd" }}
      inputContainerStyle={{paddingLeft: '2%', backgroundColor: '#11182F', borderRadius: 10, borderBottomWidth: 0}}
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{color: 'white'}}
      label="Register"
      labelStyle={{marginBottom: 15}}
      labelProps={{}}
      leftIcon={<Icon name="account-outline" size={20} color="white" />}
      leftIconContainerStyle={{marginLeft: '5%', marginRight: '5%'}}
      rightIcon={{}}
      rightIconContainerStyle={{}}
      placeholder="Email"
      value={email} 
      onChangeText={setEmail}
    />

<Input
      containerStyle=
      {{ 
        width: '90%',
        marginLeft: '5%',
        marginBottom: '-5%'
      }}
      disabledInputStyle={{ background: "#ddd" }}
      inputContainerStyle={{
        paddingLeft: 2, 
        backgroundColor: '#11182F', 
        borderRadius: 10, 
        borderBottomWidth: 0
      }}
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{color: 'white'}}
      labelStyle={{}}
      labelProps={{}}
      leftIcon={<Icon name="key" size={20} color="white" />}
      leftIconContainerStyle={{marginLeft: '5%', marginRight: '5%'}}
      rightIcon={{}}
      rightIconContainerStyle={{}}
      placeholder="Password"
      value={password} 
      onChangeText={setPassword} 
      secureTextEntry
    />
    <Button
      buttonStyle={{
        borderRadius: 10,
        backgroundColor: '#fff',
        width: '70%',
        marginLeft: '15%',
        justifyContent: 'center'
      }}
      containerStyle={{ margin: '5%' }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00F",
      }}
      disabledTitleStyle={{ color: "#00F" }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      title="Register"
      titleProps={{}}
      titleStyle={{ 
        marginHorizontal: '5%',
        color: '#080B16'
       }}
      onPress={handleRegister}
    />
    <Text
      style={{color: '#606C94', width: '100%', marginTop: '1%', textAlign: 'center'}}
    >
      Already have an account?
      <Text
      
      h1Style={{}}
      h2Style={{}}
      h3Style={{}}
      h4Style={{}}
      style={{color: '#fff', width: '30%', marginLeft: '5%'}}
      onPress={() => navigation.navigate('Login')}
    >
      Click here
    </Text>
    </Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#080B16',
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
  },
  input: {
    marginBottom: '20%',
    borderWidth: 1,
    padding: '10%',
  },
});

export default Register;
