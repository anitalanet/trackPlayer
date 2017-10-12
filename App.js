/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import TrackPlayer from 'react-native-track-player';

export default class App extends Component<{}> {
    componentWillMount(){
        // this.clearTimer()
        TrackPlayer.eventEmitter.addListener('playback-state', (res) => {
            debugger
        });
        TrackPlayer.eventEmitter.addListener('playback-track-changed', (res) => {
            debugger
        });
        TrackPlayer.eventEmitter.addListener('playback-error', (err) => {
            debugger
        });

    }
    constructor (props){
        super(props)
        this.state = {
            duration1:0,
            currentTime1:0
        }
    }

    async setPlayer(){

        debugger
        var track = {
            id: '01',

            url: 'file:///Users/itilak/Documents/myMusic/goriRadha.mp3', // Load media from the network
            // url: require('./avaritia.mp4'), // Load media from the app bundle

            title: 'Avaritia',
            artist: 'deadmau5',
            album: 'while(1<2)',
            genre: 'Progressive House, Electro House',
            date: '2014-05-20T07:00:00+00:00', // RFC 3339

            artwork: 'https://is5-ssl.mzstatic.com/image/thumb/Music/v4/57/0e/87/570e87b0-d994-97f9-e5bd-8428d8753be3/886444175029.jpg/1200x630bb.jpg', // Load artwork from the network
            // artwork: require('./avaritia.jpg'), // Load artwork from the app bundle
        };
        await TrackPlayer.add(track);

        // Starts playing it
        TrackPlayer.play();
        this.setTimer()
    }
    async setNewPlayer(){
        TrackPlayer.setupPlayer({}).then(() => {

            let p = this.setPlayer()
            TrackPlayer.updateOptions({
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE
                ],
            });
        })
    }
    getCurrentTime = () => {
        console.log("aasdasdasd")
        let audioDuration = 0;
        TrackPlayer.getDuration().then((duration) => {
            if (duration) {
                audioDuration = duration;
            }
        });
        TrackPlayer.getPosition().then((currentTime) => {
            if (currentTime) {
                this.setState({currentTime1: currentTime, duration1: audioDuration});
                console.log("Current: ",currentTime)
                console.log("Duration: ",audioDuration)
            }
        });
    };

    setTimer() {
        let interval1Id =  setInterval(() => {
            this.getCurrentTime()
        }, 1000);
        this.setState({
            interval1Id: interval1Id,
        });
    }
    clearTimer() {
        if(this.state.interval1Id != null) {
            clearInterval(this.state.intervalId);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={() => {
                    let playing=this.setNewPlayer()
                }}>
                    set Player!
                </Text>
                <Text style={styles.instructions} onPress={() => {
                    Alert.alert("set timer")
                    TrackPlayer.play()
                    this.setTimer()
                }}>
                    Play Audio
                </Text>
                <Text style={styles.instructions} onPress={() => {

                    TrackPlayer.pause()
                }}>
                    Pause Audio
                </Text>
                <Text style={styles.instructions} onPress={() => {

                    TrackPlayer.reset()
                }}>
                    Reset Audio
                </Text>
                <Text style={styles.instructions}>
                    {"Current:"+this.state.currentTime1}
                </Text>
                <Text style={styles.instructions}>
                    {"Duration:"+this.state.duration1}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor:'red'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
