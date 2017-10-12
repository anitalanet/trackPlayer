import TrackPlayer from 'react-native-track-player'
module.exports = async (data) => {
  // Handles the player event
    debugger
  console.log(data)
  if (data.type === 'playback-state') {
    // Update the UI with the new state
  } else if (data.type === 'play') {
    // The play button was pressed, we can forward this command to the player using
    debugger
    TrackPlayer.play();
  } else if (data.type === 'remote-stop') {
    // The stop button was pressed, we can stop the player
    TrackPlayer.stop();
  } else if (data.type === 'pause') {
    debugger
    // The play button was pressed, we can forward this command to the player using
    TrackPlayer.pause();
  }
};
