import React, { Component } from 'react';
 
import {Text, TouchableHighlight ,
    StyleSheet, 
    TextInput, 
    View,
    Alert,
    TouchableOpacity,
    ImageBackground,
    Image,
    } from 'react-native';
 
export default class Register extends Component {
    static navigationOptions = {
        title: 'Đăng Ký',
      };
 
constructor(props) {
 
    super(props)
 
    this.state = {
        username: "",
        password:"",
        cfmpwd: ""
 
    }
 
  }
 
 InsertDataToServer(){
     if(this.state.username===""){
        Alert.alert('Lỗi', 'Không được để trống tên tài khoản');
     }
     else{
        if(this.state.password===""){
            Alert.alert('Lỗi', 'Không được để trống mật khẩu');
         }
        else{
            if(this.state.password!==this.state.cfmpwd){
                Alert.alert('Lỗi', 'Mật khẩu chưa trùng khớp, kiểm tra lại!');
            }
            else{
                fetch('http://10.0.3.2:8888/QuanLyDienNuoc/register.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }),

                }).then((response) => response.json())
                .then((responseJson) => {
                if(responseJson === 'Thanh Cong')
                {
                    Alert.alert("Chúc mừng", 'Đăng ký thành công');
                    this.props.navigation.navigate('Login_MH');
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
}
 
  render() {
    return (
        <ImageBackground
                source={require('../img/bay.jpg')}
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
          
            <View>

                <View style={style.SectionStyle}>
                    <Image
                        source={require('../img/user.png')}
                        style={style.ImageStyleUser}
                    />
                    <TextInput
                        placeholder="Tên tài khoản"  
                        placeholderTextColor='#BEBEBE'         
                        onChangeText={username => this.setState({username})}
                        maxLength={255}
                    />
                </View>

                <View style={style.SectionStyle}>
                    <Image
                        source={require('../img/key.png')}
                        style={style.ImageStyle}
                    />
                    <TextInput
                        placeholder="Mật khẩu"  
                        placeholderTextColor='#BEBEBE'      
                        onChangeText={password => this.setState({password})}   
                        maxLength={255}
                    />
                </View>

                <View style={style.SectionStyle}>
                    <Image
                        source={require('../img/key.png')}
                        style={style.ImageStyle}
                    />
                    <TextInput
                        placeholder="Nhập lại Mật khẩu"  
                        placeholderTextColor='#BEBEBE'      
                        onChangeText={cfmpwd => this.setState({cfmpwd})}        
                        underlineColorAndroid='transparent'
                    />
                </View> 
  
                <TouchableHighlight style={[style.button, { marginTop: 15 }]}
                    onPress = {()=> this.InsertDataToServer()}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Đăng Ký</Text>
                </TouchableHighlight>

                <View style={{ height: 45,flexDirection: 'row',  marginTop: 20}}>
                    <Text style={{flex: 0.65, textAlign: "right"}}>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity  style={{flex: 0.35,fontSize: 13}}
                        onPress={() => this.props.navigation.navigate('Login_MH')}>           
                            <Text style={{color: 'blue', fontWeight: "bold", marginLeft: 3}}>
                                  Đăng Nhập
                            </Text>
                        
                    </TouchableOpacity>
                </View>

            </View>
        
         </ImageBackground>
            
    );
  }
}

const style = StyleSheet.create({
      SectionStyle: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30,
      },
        
        ImageStyleUser: {
            marginLeft: 10,
            margin: 5,
            height: 21,
            width: 21,
            alignItems: 'center',
        },

        ImageStyle: {
            marginLeft: 10,
                margin: 5,
                height: 28,
                width: 28,
                alignItems: 'center',
            },

        button: {
            backgroundColor: 'green',
            justifyContent: 'center',
            borderRadius: 15,
            alignSelf: 'center',
            marginTop: 12,
            height: 40,
            width: 260
    
        },

  });
