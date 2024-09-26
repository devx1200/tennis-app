import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import SchoolItem from '../../../components/schoolItem';

import {IconButton} from 'react-native-paper';

import {db} from '../../../util/firebase';

const images = {
  logo: require('../../../assets/res/logo-white.png'),
};

function FollowScreen({navigation}) {
  const [schools, setSchools] = useState([]);
  const [following, setFollowing] = useState([]);

  const goBack = async () => {
    navigation.goBack();
  };

  const followSchool = async ({id}) => {
    const isFollowing = following.includes(id);
    const cloneFollowing = following.slice();

    if (isFollowing) {
      cloneFollowing.splice(following.indexOf(id), 1);
      setFollowing(cloneFollowing);
    } else {
      setFollowing([...following, id]);
    }
  };

  const renderSchool = ({item}) => (
    <SchoolItem
      id={item.id}
      name={item.name}
      following={following.includes(item.id)}
      onPressFollow={() => followSchool(item)}
    />
  );

  React.useEffect(() => {
    (async () => {
      const schools = await db.getSchools();
      setSchools(schools);

      const following = await db.getSchoolsFollowing();
      setFollowing(following);
    })();
  }, []);

  return (
    <View style={styles.container} keyboardVerticalOffset={-240}>
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <IconButton
            style={{marginLeft: -20, marginTop: -20, margin: 0}}
            icon={'chevron-left'}
            iconColor={'#FFFFFF'}
            size={50}
            onPress={goBack}
          />
          <Image style={styles.logo} source={images.logo} />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>FOLLOW YOUR FAVORITE SCHOOLS</Text>
          <Text style={styles.subText}>
            Find all of your favorite schools or organizations to follow to make
            sure you dont miss any games!
          </Text>
        </View>
      </View>

      {/* Schools List */}
      <FlatList
        windowSize={2}
        initialNumToRender={2}
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        style={styles.schoolsList}
        data={schools}
        renderItem={renderSchool}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#42AE60',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  logo: {
    width: 160,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  headerTextContainer: {
    marginTop: 0,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 0.84,
    justifyContent: 'space-between',
    margin: 14,
  },
  schoolsList: {
    padding: 6,
    paddingBottom: 20,
  },
});

export default FollowScreen;
