import React from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Toast
} from 'react-native';

import {
  Actions
} from 'react-native-router-flux';

import {
  MyWebView
} from './MyWebView'

import MySvg from './MySvg'

import ImagePicker from 'react-native-image-picker';

const BluetoothSerial = require('react-native-bluetooth-serial');

const Ogid = require('ogid');

const Audio = require('./audio.html');
console.log('audiohtml', Audio)

class Home extends React.Component {
  constructor () {
    super();
  }
  componentDidMount() {
    console.clear();
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        //console.log('devices', devices);
        BluetoothSerial.discoverUnpairedDevices()
        .then((unpairedDevices) => {
          //console.log('unpaired', unpairedDevices);
        });
      }
    )
    /*
    const subscription = this.manager.onStateChange((state) => {
      if(state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
    */
  }
  scanAndConnect() {
    console.log('sac23');
    var count = 0;
    this.manager.startDeviceScan(null, null, (error, device) => {
      if(error) {
        return
      }
      var testDevices = this.state.devices.filter((testDevice) => testDevice.id === device.id);
      console.log('tds', testDevices);
      if(!testDevices.length) {
        if(device.name || device.isConnectable || device.localName) {
          this.state.devices.push(device);
          this.setState({
            devices: this.state.devices
          })
        }
      }
      console.log('whut', this.state.devices);
    })
  }
  state = {
    myname: '',
    pets: [
      {name: 'Buddytest', id:Ogid()},
      {name: 'Maggie', id:Ogid()}
    ],
    devices: [],
    base64: ''
  };

  callFn(cb) {
    setTimeout(cb, 10000);
  }

  renderListItem = ({item}) => (
    <View>
      <Text style={styles.containerStyle}>{item.name}</Text>
    </View>
  );
  render() {
    return (
      <View style={{flex:1}}>
        <MyWebView
          base64={this.state.base64}
          onMessage={(message) => {
            console.log('MESSAGE', message.nativeEvent.data)
          }}
        />
        <MySvg />
        <Text style={styles.title}>
          Heyaz
        </Text>
        <TextInput
          style={styles.nameInput}
          placeholder='Buddy'
          onChangeText={(text) => {
            this.setState({
              myname: text,
            });
          }}
          value={this.state.myname}
        />
        <TouchableOpacity
          onPress={() => {
            Toast.showShortBottom('heya');
          }}
        >
          <Text style={styles.buttonText}>Boom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>{
            const options = {
              title: 'Whoooo',
              storageOptions: {
                skipBackup: true,
                path: 'images'
              }
            };
            ImagePicker.showImagePicker(options, (response) => {
              this.setState({
                base64: 'data:image/jpeg;base64,' + response.data
              });
            });
          }}
        >
          <Text style={styles.buttonText}>Bim bap</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.devices}
          renderItem={this.renderListItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 40
  },
  nameInput: {
    padding: 5,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 40
  },
  containerStyle: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
});

export default Home;
