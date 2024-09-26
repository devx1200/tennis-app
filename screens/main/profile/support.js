import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {IconButton} from 'react-native-paper';
import {WebView} from 'react-native-webview';

function SupportScreen({navigation}) {
  const goBack = async () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    (async () => {})();
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
        <Text style={styles.headerText}>CUSTOMER SUPPORT</Text>
      </View>
      <WebView source={{uri: 'https://google.com'}} style={styles.web} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#000000',
  },
  web: {
    flex: 0.85,
    marginTop: 20,
  },
});
export default SupportScreen;
