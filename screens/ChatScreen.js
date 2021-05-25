import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Text, Avatar } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { Keyboard } from 'react-native'
import { auth, db } from '../firebase'
import * as firebase from 'firebase'

const ChatScreen = ({ navigation, route }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'left',

            headerTitle: () => (
                <View style={styles.headerContainer}>
                    <Avatar rounded source={{ uri: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' }} />
                    <Text style={styles.headerText}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.iconContainer}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Ionicons name='videocam' color='#ffffff' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Ionicons name='call' color='#ffffff' size={24} />
                    </TouchableOpacity>
                </View >
            )
        })
    }, [])

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])


    useEffect(() => {
        const unSubscribe = db.collection('chats').doc(route.params.id).collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        return unSubscribe;
    }, [])

    const sendMessage = () => {
        Keyboard.dismiss()
        db.collection('chats').doc(route.params.id).collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
            })

        setInput('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : -200} >
                <ScrollView>
                    {
                        messages.map((data, index) => (
                            auth.currentUser.email === data.email ?
                                <View style={styles.senderContainer}>
                                    <Text style={styles.senderText} >{data.message}</Text>
                                    <Avatar size={30} rounded source={{
                                        uri: data.photoURL
                                    }} />
                                </View> :
                                <View style={styles.recieverContainer}>
                                    <Text style={styles.recieverText} >{data.message}</Text>
                                    <View style={styles.recieverDetails}>
                                        <Avatar size={30} rounded source={{
                                            uri: data.photoURL
                                        }} />
                                        <Text style={styles.recieverName}>{data.displayName}</Text>
                                    </View>
                                </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput placeholder="Type Signal"
                        onChangeText={text => setInput(text)} value={input}
                        style={styles.inputText} />
                    <TouchableOpacity activeOpacity={0.5} onPress={sendMessage} >
                        <Ionicons name='send' color='dodgerblue' size={28} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#ffffff',
        fontWeight: '700',
        marginLeft: 10
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        width: 80
    },
    container: {
        flex: 1
    },
    footer: {
        bottom: 0,
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    inputText: {
        flex: 1,
        backgroundColor: '#dfdfdf',
        marginRight: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 30,
    },
    senderContainer: {
        marginTop: 10,
        alignItems: 'flex-end'
    },
    senderText: {
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 12,
        fontSize: 16
    },
    recieverContainer: {
        marginTop: 10,
        alignItems: 'flex-start'
    },
    recieverText: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 12,
        fontSize: 16,
        color : '#ffffff'
    },
    recieverDetails : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    recieverName : {
        fontSize : 11
    }
})
