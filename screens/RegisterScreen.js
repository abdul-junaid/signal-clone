import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { View, StyleSheet } from 'react-native'
import {Button, Input, Text} from 'react-native-elements'
import { auth } from '../firebase'

export const RegisterScreen = ({navigation}) => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')

    // useLayoutEffect(()=>{
    //     navigation.setOptions({
    //         headerBackTitle: "Back to login"
    //     })
    // },[navigation])

    register = ()=>{
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser=>{
            authUser.user.updateProfile({
                displayName : name,
                photoURL : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
            })
        })
        .catch(error=>alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text h3>Register Here</Text>
            <View style={styles.inputContainer}>
                <Input type="text" autoFocus placeholder="Full Name" 
                value={name} 
                onChangeText={text=>setName(text)} />
                <Input type="number" placeholder="Phone Number" 
                value={phone} 
                onChangeText={text=>setPhone(text)} />
                <Input type="email" placeholder="Email Address" 
                value={email} 
                onChangeText={text=>setEmail(text)} />
                <Input type="password" secureTextEntry placeholder="Password" 
                value={password} 
                onChangeText={text=>setPassword(text)} />
            </View>
            <Button raised title="Register" onPress={register} containerStyle={styles.button} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent:'center'
    },
    inputContainer:{
        width : 300,
        marginTop:20
    },
    button:{
        width : 200,
        marginTop : 10
    }
})