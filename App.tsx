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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  theme.mode = useColorScheme() || 'light';
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Navigator />
          <Toast />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
