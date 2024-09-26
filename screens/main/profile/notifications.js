import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Switch,
  FlatList,
} from 'react-native';

import SchoolItem from '../../../components/schoolItem';

import {IconButton} from 'react-native-paper';
import {db, auth} from '../../../util/firebase';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const images = {};

function NotificationsScreen({navigation}) {
  const [allowNotifications, setAllowNotifications] = useState(false);

  const [schools, setSchools] = useState([]);
  const [following, setFollowing] = useState([]);

  const goBack = async () => {
    navigation.goBack();
  };

  const toggleAllow = async () => {
    setAllowNotifications(!allowNotifications);
  };

  const showNotifications = async () => {};
  const showPrivacy = async () => {};
  const showCustomerSupport = async () => {};
  const showAppInfo = async () => {};

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
      alert
      onPressFollow={() => followSchool(item)}
    />
  );

  React.useEffect(() => {
    (async () => {
      const allSchools = await db.getSchools();
      const following = await db.getSchoolsFollowing();

      const schools = [];

      const getSchoolById = id => {
        var s;
        allSchools.forEach(school => {
          if (school.id == id) s = school;
        });
        return s;
      };

      following.forEach(id => {
        const school = getSchoolById(id);
        schools.push(school);
      });

      setSchools(schools);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <IconButton
          icon={'chevron-left'}
          iconColor={'#000000'}
          size={30}
          onPress={goBack}
        />
        <Text style={styles.headerText}>NOTIFICATION</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Allow */}
        <View style={styles.allowContainer}>
          <Text style={styles.allowText}>Allow Notifications</Text>
          <View>
            <Switch
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
              thumbColor={allowNotifications ? '#FFFFFF' : '#F4F4F4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAllow}
              value={allowNotifications}
            />
          </View>
        </View>

        {/* Leagues */}
        <View>
          <View style={styles.schoolsHeaderContainer}>
            <Text style={styles.headerTitle}>LEAGUE ALERTS</Text>
          </View>
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

        {/* Teams */}
        <View>
          <View style={styles.schoolsHeaderContainer}>
            <Text style={styles.headerTitle}>TEAM ALERTS</Text>
          </View>
          <FlatList
            windowSize={2}
            initialNumToRender={2}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}
            style={[styles.schoolsList, {height: 220}]}
            data={schools}
            renderItem={renderSchool}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#000000',
  },
  subText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  contentContainer: {
    flex: 0.84,
    justifyContent: 'space-between',
  },
  allowContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginBottom: 20,
  },
  allowText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 14,
  },
  schoolsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#150000',
    marginLeft: 14,
  },
  schoolDescription: {
    color: '#5B5757',
  },
  schoolsList: {
    padding: 6,
    marginVertical: 10,
    height: 300,
  },
  schoolItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: '#F5F5F5',
    padding: 10,
    paddingVertical: 16,
    marginBottom: 4,
  },
  schoolImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  schoolName: {
    fontWeight: '600',
    color: '#150000',
    marginLeft: 10,
  },
});

export default NotificationsScreen;
