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
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {Icon} from 'react-native-paper';
import {db} from '../../../util/firebase';

import Header from '../../../components/header';
import FilterItem from '../../../components/filterItem';

import MatchItem from '../../../components/match';

const windowHeight = Dimensions.get('window').height;

const images = {
  logo: require('../../../assets/res/logo.png'),
  bell: require('../../../assets/home-bell.png'),

  live: require('../../../assets/menu-live.png'),
  upcoming: require('../../../assets/menu-matches.png'),
  'on demand': require('../../../assets/menu-live.png'),
};

const filters = ['LIVE', 'UPCOMING', 'ON DEMAND'];

function LiveScreen({navigation}) {
  const [filter, setFilter] = useState('LIVE');

  const [refreshing, setRefreshing] = useState(false);

  const [sections, setSections] = useState([]);

  const clearSections = async () => {
    setSections([]);
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

  const renderSections = () => {
    return sections.map((section, index) => {
      const {id, name, matches} = section;

      const iconImage = images[filter.toLowerCase()];
      const sectionLabel = filter == 'ON DEMAND' ? 'Recent Replays' : filter;

      return (
        <View key={id}>
          {/* Matches List Header */}
          <View style={styles.matchesListHeaderContainer}>
            {/* Icon / Title */}
            <View style={styles.matchesListHeaderTitleContainer}>
              <Image style={styles.matchesListIcon} source={iconImage} />
              <Text style={styles.matchesListTitle}>{sectionLabel}</Text>
              {filter != 'ON DEMAND' && (
                <View style={styles.matchesListTitleContainer}>
                  <View style={styles.matchesListHeaderDot} />
                  <Text style={styles.matchesListTitle}>{name}</Text>
                </View>
              )}
            </View>
            {/* View All */}
            <TouchableOpacity
              style={styles.matchesListHeaderViewAllContainer}
              onPress={() => {
                presentViewAll(id);
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
              index == sections.length - 1 && {marginBottom: 80},
            ]}
            horizontal
            data={matches}
            renderItem={renderMatchItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              !matches.length && refreshing ? (
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
      clearSections();
      setRefreshing(true);
      const fSections = await db.getLiveSections(filter);
      setTimeout(() => {
        setSections(fSections);
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
        {/* Loading */}
        {!sections.length && refreshing && (
          <ActivityIndicator animating={true} />
        )}

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
    alignSelf: 'center',
    //width: '100%',
    height: 50,
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
  matchesListTitleContainer: {
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
  matchesListHeaderDot: {
    marginHorizontal: 6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
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

export default LiveScreen;
