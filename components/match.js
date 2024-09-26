import * as React from 'react';
import {useState, useEffect} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {db, auth} from '../util/firebase';
import {flags} from '../util/flags';

const windowWidth = Dimensions.get('window').width;

const images = {
  background: require('../assets/match-background.png'),
  ball: require('../assets/match-ball.png'),
};

function MatchItem({id, large, gameType, onPress}) {
  const [match, setMatch] = useState('');
  const [playerOneFlag, setPlayerOneFlag] = useState(false);
  const [playerTwoFlag, setPlayerTwoFlag] = useState(false);


  React.useEffect(() => {
    (async () => {
      const match = await db.getMatch(id);
      setMatch(match);

    })();
  }, []);

  const {
    name,
    date,
    live,
    time,
    timezone,
    playerOneFirstName,
    playerOneLastName,
    playerTwoFirstName,
    playerTwoLastName,
    location,
    category,
    round,
    court,
  } = match;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        large && {width: windowWidth * 0.9},
        gameType == 1 && {shadowOpacity: 0},
      ]}
      onPress={onPress}>
      <ImageBackground
        style={[styles.imageContainer, large && {height: '100%'}]}
        imageStyle={{borderRadius: 10}}
        source={images.background}>
        {gameType == null ? (
          <View>
            {/* Header */}
            <View style={styles.headerContainer}>
              {/* Name and date */}
              <View style={styles.headerNameContainer}>
                <Text style={styles.headerText}>{name}</Text>
                <Text style={styles.headerText}>{date}</Text>
              </View>

              {/* Live / time */}
              <View style={styles.liveTimeContainer}>
                {live ? (
                  <View style={styles.liveContainer}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                ) : (
                  <View>
                    <Text>
                      {time} {timezone}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Players */}
            <View style={styles.playersContainer}>
              <View style={styles.playerContainer}>
                <Image
                  style={styles.flag}
                  source={playerOneFlag ? playerOneFlag : images.ball}
                />
                <View style={styles.playerNameContainer}>
                  <Text style={styles.playerNameText}>
                    {playerOneFirstName} {playerOneLastName}
                  </Text>
                </View>
              </View>
              <View style={styles.playerContainer}>
                <Image
                  style={styles.flag}
                  source={playerTwoFlag ? playerTwoFlag : images.ball}
                />
                <View style={styles.playerNameContainer}>
                  <Text style={styles.playerNameText}>
                    {playerTwoFirstName} {playerTwoLastName}
                  </Text>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>{location}</Text>
              <View style={styles.footerInfoContainer}>
                <Text style={styles.footerText}>{category}</Text>
                <View style={styles.footerDot} />
                <Text style={styles.footerText}>{round}</Text>
                <View style={styles.footerDot} />
                {court && <Text style={styles.footerText}>{court}</Text>}
              </View>
            </View>
          </View>
        ) : gameType == 1 ? (
          <View>
            {/* Header */}
            <View
              style={[styles.headerContainer, {justifyContent: 'flex-end'}]}>
              {/* Live / time */}
              <View style={styles.liveTimeContainer}>
                {live ? (
                  <View style={styles.liveContainer}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                ) : (
                  <View>
                    <Text>
                      {time} {timezone}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Players */}
            <View
              style={[
                styles.playersContainer,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              ]}>
              <View>
                <Text>
                  {playerOneFirstName} {playerOneLastName}
                </Text>
              </View>
              <Text style={styles.vsText}>VS</Text>
              <View>
                <Text>{playerTwoFirstName}</Text>
                <Text>{playerTwoLastName}</Text>
              </View>
            </View>

            {/* Footer */}
            <View
              style={[
                styles.footerContainer,
                {backgroundColor: 'transparent'},
              ]}>
              <View style={styles.footerInfoContainer}>
                <Text>{location}</Text>
                <View style={styles.footerDot} />
                <Text>{category}</Text>
                <View style={styles.footerDot} />
                <Text>{round}</Text>
                <View style={styles.footerDot} />
                {court && <Text>{court}</Text>}
              </View>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginRight: 10,
    width: 320,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  headerContainer: {
    padding: 4,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  headerNameContainer: {
    margin: 4,
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  liveTimeContainer: {
    margin: 4,
    padding: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
  },
  liveContainer: {
    flexDirection: 'row',
  },
  liveDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#42AE60',
    marginLeft: 6,
    marginRight: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  playersContainer: {
    marginVertical: 18,
    paddingHorizontal: 16,
  },
  playerContainer: {
    flexDirection: 'row',
  },
  flag: {
    marginRight: 10,
  },
  playerNameContainer: {
    marginTop: 8,
  },
  playerNameText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  vsText: {
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 20,
  },
  footerContainer: {
    backgroundColor: '#42AE60',
    padding: 10,
  },
  footerInfoContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footerDot: {
    width: 8,
    height: 8,
    marginTop: 4,
    marginHorizontal: 6,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
});

export default MatchItem;
