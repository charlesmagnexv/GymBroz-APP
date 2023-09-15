import { View, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
const Account: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Conta</Text>
        </View>
    )
}

export default Account