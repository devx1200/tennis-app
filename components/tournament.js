import * as React from 'react';
import {useState} from 'react';

import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const tournaments = {
  0: {
    name: 'Premier League',
    image: require('../assets/team-logo-1.png'),
  },
  1: {
    name: 'Premier League',
    image: require('../assets/team-logo-2.png'),
  },
  2: {
    name: 'CBF League',
    image: require('../assets/team-logo-3.png'),
  },
  3: {
    name: 'LIGUE 1 League',
    image: require('../assets/team-logo-4.png'),
  },
  4: {
    name: 'Korean League',
    image: require('../assets/team-logo-5.png'),
  },
  5: {
    name: 'Tennis League',
    image: require('../assets/team-logo-6.png'),
  },
  6: {
    name: 'Ball League',
    image: require('../assets/team-logo-7.png'),
  },
};

function TournamentItem({league, onPress}) {
  const [tournament, setTournament] = useState('');

  React.useEffect(() => {
    (async () => {
      const tournament = tournaments[league];
      setTournament(tournament);
    })();
  }, []);

  const {name, image} = tournament;

  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={image} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#EDEDED',
    borderRadius: 6,
  },
  logo: {},
  name: {
    textAlign: 'center',
    marginTop: 10,
    width: '70%',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TournamentItem;
