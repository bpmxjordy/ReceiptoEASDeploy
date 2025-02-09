// Screens/LoginUserScreen.js
import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, Text, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../AuthContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // userCredential.user -> { uid, email, ... } from Firebase
        signIn(userCredential.user); // Store user in AuthContext & Secure Store
        // Navigation to 'Home' is handled by RootNavigator because currentUser is now set
        // but you can force nav if you want:
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Login failed', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/receiptoLogoNew.png')}
          containerStyle={styles.logoImage}
        />
      </View>

      <Input
        containerStyle={styles.emailContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{ color: 'white' }}
        leftIcon={<Icon name="account-outline" size={20} color="white" />}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        containerStyle={styles.passwordContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{ color: 'white' }}
        leftIcon={<Icon name="key" size={20} color="white" />}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        buttonStyle={styles.loginButton}
        containerStyle={{ margin: '5%' }}
        titleStyle={{ color: '#080B16' }}
        title="Login"
        onPress={handleLogin}
      />

      <Text style={styles.registerText}>
        Don't have an account?
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          {' '}Click here
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#080B16',
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
  },
  logoContainer: {
    width: '100%',
    height: '10%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '60%',
    height: undefined,
    aspectRatio: 1.2,
  },
  emailContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  passwordContainer: {
    width: '90%',
    marginLeft: '5%',
    marginBottom: '-5%',
  },
  inputContainer: {
    paddingLeft: '5%',
    backgroundColor: '#11182F',
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  loginButton: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '70%',
    marginLeft: '15%',
    justifyContent: 'center',
  },
  registerText: {
    color: '#606C94',
    width: '100%',
    marginTop: '1%',
    textAlign: 'center',
  },
  registerLink: {
    color: '#fff',
    marginLeft: '2%',
  },
});
