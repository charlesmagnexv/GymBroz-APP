import React, { useContext } from "react";
import { View, Button, StyleSheet } from "react-native";
import { signIn } from "../../services/auth";
import{ useAuth } from "../../context/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const SignIn: React.FC = () => {
    const { signIn } = useAuth();

    function handleSign() {
        signIn()
    }

    return (
        <View style={styles.container}>
            <Button title="Entrar" onPress={() => { handleSign() }} />
        </View>
    )
};

export default SignIn;