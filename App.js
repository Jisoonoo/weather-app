import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  ScrollView,
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import Weather from './Weather/WeatherApp'
import { Button } from 'react-native-elements'
import Locations from './Weather/locations'


const App = () => {

  const defaultCity = 'London'
  const defaultId = 44418

  const [currentCity, setCurrentCity] = useState(defaultCity)

  const [loading, setButtonStatus] = useState(false)

  const [cities, setCityArray] = useState([])

  const [locationStatus, setLocationStatus] = useState(true)
  
  const [weatherData, setWeatherData] = useState({})

  let fullString = defaultCity;

  const screenHeight = Dimensions.get('window').height;
  const statusBar = StatusBar.currentHeight;

  const displayHeight = screenHeight - statusBar;


  function write(string) {
    fullString = string;
  }

  function changeLocation(id, title) {

    fetch("https://www.metaweather.com/api/location/" + id).then((res) => res.json())
    .then((json) => {
      setWeatherData(json)
      setCurrentCity(title)
      setLocationStatus(false)
    })
  }

  function searchCity(city) {
    setButtonStatus(true);
    Keyboard.dismiss();
    fetch('https://www.metaweather.com/api/location/search/?query=' + city).then((res) => res.json())
    .then((json) => {
      if(json.length >= 1) {
        setLocationStatus(true);
        setCityArray(json);
      }
      setButtonStatus(false);
    })
  }

  if(Object.keys(weatherData).length === 0) {

    changeLocation(defaultId, defaultCity)
  }

  const cityInput = useRef()
  

  return (
      <ScrollView style={{flex: 1, height: displayHeight}}>
        <View style={{height: displayHeight}}>
          <View style = {styles.header}>
            <View style = {styles.cityName}>
              <TextInput style = {{color: 'white', fontSize: 25}} placeholderTextColor='#fff' onSubmitEditing={() => searchCity(fullString)} ref={cityInput} placeholder='Search city' onChangeText={text => write(text)}>{currentCity}</TextInput>
            </View>
            <View style = {styles.searchButton}>
              <Button type='clear' icon={<Icon name='search1' size={30} color='#fff' onPress={() => cityInput.current.focus()}/>} title='' loading={loading} disabled={loading}/>
            </View>
          </View>
          <View style={{flex: 11}}>
            {locationStatus ? <Locations data={cities} locationChanger={changeLocation}/> : <Weather weather={weatherData}/>}
          </View>
        </View>
      </ScrollView>
  )
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#001f3f',
  },
  searchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    flex: 4,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
});

export default App;
