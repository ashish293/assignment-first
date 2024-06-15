import {View, Text} from 'react-native';
import React from 'react';
import {useAppSelector} from '@/redux/hooks';
import {getUser} from '@/redux/userSlice';

const Profile = () => {
  const user = useAppSelector(getUser);
  console.log(user);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
