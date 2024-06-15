import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/screens/Home';
import Login from '@/screens/Login';
import {getUser} from '@/redux/userSlice';
import {useAppSelector} from '@/redux/hooks';

const Navigator = () => {
  const Tab = createBottomTabNavigator();
  const user = useAppSelector(getUser);
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
