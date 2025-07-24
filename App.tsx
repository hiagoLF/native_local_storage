import React, { useEffect, useRef } from 'react';
import {
  Alert,
  EventSubscription,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState<string | null>(null);
  const [key, setKey] = React.useState<string | null>(null)

  const listenerSubscription = useRef<EventSubscription | null>(null)

  useEffect(() => {
    listenerSubscription.current = NativeLocalStorage?.onKeyAdded(pair => {
      Alert.alert(`New key added: ${pair.key} with value ${pair.value}`)
    })

    return () => {
      listenerSubscription.current?.remove()
      listenerSubscription.current = null
    }
  }, [])

  const [editingValue, setEditingValue] = React.useState<
    string | null
  >(null);

  function saveValue() {
    if (key === null) {
      Alert.alert('Please enter a key')
      return;
    }

    NativeLocalStorage?.setItem(editingValue ?? EMPTY, key);
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    if (key === null) {
      Alert.alert('Please enter a key')
      return;
    }
    NativeLocalStorage?.removeItem(key);
    setValue('');
  }

  function retriveValue() {
    if (key === null) {
      Alert.alert('Please enter a key')
      return;
    }

    const val = NativeLocalStorage.getItem(key)
    setValue(val)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
      <Text>Key:</Text>
      <TextInput
        placeholder="Enter the key you want to store"
        style={styles.textInput}
        onChangeText={setKey}
      />
      <Text>Value:</Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
      <Button title="Retreive" onPress={retriveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default App;