import React from 'react';
import { FlatList, ActivityIndicator, Image, 
  TouchableOpacity,Text, View, StyleSheet, Alert, Button,
  TouchableHighlight, TouchableNativeFeedback} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class Info extends React.Component {
  static navigationOptions = {
      title: 'Danh Sách',
    //  headerLeft: (<Button title="Left" onPress={() => this.props.navigation.navigate("Login_MH")} />)
      //  headerLeft : (
      //   <TouchableHighlight
      //     onPress={() => this._back()}
      //     underlayColor={'#444444'}
      //     >
      //       <Image style={{width: 30, height: 30}} source={require('../img/logo.png')} />
      //   </TouchableHighlight>
      // )
    }
          

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  _back(){
    this.props.navigation.navigate('Login_MH');
  }

  componentDidMount(){
    return fetch('http://10.0.3.2:8888/QuanLyDienNuoc/getthongtintheophong.php',  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.navigation.getParam('user'),
            idphong: this.props.navigation.getParam('idp'),
        }),

        })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  reloadDB(){
    fetch('http://10.0.3.2:8888/QuanLyDienNuoc/getthongtintheophong.php',  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.navigation.getParam('user'),
            idphong: this.props.navigation.getParam('idp'),
        }),

        })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
}

    deleteItem(itemID){
      Alert.alert(
        'Xác nhận',
        'Bạn muốn xóa hóa đơn này?',
        [
            {text: 'Hủy',onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'},
            {text: 'Xóa', onPress: ()=> this.deleted(itemID)}
        ],
        {cancelable: false}
    );
    }

    deleted(itemID) {
        //fetch('http://192.168.43.14:8888/QuanLyDienNuoc/deletethongtin.php'
        fetch('http://10.0.3.2:8888/QuanLyDienNuoc/deletethongtin.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                iddn: itemID,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
        if(responseJson === 'Delete Done')
        {
          this.reloadDB();
        //Alert.alert("OK", 'Đã Xóa');
       }
        
        else{
          Alert.alert('Lỗi' ,responseJson);
        }
 
      })
      .catch((error) => {
        console.error(error);
      });
        
    }

    edit(idItem, thangnam, tieude, chisocu, chisomoi, dongiadien, gianuoc, giaphong, nguoinop){
     // alert(idItem);
      this.props.navigation.navigate('EditThongtin_MH', {iddn: idItem, idp: this.props.navigation.getParam('idp'), 
                                                       user: this.props.navigation.getParam('user'),
                                                      tennguoithue: this.props.navigation.getParam('tennguoithue'),
                                                    nguoinop: nguoinop, thangnam: thangnam, tieude: tieude, chisocu: chisocu,
                                                  chisomoi: chisomoi, dongiadien: dongiadien, gianuoc: gianuoc, giaphong: giaphong});
    
    }

    addbanghi(){
      //alert(this.props.navigation.getParam('idp'));
     this.props.navigation.navigate('AddThongtin_MH', {idp: this.props.navigation.getParam('idp'), 
                                                       user: this.props.navigation.getParam('user'),
                                                      tennguoithue: this.props.navigation.getParam('tennguoithue')});
    }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <View style={{alignSelf:'center', flexDirection: 'row', paddingBottom: 10}}>
          <Text > Người thuê: </Text>
          <Text style={{color: 'red'}}> {this.props.navigation.getParam('tennguoithue')} </Text>
        </View>
          <SwipeListView
          data={this.state.dataSource}
          renderItem={({item}) => 
          <TouchableHighlight onLongPress = {()=> this.deleteItem(item.iddn)}>
            <View style={styles.item}>
              <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', paddingTop: 5}}>
                <Text ellipsizeMode={"middle"} numberOfLines={1} style={styles.tieude}> {item.tieude} </Text>             
              </View>

              <View style={{marginTop: 5, paddingBottom: 5, flexDirection: 'row'}}>
                <Text style={{flex: 0.5, paddingLeft: 10, fontSize: 10}}> Chỉ số cũ: {item.chisocu} </Text>
                <Text style={{flex: 0.5, fontSize: 10}}> Đơn giá điện: {item.dongiadien} / số</Text>
              </View>

              <View style={{marginTop: 5, paddingBottom: 5, flexDirection: 'row'}}>
                <Text style={{flex: 0.5, paddingLeft: 10,  fontSize: 10}}> Chỉ số mới: {item.chisomoi} </Text>
                <Text style={{flex: 0.5, fontSize: 10}}> Giá nước: {item.gianuoc} VNĐ</Text>
              </View>

              <View style={{marginTop: 5, paddingBottom: 5, flexDirection: 'row'}}>
                <Text style={{flex: 0.5, paddingLeft: 10,  fontSize: 10}}> Giá phòng: {item.giaphong} VNĐ</Text>
                <Text style={{flex: 0.5, fontSize: 10}}> Thời gian: {item.thangnam} </Text>
              </View>

              <View style={{marginTop: 5, paddingBottom: 5, flexDirection: 'row'}}>
                  <Text style={{flex: 0.5, paddingLeft: 10,  fontSize: 10, color:'blue'}}> Tổng thu: {item.tongtien} VNĐ </Text>
                  <Text style={{flex: 0.5, fontSize: 10}}> Người nộp: {item.nguoinop} </Text>
              </View>
            </View>
          </TouchableHighlight>
        }
        renderHiddenItem={({item}) =>
      
             <TouchableNativeFeedback onPress={()=>this.edit(item.iddn, item.thangnam, item.tieude, item.chisocu, item.chisomoi,
                                                            item.dongiadien, item.gianuoc, item.giaphong, item.nguoinop)}>
                <View style={{flex: 1, flexDirection: 'row', borderRightWidth: 0.5, borderRightColor: 'green',
                              borderRadius: 10, marginTop: 13, justifyContent: 'flex-end', marginRight: 5}}>
                    <Text style={{backgroundColor: 'green',  width: 100, height: 116, textAlign:'right', paddingRight: 15,
                                  textAlignVertical: 'center', color: 'white', fontSize: 12}}> Sửa </Text>
                </View>
                
            </TouchableNativeFeedback>
        
        }
        leftOpenValue={0}
        rightOpenValue={-55}
        />
          <TouchableOpacity onPress={() => this.addbanghi()} style={styles.fab}>
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
 
  fab: {
    position: 'absolute',
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 30,
    color: 'white'
  },

    tieude: {
      fontSize: 12,
      color: 'black',
      fontWeight: "bold",
      alignSelf: 'center' 
    },

    item : {
        backgroundColor: 'pink',
        marginLeft: 5, 
        marginTop: 12, 
        marginRight: 5, 
        borderBottomWidth: 1 ,
        borderBottomColor: 'green',
        borderRadius: 5
    }
  }
)