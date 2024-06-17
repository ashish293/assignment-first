import React from 'react';
import AppLayout from '@/layout/AppLayout';
import {makeStyles} from '@rneui/themed';
import {Image} from '@rneui/themed';

const useStyle = makeStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
}));

const Splash = () => {
  const styles = useStyle();
  return (
    <AppLayout containerStyle={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
    </AppLayout>
  );
};

export default Splash;
