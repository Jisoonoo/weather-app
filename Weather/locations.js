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
            <FlatList
                data={props.data}
                renderItem= {({item, index})=> (
                    <Button 
                        key={index}
                        title={item.title}
                        type='clear'
                        onPress={() => props.locationChanger(item.woeid, item.title)}
                    />
                )}
            />
        </View>
    )
}

export default locations