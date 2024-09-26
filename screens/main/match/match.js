import * as React from 'react';
import {useState, useEffect, useRef} from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import Video, {VideoRef} from 'react-native-video';

import {db, auth} from '../../../util/firebase';

const images = {

};

function MatchScreen({route, navigation}) {
  const {id} = route.params;

  const [videoURL, setVideoURL] = useState('');
  const videoRef = useRef < VideoRef > null;

  const [name, setName] = useState('');

  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');

  const [playerOneFirstName, setPlayerOneFirstName] = useState('');
  const [playerOneLastName, setPlayerOneLastName] = useState('');

  const [playerTwoFirstName, setPlayerTwoFirstName] = useState('');
  const [playerTwoLastName, setPlayerTwoLastName] = useState('');

  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [round, setRound] = useState('');
  const [court, setCourt] = useState('');

  const [matches, setMatches] = useState([]);

  const presentMatch = async id => {
    navigation.push('Match', {id});
  };

  React.useEffect(() => {
    (async () => {
      const match = await db.getMatch(id);
      const matches = await db.getMoreMatches();

      const {
        url,
        name,
        playerOneFirstName,
        playerOneLastName,
        playerTwoFirstName,
        playerTwoLastName,
        location,
        category,
        round,
        court,
      } = match;

      setVideoURL(url);

      setName(name);

      setPlayerOneFirstName(playerOneFirstName);
      setPlayerOneLastName(playerOneLastName);

      setPlayerTwoFirstName(playerTwoFirstName);
      setPlayerTwoLastName(playerTwoLastName);

      setLocation(location);
      setCategory(category);
      setRound(round);
      setCourt(court);

      setMatches(matches);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Video */}
      <View style={styles.videoContainer}>
        <Video
          source={{uri: videoURL}}
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          style={styles.video}
        />
      </View>

      {/* Players */}
      <View style={styles.playersContainer}>
        <Text>
          {playerOneFirstName} / {playerOneLastName}
        </Text>
        <Text>VS</Text>
        <Text>
          {playerTwoFirstName} / {playerTwoLastName}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text>{location}</Text>
        <View style={styles.infoDot} />
        <Text>{category}</Text>
        <View style={styles.infoDot} />
        <Text>{court}</Text>
        <View style={styles.infoDot} />
      </View>

      {/* Matches */}
      <View style={styles.matchesContainer}>
        <Text style={styles.matchesText}>MORE MATCHES</Text>
        <FlatList
          data={matches}
          renderItem={({item}) => (
            <MatchItem match={item} onPress={() => presentMatch(item.id)} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
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

export default MatchScreen;
