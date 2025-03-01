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
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Welcome from './android/src/modules/welcome/Welcome';
import Login from './android/src/modules/login/Login';
import MainTab from './android/src/modules/mainTab/MainTab';
import ArticleDetail from './android/src/modules/articleDetail/ArticleDetail';
import SearchGoods from './android/src/modules/searchGoods/SearchGoods';
import _updateConfig from './update.json';
import { Pushy, PushyProvider } from "react-native-update";

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const { appKey } = _updateConfig[Platform.OS];
  // 唯一必填参数是appKey，其他选项请参阅 api 文档
  const pushyClient = new Pushy({
    appKey,
    // 注意，默认情况下，在开发环境中不会检查更新
    // 如需在开发环境中调试更新，请设置debug为true
    // 但即便打开此选项，也仅能检查、下载热更，并不能实际应用热更。实际应用热更必须在release包中进行。
    debug: true
  });
  return (
    <PushyProvider
      client={pushyClient}
    >
      {/* // 下面这里要用Navigation换成了Provider */}
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
            <Stack.Screen
              name='SearchGoods'
              component={SearchGoods}
              options={{
                headerShown: false,
                ...TransitionPresets.ModalFadeTransition,
                presentation: 'transparentModal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PushyProvider>

  );
}

export default App;
