import { View, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
const Friends: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Amigos</Text>
        </View>
    )
}

export default Friends