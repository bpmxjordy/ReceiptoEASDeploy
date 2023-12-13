import React, { useEffect, useState, isValidElement } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import NfcManager, { NfcEvents, NfcTech } from 'react-native-nfc-manager';
import { TextDecoder } from 'text-encoding';
import { useAuth } from '../AuthContext';


const ReadReceipt = ({navigation}) => {
  const [hasNfc, setHasNFC ] = useState(null);
  const [nfcData, setNfcData] = useState('');
  const [receiptID, setReceiptID] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
 
  }, [])

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported()

      setHasNFC(deviceIsSupported)
      if (deviceIsSupported) {
        readTag();
        await NfcManager.start()
      }
    }

    checkIsSupported()
    
    if (currentUser === undefined || currentUser === null){

    } else {
      
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        console.log('tag found')
        console.log(tag);
        setNfcData(tag);
        getReceipt(tag);
        console.log("Scanning for NFC tags...")
      })
      return () => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      }
    }
  }, [])

  const readTag = async () => {
    console.log("Read tag button");
    await NfcManager.registerTagEvent();
  }

  const getReceipt = (tag) => {
    console.log(tag.ndefMessage);
    try {
      const ndefRecord = tag.ndefMessage[0];
      const bytes = ndefRecord.payload;
      const languageCodeLength = bytes[0] & 0x3F;
      const textContent = bytes.slice(languageCodeLength + 1);

      const textDecoder = new TextDecoder('utf-8');
      const text = textDecoder.decode(new Uint8Array(textContent));
      console.log('NFC Data:', text);

      setReceiptID(text);
      loadReceipt(text);
    } catch (ex) {
      console.warn('Error reading NFC Tag', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  const loadReceipt = async (ReceiptID) => {
    console.log("loadReceiptFunction");
    try {
      //const response = await fetch(`http://192.168.1.145:3000/api/receipts/${ReceiptID}`);
      const response = await fetch(`https://real-pear-leopard-tam.cyclic.app/api/receipts/${ReceiptID}`);
      const newData = await response.json();
      updateUserId(ReceiptID, currentUser.email);
      console.log("Edited receipt with user email")
    } catch(error)
    {
      console.error(error);

    }
    
  }

  const updateUserId = async (receiptId, newUserId) => {
    try {
      //const response = await fetch('http://192.168.1.145:3000/api/receipts/updateUserId', {
        const response = await fetch(`https://real-pear-leopard-tam.cyclic.app/api/receipts/updateUserId`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              receiptId: receiptId,
                newUserId: newUserId,
            }),
    });

        if (response.ok) {
            const data = await response.text();
            console.log('Success:', data);
            readTag();
        } else {
            // Handle HTTP errors
            console.error('HTTP Error:', response.status, response.statusText);
            readTag();
        }
    } catch (error) {
        // Handle network errors
        console.error('Network Error:', error.message);
    }
};

  if (hasNfc === null) return null;

  if (!hasNfc) {
    return (
      console.log("NFC not available")
    )
  }

}

const styles = StyleSheet.create({
  container: {
    display: 'flex', 
    flex: 1, 
    backgroundColor: '#080B16', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  btn: {
    width: '70%',
    height: 'auto',
    padding: '5%',
    borderRadius: 100,
    backgroundColor: '#11182F',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ReadReceipt;
