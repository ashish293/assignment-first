import CountryCodePicker from '@/Components/CountryCodePicker';
import AppLayout from '@/layout/AppLayout';
import {useAppDispatch} from '@/redux/hooks';
import {setAuthUser} from '@/redux/userSlice';
import AppToast from '@/utils/AppToast';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Button, Input, makeStyles} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
    maxWidth: '80%',
  },
  message: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingStart: 0,
  },
}));

const PhoneSignIn: React.FC = () => {
  const styles = useStyles();
  const [countryCode, setCountryCode] = useState('91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState<string>('');
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      console.log('You have successfully logged in.');
      // Navigate to a different screen or hide the OTP input
    }
  }

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      AppToast.error('Phone number cannot be empty');
    } else if (phoneNumber.length !== 10) {
      AppToast.error('Phone number must be 10 digits');
    } else return true;
  };

  const signInWithPhoneNumber = async () => {
    if (!validatePhoneNumber()) return;
    try {
      setLoading('Sending verification code');
      console.log(`+${countryCode}${phoneNumber}`);

      const confirmation = await auth().signInWithPhoneNumber(
        `+${countryCode}${phoneNumber}`,
      );
      setConfirm(confirmation);
    } catch (error) {
      AppToast.error('Failed to send verification code.');
      console.error(error);
    } finally {
      setLoading('');
    }
  };

  useEffect(() => {
    console.log(confirm);
  }, [confirm]);
  const confirmCode = async (code: string) => {
    try {
      if (confirm) {
        setLoading('Confirming code');
        await confirm.confirm(code);
        AppToast.success('Code confirmed successfully.');
        dispatch(setAuthUser({phone: `+${countryCode}${phoneNumber}`}));
      } else {
        AppToast.error('No confirmation result available.');
      }
    } catch (error) {
      AppToast.error('Invalid code.');
      console.error(error);
    } finally {
      setLoading('');
    }
  };

  const onFilled = (code: string) => {
    Keyboard.dismiss();
    confirmCode(code);
  };
  return (
    <AppLayout containerStyle={styles.container} loading={loading}>
      <View style={styles.phoneContainer}>
        <CountryCodePicker
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
        <Input
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          containerStyle={styles.inputContainer}
        />
      </View>
      <Button title="Send Verification Code" onPress={signInWithPhoneNumber} />
      {confirm && (
        <OtpInput
          onTextChange={setOtp}
          onFilled={onFilled}
          theme={{containerStyle: {padding: 40}}}
        />
      )}
    </AppLayout>
  );
};

export default PhoneSignIn;
