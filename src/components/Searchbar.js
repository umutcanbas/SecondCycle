import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';

import SearchIcon from '../assets/svg/searchIcon.svg';

const Searchbar = ({seacrh, setSearch}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        value={seacrh}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.ıcon}>
        <SearchIcon width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  search: {
    backgroundColor: '#E5E5E5',
    width: 296,
    height: 42,
    borderRadius: 30,
    textAlign: 'center',
  },
  ıcon: {
    position: 'absolute',
    top: 10,
    right: 65,
  },
});
