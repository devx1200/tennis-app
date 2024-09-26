import * as React from 'react';

import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';

const schoolImages = {
  0: require('../assets/team-logo-1.png'),
  1: require('../assets/team-logo-2.png'),
  2: require('../assets/team-logo-3.png'),
  3: require('../assets/team-logo-4.png'),
  4: require('../assets/team-logo-5.png'),
  5: require('../assets/team-logo-6.png'),
};

function SchoolItem({
  id,
  name,
  following,
  onPressFollow,
  followed,
  alert,
  alerted,
}) {
  const renderRight = () =>
    alert ? (
      <View>
        <Text>{alerted ? 'Off' : 'On'}</Text>
      </View>
    ) : (
      <View>
        <TouchableOpacity
          style={[
            styles.schoolFollowButton,
            following && styles.schoolFollowButtonActive,
          ]}
          onPress={onPressFollow}>
          <Text
            style={[
              styles.schoolItemFollowText,
              following && styles.schoolItemNameActive,
            ]}>
            {followed ? 'UNFOLLOW' : following ? 'FOLLOWING' : 'FOLLOW'}
          </Text>
        </TouchableOpacity>
      </View>
    );

  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <View
      style={[
        styles.schoolItemContainer,
        alert && {backgroundColor: '#FFFFFF', marginBottom: 0},
      ]}>
      <View style={styles.schoolItemSchoolContainer}>
        <Image source={schoolImages[id]} style={styles.schoolImage} />
        <Text style={styles.schoolItemName}>{name}</Text>
      </View>
      {renderRight()}
    </View>
  );
}

const styles = StyleSheet.create({
  schoolItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    paddingVertical: 16,
    marginBottom: 4,
  },
  schoolItemSchoolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schoolImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  schoolItemName: {
    fontWeight: '600',
    color: '#150000',
    marginLeft: 10,
  },
  schoolFollowButton: {
    width: 100,
    height: 32,
    backgroundColor: '#150000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolFollowButtonActive: {
    backgroundColor: '#FF5050',
  },
  schoolItemFollowText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default SchoolItem;
