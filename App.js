import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
export default function App() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,});


    const showLocation = () => {
      fetch(`https://geocode.maps.co/search?q=${address}&api_key=65eed85c3ce58164958335wylbe989b`)
      .then(response =>{
        if(!response.ok) throw new Error(response.statusText)
        return response.json();
      })
      //Tarkistetaan, ettei data ole tyhjä
      .then(data => {
        if (!data || data.length === 0 ){
          throw new Error ('No data found for the provided address')
        }
        //Käytetään ensimmäistä tietoa taulussa ja erotetaan latitude ja longitude
        const firstData = data[0];
        const latitude = parseFloat(firstData.lat);
        const longitude = parseFloat(firstData.lon);

        setRegion(prevRegion => ({
          ...prevRegion,
          latitude,
          longitude,
        }));
      })
      .catch(err => console.error(err))
    }
    
  return (
    <View style={styles.container}>
      <View style={styles.inputandbutton}>
        <TextInput
        style={styles.input}
        placeholder='address'
        onChangeText={text => setAddress(text)} />
        <Button
        title='Show'
        onPress={showLocation}/>
      </View>
      <MapView
      style={styles.mapstyle}
      region={region}>
      <Marker
      title={address}
      coordinate={{
        latitude: region.latitude,
        longitude: region.longitude
      }} />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex:5
  },
  inputandbutton:{
    flex:1,
    width:'80%',
    marginLeft: 30,
    marginBottom: 50
  },
  mapstyle: {
    flex: 4,
width:'100%',
height:'100%',
  },
  input:{
    borderColor:'blue',
    width: 100,
    marginTop: 50,
    marginBottom:20,
  }
});
