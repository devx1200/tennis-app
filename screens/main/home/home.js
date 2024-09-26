import * as React from 'react';
import {useState, useCallback} from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {Button, Icon, TextInput} from 'react-native-paper';
import {db, auth} from '../../../util/firebase';

import Header from '../../../components/header';
import FilterItem from '../../../components/filterItem';

import MatchItem from '../../../components/match';
import TournamentItem from '../../../components/tournament';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const images = {
  logo: require('../../../assets/res/logo.png'),
  bell: require('../../../assets/home-bell.png'),

  live: require('../../../assets/menu-live.png'),
  tournaments: require('../../../assets/menu-tournaments.png'),
  matches: require('../../../assets/menu-matches.png'),
};

const filters = ['TRENDING', 'PLAYOFFS', 'PICKLEBALL', 'TENNIS'];

const sections = ['live', 'tournaments', 'upcoming', 'replays', 'playoffs'];

const sectionTitles = {
  live: 'LIVE STREAMING',
  tournaments: 'LIVE STREAMING TOURNAMENTS',
  upcoming: 'UPCOMING MATCHES',
  replays: 'RECENT REPLAYS',
  playoffs: 'UPCOMING PLAYOFF MATCHES',
};

function HomeScreen({navigation}) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('TRENDING');

  const [refreshing, setRefreshing] = useState(false);

  const [matches, setMatches] = useState({
    main: [],
    live: [],
    tournaments: [],
    upcoming: [],
    replays: [],
    playoffs: [],
  });

  const clearMatches = async () => {
    setMatches({
      main: [],
      live: [],
      tournaments: [],
      upcoming: [],
      replays: [],
      playoffs: [],
    });
  };

  const presentNotifications = async () => {
    navigation.push('Notifications');
  };

  const applyFilter = async filter => {
    const fQ = filter.toLowerCase();
    setFilter(filter);
  };

  const presentMatch = async id => {
    navigation.push('Match', {id});
  };

  const presentViewAll = async () => {
    navigation.push('Notifications');
  };

  const presentTournament = async id => {
    navigation.push('Tournament', {id});
  };

  const renderMainMatchItem = useCallback(
    ({item}) => (
      <MatchItem
        large
        key={item.id}
        match={item}
        onPress={() => presentMatch(item)}
      />
    ),
    [],
  );

  const renderMatchItem = useCallback(
    ({item}) => (
      <MatchItem
        key={item.id}
        id={item.id}
        onPress={() => presentMatch(item)}
      />
    ),
    [],
  );

  const renderTournamentItem = useCallback(
    ({item}) => (
      <TournamentItem
        key={item.id}
        league={item.league}
        onPress={() => presentTournament(item)}
      />
    ),
    [],
  );

  const renderSections = () => {
    return sections.map(title => {
      const isUpcomingOrPlayoffs = title == 'upcoming' || title == 'playoffs';
      const isReplays = !isUpcomingOrPlayoffs && title == 'replays';
      const iconImage = isUpcomingOrPlayoffs
        ? images['matches']
        : isReplays
        ? images['live']
        : images[title];
      const sectionTitle = sectionTitles[title];

      return (
        <View key={title}>
          {/* Matches List Header */}
          <View style={styles.matchesListHeaderContainer}>
            {/* Icon / Title */}
            <View style={styles.matchesListHeaderTitleContainer}>
              <Image style={styles.matchesListIcon} source={iconImage} />
              <Text style={styles.matchesListTitle}>{sectionTitle}</Text>
            </View>
            {/* View All */}
            <TouchableOpacity
              style={styles.matchesListHeaderViewAllContainer}
              onPress={() => {
                presentViewAll(title);
              }}>
              <Text style={styles.matchViewAllText}>View all</Text>
              <Icon source="chevron-right" color={'#42AE60'} size={20} />
            </TouchableOpacity>
          </View>

          {/* Matches List */}
          <FlatList
            windowSize={2}
            initialNumToRender={2}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}
            style={[
              styles.matchesList,
              title == 'playoffs' && {marginBottom: 140},
            ]}
            horizontal
            data={matches[title]}
            renderItem={
              title == 'tournaments' ? renderTournamentItem : renderMatchItem
            }
            keyExtractor={item => item.id}
            ListEmptyComponent={
              !matches[title].length && refreshing ? (
                <ActivityIndicator animating={true} />
              ) : (
                <View></View>
              )
            }
          />
        </View>
      );
    });
  };

  React.useEffect(() => {
    (async () => {
      clearMatches();
      setRefreshing(true);
      const fMatches = await db.getHomeMatches(filter);
      setTimeout(() => {
        setMatches({...matches, ...fMatches});
        setRefreshing(false);
      }, 500);
    })();
  }, [filter]);

  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header onPress={presentNotifications} />
      {/* Search */}
      <TextInput
        //left={<TextInput.Icon icon="magnify" />}
        style={styles.input}
        textColor="#000000"
        contentStyle={{backgroundColor: '#F4F4F4', borderWidth: 0}}
        placeholder="Team, sport or venue"
        value={search}
        onChangeText={text => setSearch(text)}
      />
      {/* Match Filters */}
      <FlatList
        windowSize={2}
        initialNumToRender={2}
        showsHorizontalScrollIndicator={false}
        style={styles.filtersList}
        horizontal
        data={filters}
        renderItem={({item}) => (
          <FilterItem
            key={item}
            title={item}
            selected={filter == item}
            onPress={() => applyFilter(item)}
          />
        )}
        keyExtractor={item => item}
      />
      <ScrollView
        style={styles.matchesScrollView}
        showsVerticalScrollIndicator={false}>
        {/* Main Matches */}
        <FlatList
          removeClippedSubviews
          maxToRenderPerBatch={4}
          showsHorizontalScrollIndicator={false}
          style={styles.mainMatchesList}
          horizontal
          data={matches['main']}
          renderItem={renderMainMatchItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            !matches['main'].length && refreshing ? (
              <ActivityIndicator animating={true} />
            ) : (
              <View></View>
            )
          }
        />

        {/* Sections */}
        {renderSections()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  input: {
    height: 40,
    marginVertical: 20,
  },
  filtersList: {
    width: '100%',
    height: 50,
  },
  filterItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEDED',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  filterItemContainerActive: {
    backgroundColor: '#42AE60',
  },
  filterItemTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  filterItemTitleActive: {
    color: '#FFFFFF',
  },
  matchesScrollView: {
    marginTop: 10,
    paddingVertical: 10,
    height: windowHeight * 0.78,
  },
  mainMatchesList: {
    //height: 248,
    padding: 6,
    paddingBottom: 20,
  },
  matchesListHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  matchesListHeaderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchesListHeaderViewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchesListIcon: {
    width: 20,
    height: 20,
    tintColor: '#42AE60',
    marginRight: 10,
  },
  matchesListTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  matchViewAllText: {
    fontWeight: '600',
    color: '#42AE60',
  },
  matchesList: {
    padding: 6,
    //height: 248,
    width: '100%',
    paddingBottom: 20,
  },
});

export default HomeScreen;
