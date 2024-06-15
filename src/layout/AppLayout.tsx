import {ActivityIndicator, StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {Overlay, Text} from '@rneui/themed';

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
  return (
    <View style={containerStyle}>
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
