import React, { Component } from 'react';
 
import {Text, TouchableHighlight ,
    StyleSheet, 
    TextInput, 
    View,
    Alert,
    TouchableOpacity,
    ImageBackground 
    } from 'react-native';
 
export default class AddPhong extends Component {
    static navigationOptions = {
        title: 'Thêm Phòng',
      };
 
constructor(props) {
 
    super(props)
 
    this.state = {
       tennguoithue: "",
        tenphong: "",
        giaphong: ""
    }
 
  }
 
 InsertDataToServer(){
     if(this.state.tenphong===""){
        Alert.alert('Lỗi', 'Không được để trống tên phòng');
     }
     else{
        if(this.state.giaphong===""){
            Alert.alert('Lỗi', 'Không được để trống giá phòng');
         }
        else{
            
                fetch('http://10.0.3.2:8888/QuanLyDienNuoc/addphong.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.props.navigation.getParam('user'),
                    tennguoithue: this.state.tennguoithue,
                    tenphong: this.state.tenphong,
                    giaphong: this.state.giaphong
                }),

                }).then((response) => response.json())
                .then((responseJson) => {
                if(responseJson === 'Insert Done')
                {
                  //  Alert.alert("Done", 'Thêm thành công');
                    this.props.navigation.replace('Main_MH', {user: this.props.navigation.getParam('user')});
                }
                else{

                    Alert.alert('Lỗi',responseJson);
                }
            
                }).
                catch((error) => {
                    console.error(error);
                });
            }
        
    } 
}
 
  render() {
    return (
        <ImageBackground
                source={require('../img/backgr.png')}
                style={{
                    height: '100%',
                    width: "100%",
                    position: 'relative', 
                    top: 0,
                    left: 0,
                    flex: 1,
                    justifyContent: 'center',
                    resizeMode : 'cover'
                }
            }>    
          
            <View style={{alignContent: "center", flexDirection: 'column', flex: 0.55}}>
                <View style={{flexDirection: 'row', flex:1, alignItems:'center'}}>
                    <View style={{flex: 0.3}}>
                        <Text> Tên phòng</Text>
                    </View>
                    <View style={{flex: 0.7}}>
                        <TextInput
                            placeholder="Tên phòng"  
                            placeholderTextColor='#BEBEBE'         
                            onChangeText={tenphong => this.setState({tenphong})}
                            underlineColorAndroid='transparent'          
                            style={style.input}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex:1, alignItems:'center'}}>
                    <View style={{flex: 0.3}}>
                        <Text> Người thuê</Text>
                    </View>
                    <View style={{flex: 0.7}}>
                        <TextInput
                            placeholder="Người thuê"  
                            placeholderTextColor='#BEBEBE'      
                            onChangeText= {tennguoithue => this.setState({tennguoithue})}      
                            underlineColorAndroid='transparent'       
                            style={style.input}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex:1, alignItems:'center'}}>
                    <View style={{flex: 0.3,}}>
                        <Text> Giá phòng</Text>
                    </View>
                    <View style={{flex: 0.7}}>
                        <TextInput
                            placeholder="Giá phòng"  
                            placeholderTextColor='#BEBEBE'      
                            onChangeText={giaphong => this.setState({giaphong})}        
                            underlineColorAndroid='transparent'       
                            style={style.input}
                        />
                    </View>
                </View>
  
                <TouchableHighlight style={[style.button, { marginTop: 15 }]}
                    onPress = {()=> this.InsertDataToServer()}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Thêm phòng</Text>
                </TouchableHighlight>

            </View>
        
         </ImageBackground>
            
    );
  }
}

const style = StyleSheet.create({
    input: {
      paddingLeft: 30,
      borderRadius: 10,
      marginTop: 12,
      height: 45,
      marginLeft: 30,
      fontSize: 15,
      marginRight: 30,
      backgroundColor: 'white'
    },
    button: {
      backgroundColor: 'green',
      justifyContent: 'center',
      borderRadius: 10,
      alignSelf: 'center',
      height: 45,
      width: 180
  
    },

  });
