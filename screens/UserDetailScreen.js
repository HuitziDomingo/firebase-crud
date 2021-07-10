import React, { useEffect, useState } from 'react'
import { ScrollView, View, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import firebase from '../database/firebase'

export default (props) => {

    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: '',
    }
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)  //Consulta a firebase
        const doc = await dbRef.get()
        const user = doc.data()
        setUser({
            ...user, //Le pasamos todos los datos por defecto
            id: doc.id,
        });
        setLoading(false)
    };
    useEffect(() => {
        getUserById(props.route.params.userId)
    }, []);

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value });
    }

    if (loading)
        return (
            <View>
                <ActivityIndicator color="purple" size="large" />
            </View>
        )

    //Actualizar
    const upgradeUserById = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id)
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone,
        })
        setUser(initialState)
        props.navigation.navigate("user-list")
    }

    //Eliminar
    const deleteUserById = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
        await dbRef.delete()
        props.navigation.navigate("user-list")
    }
    const openConfimation = () => {
        Alert.alert("Desea eliminar este usuario", "Esta seguro", [
            { text: 'Si', onPress: () => deleteUserById() },
            { text: 'No', onPress: () => console.log(false) },
        ])
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Nombre"
                    onChangeText={(value) => handleChangeText('name', value)}
                    value={user.name}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Correo"
                    onChangeText={(value) => handleChangeText('email', value)}
                    value={user.email}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Telefono"
                    onChangeText={(value) => handleChangeText('phone', value)}
                    value={user.phone}
                />
            </View>
            <View>
                <Button color="#543ecf" title="Actualizar Usuario" onPress={() => upgradeUserById()} />
            </View>
            <View>
                <Button color="#fce345" title="Eliminar Usuario" onPress={() => openConfimation()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
})