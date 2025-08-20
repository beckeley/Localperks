import { StyleSheet, Text, View } from 'react-native'
import React, {useState } from 'react'
import { IconButton } from 'react-native-paper';
const BellButton = () => {

    const [bellActive, setBellActive] = useState(false);
    
  return (
    <View>
     <IconButton
        icon="bell"
        size={24}
        onPress={() => setBellActive(!bellActive)}
        iconColor={bellActive ? '#FFD700' : '#888'}
      />
   
    </View>
  )
}

export default BellButton

const styles = StyleSheet.create({})