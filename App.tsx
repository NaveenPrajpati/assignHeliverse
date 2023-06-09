import { Animated, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

export default function App() {
  const[screen1,setScreen1]=useState(true)
  const[screen2,setScreen2]=useState(false)
  const[screen3,setScreen3]=useState(false)
  const[closeProfile,setCloseProfile]=useState(false)
  const[num,setNum]=useState(15)

  useEffect(()=>{
    const myTimeout= setTimeout(() => {
      setScreen1(false)
      setScreen2(true)
      clearTimeout(myTimeout)
    }, 3000);
  },[screen1==true])

  useEffect(()=>{
    const myTimeout= setTimeout(() => {
      setScreen2(false)
      setScreen3(true)
      clearTimeout(myTimeout)
    }, 15000);
  },[screen2===true])

  useEffect(() => {
    
    const interval = setInterval(() => {
      if(screen3)
      setNum((prevNum) => {
        if (prevNum < 40) {
          return prevNum + 1;
        } else {
          clearInterval(interval);
          return prevNum;
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [screen3===true]);

  //animation reference
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animate(); // Start the animation when the component mounts
  }, []);

  const animate = () => {
    Animated.timing(animatedValue, {
      toValue: 1, 
      duration: 200, 
      useNativeDriver: true,
    }).start(); 
  };

  const animstart = animatedValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: [200,100],
  });
  const animstart2 = animatedValue.interpolate({
    inputRange: [0.5,1],
    outputRange: [100,-350],
  });


  return (
    <View>
      <View style={styles.container} >

        {
          screen1 && <View style={styles.topScreen1}>
      
            <Image style={{width:100,height:100,marginTop:100,transform:[{translateX:60}]}} source={require('./Assets/castingLogo.png')}></Image>
            <Text style={{color:'white',fontSize:20,transform:[{rotate:'-15deg'},{translateY:-45},{translateX:85}]}}>04:52:59</Text>
            
            <Text style={{color:'pink',top:5,fontSize:30,transform:[{rotate:'-10deg'},{translateY:-30},{translateX:35}]}}>CASTING CALL</Text>
            <Text style={{color:'yellow',top:15,fontSize:30}}>The Results R In!</Text>
          </View>
        }
        {
          screen2 && <View style={{position:'absolute',zIndex:2,top:50}}>
            
            <Animated.View style={[{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:45,width:'100%'}, {transform: [{translateX:animstart },{translateX:closeProfile?animstart2:0}]},]}>
            
            <Image style={{width:100,height:100,borderRadius:50,borderWidth:2,borderColor:'yellow'}} source={require('./Assets/avtar2.png')}></Image>
            <View style={{alignItems:'center'}}>
              <Text style={{color:'white',fontSize:40,}}>D-Lister</Text>
            <Text style={{color:'white',fontSize:20,}}>Sally</Text>
            </View>
            </Animated.View>
            
            <Text style={{color:'pink',top:5,fontSize:30,}}>Gave U Some Love</Text>
            <View style={{alignItems:'center',marginTop:50 ,gap:-115}}>
            <Image style={{width:200,height:150,}} source={require('./Assets/main-heart.png')}></Image>
            <Text style={{color:'yellow',top:15,fontSize:40}}>15000</Text>
            </View>
          </View>
        }

{
          screen3 && <View style={{position:'absolute',zIndex:2,top:50}}>
            
            
            
            <Text style={{color:'yellow',top:5,fontSize:40,textAlign:'center'}}>4 Friends Gave  U {"\n"}Some Love</Text>
            <View style={{alignItems:'center',marginTop:50 ,gap:-115}}>
            <Image style={{width:200,height:150,}} source={require('./Assets/main-heart.png')}></Image>
            <Text style={{color:'yellow',top:15,fontSize:40}}>{num}000</Text>
            </View>
          </View>
        }

       
       <Image style={styles.image} source={require('./Assets/award_bg.png')}></Image>
       <View style={styles.arrowImageView}>
       <Image style={styles.image3} source={require('./Assets/girlClap.png')}></Image>
      <TouchableOpacity style={styles.arrowImage} onPress={() =>{
        if(screen2)
        setCloseProfile(true)
        if(screen3){
        setScreen3(false)
        setScreen2(false)
        setNum(15)
        setCloseProfile(false)
          setScreen1(true)
        }
        }}>
       <Image style={{width:50,height:50}} source={require('./Assets/arrow.png')}></Image>
      </TouchableOpacity>
       </View>
       <Image style={styles.image2} source={require('./Assets/awardPlatform.png')}></Image>
      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
   
   position:'relative',
   backgroundColor:'red',
   flexDirection:'row',
   justifyContent:'center'
  
  },
  topScreen1:{
position:'absolute',
zIndex:2,



  },
  image: {
    width: '100%',
    height: '100%',
  },
  image2:{
    position:'absolute',
    bottom:0,
    width: '100%',
    zIndex:1

  },
  image3:{
    width: 100,
    height:340,
   
  },
  arrowImageView:{
    width:'100%',
    flexDirection:'row',
    bottom:55,
   
    position:'absolute',
    justifyContent:'flex-end',
    alignItems:'center',
    gap:100,
    zIndex:2 

  },
  arrowImage:{
    width:50,
    height:50,
  }
})