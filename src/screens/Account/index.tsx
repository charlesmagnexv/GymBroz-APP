import { View, Text } from "native-base";
import React from "react";
import { Button, StyleSheet } from "react-native";
import { useAuth } from "../../context/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
const Account: React.FC = () => {
    const { user, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }
    return (
        <View style={styles.container}>
            <Text>Conta</Text>
            <Text>{user?.firstName}</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    )
}

export default Account