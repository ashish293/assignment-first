import theme from '@/config/theme';
import Navigator from '@/navigation';
import {store} from '@/redux/store';
import {ThemeProvider} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigator />
        <Toast />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
