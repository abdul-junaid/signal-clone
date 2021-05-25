import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { View } from 'react-native'
import {Button , Input, Image} from 'react-native-elements'
import { auth } from '../firebase'

export const LoginScreen = ({ navigation }) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    useEffect(()=>{
        const unSubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace('Home')
            }
        })
    },[])

    login = ()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch(error=>alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container}
         behavior='padding' >
            <Image source={{
                uri : 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Signal_Blue_Icon.png'
            }}
            style={{width : 150, height : 150}} />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" 
                leftIcon={{type: 'font-awesome', name: 'envelope'}} 
                onChangeText={text=>setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" 
                leftIcon={{type : 'font-awesome', name : 'lock'}} 
                onChangeText={text=>setPassword(text)} />
            </View>
            <Button raised containerStyle={styles.button} onPress={login} title="Login" />
            <Button onPress={()=>navigation.navigate('Register')} containerStyle={styles.button} title="Register" type='outline' />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    inputContainer:{
        width : 300,
        marginTop : 10
    },
    button:{
        width : 200,
        marginTop : 10
    }
})
