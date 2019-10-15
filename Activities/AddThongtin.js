import React, { Component } from 'react';
 
import {Text, TouchableHighlight ,
    StyleSheet, 
    TextInput, 
    View,
    Alert,
    Picker,
    TouchableOpacity,
    ImageBackground 
    } from 'react-native';

 
export default class AddThongtin extends Component {
    static navigationOptions = {
        title: 'Thêm Chi Tiết'
      };
 
constructor(props) {
 
    super(props)
 
    this.state = {
        thang: "",
        nam: "",
        tieude: "",
		chisocu : "",
		chisomoi: "",
		dongiadien: "",
		gianuoc: "",
		//tongtien:"",
    }
 
  }
 
 InsertDataToServer(){
    
     if(this.state.chisocu==="" || this.state.tieude==="" || this.state.chisomoi ==="" ||
         this.state.dongiadien ===""|| this.state.gianuoc ===""){
        Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
     }
     else{
        
                fetch('http://10.0.3.2:8888/QuanLyDienNuoc/addthongtin.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.props.navigation.getParam('user'),
                    idphong: this.props.navigation.getParam('idp'),
                    tieude: this.state.tieude,
                    thangnam: this.state.nam+'-'+this.state.thang+'-'+'01',
                    chisocu: this.state.chisocu,
                    chisomoi: this.state.chisomoi,
                    dongiadien: this.state.dongiadien,
                    gianuoc: this.state.gianuoc,
                    nguoithue: this.props.navigation.getParam('tennguoithue')
                }),

                }).then((response) => response.json())
                .then((responseJson) => {
                if(responseJson === 'Insert Done')
                {
                   // Alert.alert("Done", 'Thêm thành công');
                    this.props.navigation.replace('Info_MH', {user: this.props.navigation.getParam('user'),
                                                             idp: this.props.navigation.getParam('idp'),
                                                            tennguoithue: this.props.navigation.getParam('tennguoithue')});
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
          
            <View style={{justifyContent: "center"}}>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                    <Text style={{flex: 0.4}}>Tháng Năm: </Text>
                    <Picker style={{flex: 0.35}} 
                        selectedValue = {this.state.thang} onValueChange={thang => this.setState({thang})}>
                        <Picker.Item label = "Tháng 1" value = "01"/>
                        <Picker.Item label = "Tháng 2" value = "02"/>
                        <Picker.Item label = "Tháng 3" value = "03"/>
                        <Picker.Item label = "Tháng 4" value = "04"/>
                        <Picker.Item label = "Tháng 5" value = "05"/>
                        <Picker.Item label = "Tháng 6" value = "06"/>
                        <Picker.Item label = "Tháng 7" value = "07"/>
                        <Picker.Item label = "Tháng 8" value = "08"/>
                        <Picker.Item label = "Tháng 9" value = "09"/>
                        <Picker.Item label = "Tháng 10" value = "10"/>
                        <Picker.Item label = "Tháng 11" value = "11"/>
                        <Picker.Item label = "Tháng 12" value = "12"/>
                    </Picker>

                    <Picker style={{flex: 0.25, marginLeft: 10}} selectedValue = {this.state.nam} onValueChange={nam => this.setState({nam})}>
                        <Picker.Item label = "2015" value = "2015"/>
                        <Picker.Item label = "2016" value = "2016"/>
                        <Picker.Item label = "2017" value = "2017"/>
                        <Picker.Item label = "2018" value = "2018"/>
                        <Picker.Item label = "2019" value = "2019"/>
                        <Picker.Item label = "2020" value = "2020"/>
                        <Picker.Item label = "2021" value = "2021"/>
                        <Picker.Item label = "2022" value = "2022"/>
                        <Picker.Item label = "2023" value = "2023"/>
                        <Picker.Item label = "2024" value = "2024"/>
                        <Picker.Item label = "2025" value = "2025"/>   
                    </Picker>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                    <Text style={{flex: 0.4}}>Tiêu đề: </Text>
                    <TextInput
                        placeholder="Tiền phòng tháng 1-2019"  
                        placeholderTextColor='#BEBEBE'         
                        onChangeText={tieude => this.setState({tieude})}
                        underlineColorAndroid='transparent'          
                        style={style.input}
                    />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                    <Text style={{flex: 0.4}}>Chỉ số cũ: </Text>
                    <TextInput
                        placeholder=""  
                        placeholderTextColor='#BEBEBE'         
                        onChangeText={chisocu => this.setState({chisocu})}
                        underlineColorAndroid='transparent'          
                        style={style.input}
                    />
                </View>


                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                    <Text style={{flex: 0.4}}>Chỉ số mới: </Text>
                <TextInput
                    placeholder=""  
                    placeholderTextColor='#BEBEBE'      
                    onChangeText={chisomoi => this.setState({chisomoi})}        
                    underlineColorAndroid='transparent'       
                    style={style.input}
                />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                    <Text style={{flex: 0.4}}>Đơn giá điện: </Text>
                <TextInput
                    placeholder="VND"  
                    placeholderTextColor='#BEBEBE'      
                    onChangeText={dongiadien => this.setState({dongiadien})}        
                    underlineColorAndroid='transparent'       
                    style={style.input}
                />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                    <Text style={{flex: 0.4}}>Giá nước: </Text>
                <TextInput
                    placeholder="VND"  
                    placeholderTextColor='#BEBEBE'      
                    onChangeText={gianuoc => this.setState({gianuoc})}        
                    underlineColorAndroid='transparent'       
                    style={style.input}
                />
                </View>
  
                <TouchableHighlight style={[style.button, { marginTop: 15 }]}
                    onPress = {()=> this.InsertDataToServer()}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Thêm </Text>
                </TouchableHighlight>

            </View>
        
         </ImageBackground>
            
    );
  }
}

const style = StyleSheet.create({
    input: {
      flex:0.6,
      paddingLeft: 30,
      borderRadius: 10,
      marginTop: 12,
      height: 45,
      marginLeft: 30,
      fontSize: 15,
      marginRight: 10,
      backgroundColor: 'white'
    },
    button: {
      backgroundColor: 'green',
      justifyContent: 'center',
      borderRadius: 15,
      alignSelf: 'center',
      marginTop: 12,
      height: 45,
      width: 260
  
    },

  });
