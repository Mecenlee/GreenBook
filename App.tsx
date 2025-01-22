/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Welcome from './android/src/modules/welcome/Welcome';
import Login from './android/src/modules/login/Login';
import MainTab from './android/src/modules/mainTab/MainTab';
import ArticleDetail from './android/src/modules/articleDetail/ArticleDetail';

const Stack = createStackNavigator();

function App(): React.JSX.Element {

  return (
    // 下面这里要用Navigation换成了Provider
    <SafeAreaProvider>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      <NavigationContainer>{/** Navigation容器 */}
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{
            cardStyle: { elevation: 1, }//当前导航栈渲染层级海拔更高
          }}
        >
          <Stack.Screen
            name='Welcome'
            component={Welcome}
            options={{
              //todo
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,//指定页面切换动画
            }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              //todo
              headerShown: false,

              ...TransitionPresets.SlideFromRightIOS,//指定页面切换动画

            }}
          />
          <Stack.Screen
            name='MainTab'
            component={MainTab}
            options={{
              //todo
              headerShown: false,

              ...TransitionPresets.SlideFromRightIOS,//指定页面切换动画

            }}
          />
          <Stack.Screen 
            name='ArticleDetail'
            component={ArticleDetail}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromLeftIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}

export default App;
