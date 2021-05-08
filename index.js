/**
 * @format
 */

import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import App from './src/App'
import { name as appName } from './app.json'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
FontAwesome.loadFont()
AppRegistry.registerComponent(appName, () => App)
