import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

import SchoolItem from '../../../components/schoolItem';

import {IconButton} from 'react-native-paper';
import {db, auth} from '../../../util/firebase';

const images = {
  logo: require('../../../assets/res/logo-white.png'),
};

function ProfileScreen({navigation}) {
  const [schools, setSchools] = useState([]);
  const [following, setFollowing] = useState([]);

  const addSchool = async () => {
    navigation.push('Follow');
  };

  const showNotifications = async () => {
    navigation.push('Notifications');
  };
  const showPrivacy = async () => {
    navigation.push('Privacy');
  };
  const showCustomerSupport = async () => {
    navigation.push('Support');
  };
  const showAppInfo = async () => {
    navigation.push('Info');
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
      followed
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
    <View style={styles.container} keyboardVerticalOffset={-240}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={images.logo} />

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>WELCOME TO YOUR TENNIS TV ID</Text>
          <Text style={styles.subText}>
            This is your profile section and here you can find all of your
            favorite organizations and schools!
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Schools */}
        <View>
          <View style={styles.schoolsHeaderContainer}>
            <Text style={styles.headerTitle}>MY SCHOOLS</Text>
            <IconButton
              icon={'plus'}
              iconColor={'#000000'}
              size={20}
              onPress={addSchool}
            />
          </View>
          <Text style={styles.schoolDescription}>
            Follow your favorite teams for personalized content and
            recommendations.
          </Text>
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

        {/* Options */}
        <View>
          <Text style={styles.headerTitle}>OTHER OPTIONS</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={showNotifications}>
              <Text style={styles.optionText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={showPrivacy}>
              <Text style={styles.optionText}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={showCustomerSupport}>
              <Text style={styles.optionText}>Customer Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={showAppInfo}>
              <Text style={styles.optionText}>App Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  logo: {
    resizeMode: 'contain',
    width: 160,
    height: 40,
  },
  headerTextContainer: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
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
  schoolsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#150000',
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
  optionsContainer: {
    marginTop: 6,
  },
  optionContainer: {
    marginVertical: 4,
  },
  optionText: {
    color: '#5B5757',
  },
});

export default ProfileScreen;
