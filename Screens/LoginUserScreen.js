// Login.js
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { Button, Text, Input, Image} from 'react-native-elements';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        signIn(userCredential.user); // Set the current user
        navigation.navigate('Home'); // Navigate to the Profile screen
      })
      .catch(error => {
        Alert.alert("Login failed", error.message);
      });
  };

  const onSignIn = (user) => {
    // Handle user login
    console.log('User signed in:', user);
  };

  return (
    <View style={styles.container}>
      <View style={{
        width: '100%',
        height: '10%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Image source={require('../images/receiptoLogoNew.png')} 
      containerStyle=
      {{ 
        width: '60%',
        height: undefined,
        aspectRatio: 1.2,
        
        
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
      label="Login"
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
      title="Login"
      titleProps={{}}
      titleStyle={{ 
        marginHorizontal: '5%',
        color: '#080B16'
       }}
      onPress={handleLogin}
    />

    <Text
      style={{color: '#606C94', width: '100%', marginTop: '1%', textAlign: 'center'}}
    >
      Don't have an account?
      <Text
      
      h1Style={{}}
      h2Style={{}}
      h3Style={{}}
      h4Style={{}}
      style={{color: '#fff', width: '30%', marginLeft: '2%'}}
      onPress={() => navigation.navigate('Register')}
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

export default Login;
