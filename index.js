/**
 * @format
 */

import {AppRegistry, Platform, UIManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// 启用 Android 实验性支持（必须）
if (UIManager.setLayoutAnimationEnabledExperimental) {
    console.log('enable...动画');
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


AppRegistry.registerComponent(appName, () => App);
