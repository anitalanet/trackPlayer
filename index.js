import { AppRegistry } from 'react-native';
import App from './App';
import TrackPlayer from 'react-native-track-player'


AppRegistry.registerComponent('trackPlayer', () => App);
AppRegistry.registerHeadlessTask('TrackPlayer', () => require('./player-handler.js'));