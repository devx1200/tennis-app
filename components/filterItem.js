import * as React from 'react';

import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const images = {
  logo: require('../assets/res/logo.png'),
  bell: require('../assets/home-bell.png'),
};

function FilterItem({title, selected, onPress}) {
  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.filterItemContainer,
        selected && styles.filterItemContainerActive,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.filterItemTitle,
          selected && styles.filterItemTitleActive,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filterItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEDED',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 110,
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
});

export default FilterItem;
