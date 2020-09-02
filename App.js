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
    
    if (soundsList.length > 0) {
      //console.warn(soundsList.length)
      return 
    }
    NotificationSounds.getNotifications('ringtone').then(sounds => {
      console.warn('SOUNDS', JSON.stringify(sounds));
      /* 
      Play the notification sound.
      pass the complete sound object.
        This function can be used for playing the sample sound
    */
     // playSampleSound(sounds[1]);
      setSoundsList(sounds)

    });

  }, [soundsList])


  renderSound = (sound) => {
    
    const item = sound.item;
    // console.warn(item)
    return (<TouchableOpacity
      onPress={() => {
        console.warn(item)
        playSampleSound(item);
      }}
    >
      <Text style={{ color: 'black'}}>{item.title}</Text>
    </TouchableOpacity>)
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            
            <Button title='Stop' onPress={()=>{ stopSampleSound() }} />
            <FlatList
              data={soundsList}
              renderItem={renderSound}
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              keyExtractor={item => item.soundID}
              />

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
