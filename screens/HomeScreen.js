import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import CustomListItem from '../components/CustomListItem'
import { TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    useEffect(() => {
        const unSubscribe = db.collection('chats').onSnapshot((snapshot) => {
            setChats(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        })
        return unSubscribe;
    }, [])

    const signOutUser = () => {
        auth.signOut().then(() => navigation.replace('Login'))
    }

    const getChat = (id,chatName)=>{
        navigation.navigate('ChatScreen',{
            // id : id,
            // chatName : chatName
            id,
            chatName
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chats',
            headerStyle: { backgroundColor: '#ffffff' },
            headerTitleStyle: { color: '#000000' },
            headerTintColor: '#000000',
            headerLeft: () => (
                <View style={{
                    marginLeft: 20,
                    color: '#000000'
                }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser} >
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    marginRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 80,
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='#000000' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateChat')} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color='#000000' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <StatusBar style='dark' />
                {
                    chats.map(({ id, data: { chatName } }) => (
                        <CustomListItem key={id} id={id} chatName={chatName} getChat={()=>getChat(id,chatName)} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})
