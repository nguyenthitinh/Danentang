import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

//var username = this.props.navigation.getParam('user', 'a')
export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://10.0.3.2:8888/QuanLyDienNuoc/getphong.php',  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.props.navigation.getParam('user'),
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

  next(idp, nguoithue){
    //  alert(idp);
    this.props.navigation.navigate('Info_MH',
     {user: this.props.navigation.getParam('user'),
      idp: idp,
      tennguoithue: nguoithue});
  }

  addphong(){
    this.props.navigation.navigate('AddPhong_MH', {user: this.props.navigation.getParam('user')});
  }

  edit(idp, nguoithue, tenp, giap){
    this.props.navigation.navigate('EditPhong_MH', 
    {user: this.props.navigation.getParam('user'), idphong: idp, nguoithue: nguoithue, tenp: tenp, giap: giap });
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
        <View style={styles.container}>
          <SwipeListView
              numColumns ={2}
              horizontal={false}
              data={this.state.dataSource}
              renderItem={
              ({item}) => 
              <View>
                <TouchableHighlight onLongPress = {()=> this.edit(item.idphong, item.tennguoithue, 
                                                                    item.tenphong,item.giaphong)} 
                                    onPress = {()=> this.next(item.idphong, item.tennguoithue)}>
                    <View  style={styles.item}>
                        <View>
                          <View style={styles.SectionStyle}>
                            <Image
                                source={require('../img/room.jpg')}
                                style={styles.ImageStyle}
                            />
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: 'red'}} > {item.tenphong} </Text>             


                          </View>
                        </View>
                        
                        <View>
                          <View style={styles.SectionStyle}>
                            <Image
                                source={require('../img/person.png')}
                                style={styles.ImageStyle}
                            />
                            <Text style={{fontSize: 10, fontWeight: 'bold'}} ellipsizeMode={"middle"} 
                                      numberOfLines={1}> {item.tennguoithue} </Text>
                          </View>
                        </View>

                        <View>
                        <View style={styles.SectionStyle}>
                            <Image
                                source={require('../img/money.png')}
                                style={styles.ImageStyle}
                            />
                          <Text style={{fontSize: 10}}> Giá: {item.giaphong} / Tháng</Text>             
                        </View >
                      </View>
                    </View>
                </TouchableHighlight>
                </View>
              }
          />
          <TouchableOpacity onPress={() => this.addphong()} style={styles.fab}>
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>

      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        marginLeft: 5,
        paddingBottom: 10
      },
      
      item : {
          backgroundColor: '#fff'	,
          marginLeft: 12, 
          marginTop: 12, 
          marginRight: 5, 
          height: 80,
          width: 140,
          borderRadius: 8,
      },

      SectionStyle: {
        flexDirection: 'row',
        alignItems: 'center'
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

      ImageStyle: {
        marginLeft: 10,
         margin: 5,
         height: 15,
         width: 15,
         alignItems: 'center',
     },

      fabIcon: {
        fontSize: 30,
        color: 'white'
      },
  }
)