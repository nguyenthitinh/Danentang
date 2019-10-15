import React, { Component } from 'react';
 
import {Text, TouchableHighlight ,
    StyleSheet, 
    TextInput, 
    View,
    Alert,
    TouchableOpacity,
    ImageBackground 
    } from 'react-native';
 
export default class EditPhong extends Component {
 
constructor(props) {
 
    super(props)
 
    this.state = {
       tennguoithue: this.props.navigation.getParam('nguoithue'),
        tenphong: this.props.navigation.getParam('tenp'),
        giaphong: this.props.navigation.getParam('giap')
        
    }
 
  }
 
 EditDataToServer(){
    // alert(this.props.navigation.getParam('idphong'));
     if(this.state.tenphong===""){
        Alert.alert('Lỗi', 'Không được để trống tên phòng');
     }
     else{
        if(this.state.giaphong===""){
            Alert.alert('Lỗi', 'Không được để trống giá phòng');
         }
        else{
            
                fetch('http://10.0.3.2:8888/QuanLyDienNuoc/updatephong.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.props.navigation.getParam('user'),
                    idphong: this.props.navigation.getParam('idphong'),
                    tennguoithue: this.state.tennguoithue,
                    tenphong: this.state.tenphong,
                    giaphong: this.state.giaphong
                }),

                }).then((response) => response.json())
                .then((responseJson) => {
                if(responseJson === 'Update Done')
                {
                  //  Alert.alert("Done", 'Sửa thành công');
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

_Delete(){
    Alert.alert(
        'Xác nhận',
        'Bạn muốn xóa phòng này?',
        [
            {text: 'Hủy',onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'},
            {text: 'Xóa', onPress: ()=> this._Deleted()}
        ],
        {cancelable: false}
    );
}

_Deleted(){
   fetch('http://10.0.3.2:8888/QuanLyDienNuoc/deletephong.php', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        idphong: this.props.navigation.getParam('idphong'),
    }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
    if(responseJson === 'Delete Done')
    {
        this.props.navigation.replace('Main_MH', {user: this.props.navigation.getParam('user')});
    }

    else{
    Alert.alert('Lỗi' ,responseJson);
    }

    })
    .catch((error) => {
    console.error(error);
    });
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
                        <Text style={{marginLeft: 15}}> Tên phòng</Text>
                        
                    </View>
                    <View style={{flex: 0.7}}>
                        
                        <TextInput
                            defaultValue = {this.state.tenphong}     
                            onChangeText={tenphong => this.setState({tenphong})}
                            underlineColorAndroid='transparent'          
                            style={style.input}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex:1, alignItems:'center'}}>
                    <View style={{flex: 0.3}}>
                        <Text style={{marginLeft: 15}}> Người thuê</Text>
                    </View>
                    <View style={{flex: 0.7}}>
                        <TextInput
                            defaultValue = {this.state.tennguoithue}
                            onChangeText= {tennguoithue => this.setState({tennguoithue})}      
                            underlineColorAndroid='transparent'       
                            style={style.input}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex:1, alignItems:'center'}}>
                    <View style={{flex: 0.3,}}>
                        <Text style={{marginLeft: 15}}> Giá phòng</Text>
                    </View>
                    <View style={{flex: 0.7}}>
                        <TextInput
                            defaultValue = {this.state.giaphong}
                            onChangeText={giaphong => this.setState({giaphong})}        
                            underlineColorAndroid='transparent'       
                            style={style.input}
                        />
                    </View>
                </View>

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableHighlight style={[style.button, { marginTop: 15 }]}
                        onPress = {()=> this._Delete()}>
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>
                            XÓA </Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={[style.button, { marginTop: 15, marginLeft: 20 }]}
                        onPress = {()=> this.EditDataToServer()}>
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>
                            SỬA </Text>
                    </TouchableHighlight>
                </View>
                    

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
      width: 100
  
    },

  });
