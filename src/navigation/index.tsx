import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/screens/Home';
import Login from '@/screens/Login';
import {getUser} from '@/redux/userSlice';
import {useAppSelector} from '@/redux/hooks';
import {useEffect, useState} from 'react';
import Splash from '@/screens/Splash';

const Navigator = () => {
  const Tab = createBottomTabNavigator();
  const user = useAppSelector(getUser);
  const [showSplash, setShowSplash] = useState(true);

  setTimeout(() => {
    setShowSplash(false);
  }, 2000);

  if (showSplash) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user.verified ? (
          <Tab.Screen name="Home" component={Home} />
        ) : (
          <Tab.Screen
            name="Login"
            component={Login}
            options={{headerShown: false, tabBarStyle: {display: 'none'}}}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
