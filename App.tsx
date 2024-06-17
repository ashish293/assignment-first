import theme from '@/config/theme';
import Navigator from '@/navigation';
import {persistor, store} from '@/redux/store';
import {ThemeProvider} from '@rneui/themed';
import {StatusBar, useColorScheme} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const StatusBarStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  };
  theme.mode = useColorScheme() || 'light';
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Navigator />
          {/* <Splash /> */}
          <Toast />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
