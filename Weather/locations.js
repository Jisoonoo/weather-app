import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList
} from 'react-native';
import {Button} from 'react-native-elements'

const locations = (props) => {

    return(
        <View>
            {props.data.map((e, index) => {
                return (
                    <Button 
                        key={index}
                        title={e.title}
                        type='clear'
                        onPress={() => props.locationChanger(e.woeid, e.title)}
                    />
                )
            })}
        </View>
    )
}

export default locations