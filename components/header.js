import * as React from 'react';

import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

const images = {
  logo: require('../assets/res/logo.png'),
  bell: require('../assets/home-bell.png'),
};

function Header({onPress}) {
  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={images.logo} />
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.bell} source={images.bell} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 160,
    height: 40,
    resizeMode: 'contain',
  },
  bell: {
    width: 20,
    height: 20,
    margin: 10,
  },
});

export default Header;
