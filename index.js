/**
 * @format
 */

import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import App from './src/App'
import { name as appName } from './app.json'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
FontAwesome.loadFont()
MaterialCommunityIcons.loadFont()
Ionicons.loadFont()
AppRegistry.registerComponent(appName, () => App)
