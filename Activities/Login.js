import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    StyleSheet,
    ImageBackground,
    Alert,
} from 'react-native';

export default class Login extends Component{
    static navigationOptions = {
        title: 'Đăng nhập',
      };
    constructor(props){
        super(props);
        this.state =  {
            username: 'a',
            password: 'a',
        }
    }

 _login(){ 
    fetch('http://10.0.3.2:8888/QuanLyDienNuoc/login.php', 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        
        })
    
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson === 'Trung Khop')
        {
            this.props.navigation.navigate('Main_MH', {user: this.state.username});
        }
        else{
          Alert.alert('Lỗi' ,responseJson);
        }
 
      })
      .catch((error) => {
        console.error(error);
      });
}
    
    render(){
        return(                          
            <ImageBackground
                source={require('../img/bon.jpg')}
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
                    source={require('../img/person-icon.png')}
                    style={style.ImageStyle}
                />

                <TextInput
                    defaultValue={this.state.username}
                    placeholder="Tên đăng nhập"
                    placeholderTextColor='#BEBEBE'         
                    onChangeText={username => this.setState({username})}
                    maxLength={255}
                />
            </View>

            <View style={style.SectionStyle}>
                <Image
                    source={require('../img/key_icon-01.png')}
                    style={style.ImageStyle}
                />
                <TextInput
                    defaultValue={this.state.password}
                    placeholder="Mật khẩu"   
                    placeholderTextColor = '#BEBEBE'
                    onChangeText={password => this.setState({password})}                          
                    secureTextEntry={true} 
                    maxLength={50}
                    
                />
            </View>
  
                <TouchableHighlight style={[style.button, { marginTop: 20 }]}
                    onPress = {()=> this._login()}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Đăng nhập</Text>
                </TouchableHighlight>

                <View style={{ height: 45,flexDirection: 'row',  marginTop: 20}}>
                    <Text style={{flex: 0.65, textAlign: "right"}}>Bạn chưa có tài khoản? </Text>
                    <TouchableOpacity  style={{flex: 0.35,fontSize: 13}}
                        onPress={() => this.props.navigation.navigate('Register_MH')}>           
                            <Text style={{textDecorationLine: 'underline', marginLeft: 3, color: 'red', fontWeight: "bold"}}>
                                Đăng ký
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