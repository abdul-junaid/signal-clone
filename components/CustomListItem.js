import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const CustomListItem = ({id, chatName, getChat}) => {
    return (
        <ListItem key={id} bottomDivider 
        onPress={getChat} >
            <Avatar rounded source={{ uri: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' }} />
            <ListItem.Content>
                <ListItem.Title>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1}>lorem ipsum doler</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
