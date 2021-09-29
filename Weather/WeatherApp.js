import React, { Component, useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import WeatherIcons from 'react-native-vector-icons/Ionicons'
import InfoIcons from 'react-native-vector-icons/Feather'


class Days extends React.Component {

    render() {

        const days = this.props.properties
        
        return (
            <View style = {styles.days}>
                <Text style = {{color: 'white', fontSize: 12, textTransform: 'uppercase'}}>{days.day.slice(0,3)}</Text>
                <WeatherIcons name={days.weather} size={20} color='#fff'/>
                <Text style = {{color: 'white', fontSize: 15}}>{days.celsius}°</Text>
            </View>
        )
    }
}

class Stats extends React.Component {

    render() {
        const values = this.props.type;

        return (
            <View style = {styles.infoContainer}>
                <InfoIcons name={values.icon} size={30} color='#fff'/>
                <View style = {{flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontSize: 30}}>{values.value}</Text>
                    <Text style={{color: 'white', fontSize: 12, paddingTop: 5}}>{values.type}</Text>
                </View>
                <Text style={{textTransform: 'uppercase', color: 'white'}}>{values.name}</Text>
            </View>
        )
    }
}

function getIcon(type) {
  if(type == 'Heavy Rain' || type == 'Light Rain' || type == 'Sleet' || type == 'Hail' || type == 'Showers') {
    return(
      'rainy'
    )
  }
  if(type == 'Thunderstorm') {
    return('thunderstorm')
  }
  if(type == 'Heavy Cloud') {
    return ('cloudy')
  }
  if(type == 'Light Cloud') {
    return(
      'partly-sunny'
    )
  }
  if(type == 'Clear') {
    return (
      'sunny'
    )
  }

}

function getWeeklyWeather(data, weekDays, arr) {

  for(let i = 0; i < 6; i++) {
    var d = new Date(data[i].applicable_date).getDay();
    var day = weekDays[d - 1 == -1 ? 6 : d - 1]

    var temp = Math.round(data[i].the_temp);

    var state = getIcon(data[i].weather_state_name);

    let dayInfo = {
      weather: state,
      celsius: temp,
      day: day
    }

    arr.push(dayInfo);
  }
  
  return arr
}

const Weather = (props) => {

let dayArray = [];

const weatherData = props.weather.consolidated_weather[0]

const customDate = props.weather.consolidated_weather;


const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let days = getWeeklyWeather(customDate, weekDays, dayArray);

var d = new Date(weatherData.applicable_date);

const dateString = weekDays[d.getDay() - 1] + ", " + d.getDate() + ' ' + months[d.getMonth()]

let icon = getIcon(weatherData.weather_state_name);

const statObject = [
    {
        value: Math.round(weatherData.wind_speed),
        type: 'mph',
        icon: 'wind',
        name: 'wind',
    },
    {
        value: weatherData.humidity,
        type: '%',
        icon: 'droplet',
        name: 'humidity',
    }
]

  return (
    <View style= {styles.container}>
        <View style = {styles.bigScreen}>
          <View style = {styles.weatherContainer}>
            <WeatherIcons name={icon} size={80} color='white'/>
            <Text style={{color: 'white', fontSize: 100, fontFamily: 'sans'}}>{Math.round(weatherData.the_temp)}°C</Text>
          </View>
          <View style = {styles.weatherDateContainer}>
            <Text style = {{color: 'white', fontSize: 20, textAlign: 'center'}}>{dateString}</Text>
            <Text style = {{color: 'white', fontSize: 20, textAlign: 'center'}}>{weatherData.weather_state_name}</Text>
          </View>
        </View>
        <View style = {styles.extraInfos}>
            {statObject.map(e => {
                return(
                  <Stats key={e.name} type={e}/>
                )
            })}
        </View>
        <View style = {styles.dates}>
            {days.map(e => {
                return(
                    <Days key={e.day} properties={e}/>
                )
            })}
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f',
    flexDirection: 'column',
  },
  
  bigScreen: {
    flex: 5,
  },
  weatherContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherDateContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  extraInfos: {
    flex: 3,
    flexDirection: 'row'
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  dates: {
    flex: 3,
    flexDirection: 'row'
  },
  days: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});

export default Weather;
