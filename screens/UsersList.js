import React, { useEffect, useState } from 'react'
import { ScrollView, Button } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

export default (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapShot => {
            let users = []
            querySnapShot.docs.forEach(doc => {
                let { name, email, phone } = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone,
                })
            })
            setUsers(users)
        })
    }, [])

    return (
        <ScrollView>
            <Button
                title="Crear usuario"
                onPress={() => props.navigation.navigate("create-user")}
            />
            {
                users.map(user => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('details', {
                            userId: user.id,
                        })}>
                            <ListItem.Chevron />
                            <Avatar
                                source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}
                                rounded
                            />
                            <ListItem.Content>
                                <ListItem.Title> {user.name} </ListItem.Title>
                                <ListItem.Subtitle> {user.email} </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}