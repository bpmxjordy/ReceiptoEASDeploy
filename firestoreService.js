// firestoreService.js
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig'; // adjust the path if needed

/**
 * Creates a user profile document in Firestore under the "users" collection.
 * This document includes the user's uid, email, displayName, and an empty friends array.
 *
 * @param {object} user - The user object from Firebase Authentication.
 */
export const createUserProfileDocument = async (user) => {
  if (!user) return;

  // Create a reference to a document in the "users" collection using the user's uid
  const userRef = doc(db, 'users', user.uid);

  // Attempt to fetch the document to check if it already exists
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    try {
      // If the document doesn't exist, create it with the initial data
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Anonymous',
        friends: [], // This array will hold UIDs of friends in the future
        createdAt: serverTimestamp(),
      });
      console.log('User profile created successfully!');
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }
};
