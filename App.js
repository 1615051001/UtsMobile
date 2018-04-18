import React, { Component } from 'react';
import { StyleSheet, View, Alert, TextInput, Image, Button, Text, Platform, TouchableOpacity, ListView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';


const barang7Icon = require('./src/img/barang7.png');

class HomeScreen extends Component {
  static navigationOptions =
  {
     title: 'Catatan Pengadaan Barang',
  };
  constructor(props){
        super(props);
        this.state = 
        { 
          kode : '',
          nama: '',
        }
    }
  render() {
    return (
      <View style={styles.MainContainer}>
      
        <Image source={barang7Icon} style={styles.icon} />
        <Text style={{fontSize: 20, paddingTop: 10, textAlign: 'center', marginBottom: 20}}> "Selamat Datang Di Sistem Klik Obat" </Text>
        <View style={{ flexDirection: 'column', paddingTop: 10 }}>
        <View style={styles.box2}>
        <Button
              onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Second');
          }}
              title="Input Barang"
               color="#2E7D32"
        />
        <Button
              onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Third');
          }}
              title="Lihat Barang"
               color="#FF9800"
        />
        </View>
      </View>
      </View>
    );
  }
}

class MainActivity extends Component {
  static navigationOptions =
  {
     title: 'Catatan Pengadaan Barang',
  };
constructor(props) {
   super(props)
   this.state = {

     kode : '',
          nama: '',
          harga: '', 
          hargaJul: '', 
          ActivityIndicator_Loading: false, 

   }

 }

 InsertRecords = () =>{

      fetch('https://gustiwandi11.000webhostapp.com/uts/simpan.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        kode : this.state.kode,

        nama : this.state.nama,

        harga : this.state.harga,

        hargaJul: this.state.hargaJul

      })

      }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

          }).catch((error) => {
            console.error(error);
          });

}

 render() {
   return (

<View style={styles.MainContainer}>


       <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}> Input Data Barang </Text>
 
       <TextInput
         
         placeholder=" Masukkan Kode Barang"

         onChangeText={ TextInputValue => this.setState({ kode : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TextInput
         
         placeholder="Masukkan Nama Barang"

         onChangeText={ TextInputValue => this.setState({ nama : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TextInput
         
         placeholder="Masukkan Harga Beli Barang"

         onChangeText={ TextInputValue => this.setState({ harga : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

       <TextInput

         placeholder="Masukkan Harga Jual Barang"

         onChangeText={ TextInputValue => this.setState({ hargaJul : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertRecords} >

        <Text style={styles.TextStyle}> Simpan </Text>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.ShowList} >

        <Text style={styles.TextStyle}> Lihat Detail Barang </Text>

      </TouchableOpacity>
 

</View>
           
   );
 }
}

class ShowList extends Component {

  constructor(props) { 

    super(props);

    this.state = {

      isLoading: true

    }
  }

  static navigationOptions =
  {
     title: 'Lihat Data Barang',
  };

  componentDidMount() {
    
       return fetch('https://gustiwandi11.000webhostapp.com/uts/tampil.php')
         .then((response) => response.json())
         .then((responseJson) => {
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
             isLoading: false,
             dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
    
     GetIDFunction=(kode,nama,harga,hargaJul)=>{

          this.props.navigation.navigate('Fourth', { 

            kode : kode,
            nama : nama,
            harga : harga,
            hargaJul : hargaJul

          });

     }

     ListViewItemSeparator = () => {
       return (
         <View
           style={{
             height: .5,
             width: "100%",
             backgroundColor: "#009688",
           }}
         />
       );
     }

     render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.MainContainer_For_Show_List}>
   
          <ListView
   
            dataSource={this.state.dataSource}
   
            renderSeparator= {this.ListViewItemSeparator}
   
            renderRow={ (rowData) => <Text style={styles.rowViewContainer} 

                      onPress={this.GetIDFunction.bind(
                        this, rowData.kode,
                         rowData.nama, 
                         rowData.harga, 
                         rowData.hargaJul
                         )} > 

                      {rowData.nama} 
                      
                      </Text> }
   
          />
   
        </View>
      );
    }

}

class EditRecord extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
          kode : '',
          nama: '',
          harga: '', 
          hargaJul: '', 
    
       }
    
     }

     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        kode : this.props.navigation.state.params.kode,
        nama: this.props.navigation.state.params.nama,
        harga: this.props.navigation.state.params.harga,
        hargaJul: this.props.navigation.state.params.hargaJul,
      })

     }
  
    static navigationOptions =
    {
       title: 'Edit Data barang',
    };

    UpdateRecord = () =>{
      
            fetch('https://gustiwandi11.000webhostapp.com/uts/update.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              kode : this.state.kode,

              nama : this.state.nama,

              harga : this.state.harga,

              hargaJul: this.state.hargaJul

            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
      
      }


    DeleteRecord = () =>{
        
          fetch('https://gustiwandi11.000webhostapp.com/uts/delete.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            kode: this.state.kode
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });

          this.props.navigation.navigate('First');

      }

    render() {

      return (
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Data Barang </Text>
   
         <TextInput
            
            placeholder="Edit Nama"

            value={this.state.nama}
   
            onChangeText={ TextInputValue => this.setState({ nama : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Edit Harga Beli Barang"

            value={this.state.harga}
   
            onChangeText={ TextInputValue => this.setState({ harga : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
          <TextInput
   
            placeholder="Edit Harga Jual barang"

            value={this.state.hargaJul}
   
            onChangeText={ TextInputValue => this.setState({ hargaJul : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateRecord} >
   
            <Text style={styles.TextStyle}> Perbaharui </Text>
   
         </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteRecord} >
   
            <Text style={styles.TextStyle}> Hapus </Text>
   
         </TouchableOpacity>

         </View>
    
              
      );
    }

}

export default MyNewProject = StackNavigator(

  {
   
    First: { screen: HomeScreen },

    Second: { screen: MainActivity },

    Third: { screen: ShowList },

    Fourth: { screen: EditRecord }


  });

const styles = StyleSheet.create({

  MainContainer :{

    alignItems: 'center',
    flex:2,
    paddingTop: 100,
    backgroundColor: '#4DB6AC',
    flexDirection: 'column',

  },
  box2: {
    flex: 0.3,
    backgroundColor: '#00695C',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },

  MainContainer_For_Show_List :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 10,
    marginRight: 10
    
    },

  TextInputStyleClass: {

  textAlign: 'center',
  width: '90%',
  marginBottom: 7,
  height: 40,
  borderWidth: 2,
  borderColor: '#00695C',
  borderRadius: 5 ,

  },

  TouchableOpacityStyle: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00695C'

  },

  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },

    icon: {
    height: 100,
    width: 100,
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }


});