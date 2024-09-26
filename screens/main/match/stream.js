import * as React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {Button} from 'react-native-paper';
import {db, auth} from '../../../util/firebase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const images = {
};

function StreamScreen({route, navigation}) {
  const {id} = route.params;

  const [videoURL, setVideoURL] = useState('');
  const videoRef = useRef < VideoRef > null;

  const [live, setLive] = useState('');

  React.useEffect(() => {
    (async () => {
      const match = await db.getMatch(id);
      const {url, live} = match;

      setVideoURL(url);
      setLive(live);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={{uri: videoURL}}
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          style={styles.video}
        />
      </View>
      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  videoContainer: {},
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  playersContainer: {
    flexDirection: 'row',
  },
  playerText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#150000',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoText: {
    color: '#383838',
  },
  infoDot: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: '#383838',
    marginHorizontal: 10,
  },
  matchesContainer: {},
  matchesText: {
    fontSize: 20,
    fontWeight: '400',
  },
});

export default StreamScreen;
