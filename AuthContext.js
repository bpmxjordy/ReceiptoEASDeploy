import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, retrieve user info from secure storage
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('currentUser');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Error reading user from SecureStore:', error);
      } finally {
        setLoading(false); // Done checking
      }
    };
    loadUserFromStorage();
  }, []);

  /**
   * signIn: when user logs in successfully, 
   * store their details in state & in secure storage
   */
  const signIn = async (user) => {
    try {
      setCurrentUser(user);
      await SecureStore.setItemAsync('currentUser', JSON.stringify(user));
    } catch (error) {
      console.log('Error storing user in SecureStore:', error);
    }
  };

  /**
   * signOut: clear currentUser from state and secure storage
   */
  const signOut = async () => {
    try {
      setCurrentUser(null);
      await SecureStore.deleteItemAsync('currentUser');
    } catch (error) {
      console.log('Error removing user from SecureStore:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
