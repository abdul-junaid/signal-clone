import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { db } from '../firebase'
import { Ionicons } from '@expo/vector-icons'

const CreateChatScreen = ({ navigation }) => {

    const [input,setInput] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title : 'Create New Chat',
        })
    },[navigation])

    const createChat = async ()=>{
        await db.collection('chats')
        .add({
            chatName : input
        })
        .then(()=>{
            navigation.goBack();
        })
        .catch(error=>alert(error))
    }

    return (
        <View style={styles.container}>
            <Input placeholder="Enter Chat Name" 
            onChangeText={text=>setInput(text)} leftIcon={()=>(
                <Ionicons name='chatbox' size={24} />
            )} />
            <Button containerStyle={{width:300}} title='Create' onPress={createChat} />
        </View>
    )
}

export default CreateChatScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})
