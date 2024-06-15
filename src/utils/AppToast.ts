import Toast from "react-native-toast-message";

const success = (text: string) => {
  Toast.show({
    type: 'success',
    text1: text,
  });
};

const error = (text: string) => {
  Toast.show({
    type: 'error',
    text1: text,
  });
};

export default {success, error}