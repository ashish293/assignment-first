import {
  ActivityIndicator,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Overlay, Text, useTheme} from '@rneui/themed';

interface AppLayoutProps {
  loading?: string;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  loading,
  containerStyle,
}) => {
  const {theme} = useTheme();

  return (
    <View style={[{backgroundColor: theme.colors.background}, containerStyle]}>
      <StatusBar
        barStyle={theme.mode == 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {children}
      <Overlay
        isVisible={!!loading}
        onBackdropPress={() => null}
        overlayStyle={{width: '80%', padding: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
          <Text style={{paddingLeft: 10, width: '90%'}}>{loading}</Text>
        </View>
      </Overlay>
    </View>
  );
};

export default AppLayout;
