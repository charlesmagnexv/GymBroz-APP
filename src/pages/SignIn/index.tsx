import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { signIn } from "../../services/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const SignIn: React.FC = () => {
    async function handleSign() {
        const response = await signIn()
        console.log(response)
    }

    return (
        <View style={styles.container}>
            <Button title="Entrar" onPress={() => { handleSign }} />
        </View>
    )
};

export default SignIn;