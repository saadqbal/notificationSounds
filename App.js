/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import  React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import NotificationSounds, { playSampleSound } from 'react-native-notification-sounds';
import { stopSampleSound } from 'react-native-notification-sounds';

const App: () => React$Node = () => {
  const [soundsList, setSoundsList] = useState({});

  useEffect(() => {
    NotificationSounds.getNotifications('ringtone').then(sounds => {
      console.warn('SOUNDS', JSON.stringify(sounds));
      setSoundsList(sounds)
    });
  }, [])


  renderSound = ({ item }) => {
    // console.warn(item)
    return (
      <TouchableOpacity onPress={() => playSampleSound(item)}>
          <Text style={styles.soundText}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Button color={'red'} title='Stop Sound' onPress={()=>{ stopSampleSound() }} />
            <FlatList
              data={soundsList}
              renderItem={renderSound}
              style={styles.soundsList}
              contentContainerStyle={{ flexGrow: 1, paddingVertical: 8 }}
              keyExtractor={item => item.soundID}
              />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  
  soundsList: {
    backgroundColor: Colors.lighter,
    marginTop: 32,
    paddingHorizontal: 24
  },
  
  soundText: {
    marginTop: 8,
    fontSize: 18,
    paddingVertical: 4,
    fontWeight: '400',
    color: '#ae00ff',
  },
  
  
});

export default App;
