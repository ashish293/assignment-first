import React, {useState, useEffect} from 'react';
import {View, Button, TextInput, Text, StyleSheet} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const PhoneSignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      setMessage('You have successfully logged in.');
      // Navigate to a different screen or hide the OTP input
    }
  }

  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      setMessage('Failed to send verification code.');
      console.error(error);
    }
  }

  async function confirmCode() {
    try {
      if (confirm) {
        await confirm.confirm(code);
        setMessage('Code confirmed successfully.');
      } else {
        setMessage('No confirmation result available.');
      }
    } catch (error) {
      setMessage('Invalid code.');
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      {!confirm ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            keyboardType="phone-pad"
          />
          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber(phoneNumber)}
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={code}
            onChangeText={text => setCode(text)}
            keyboardType="number-pad"
          />
          <Button title="Confirm Code" onPress={confirmCode} />
        </>
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
});

export default PhoneSignIn;
