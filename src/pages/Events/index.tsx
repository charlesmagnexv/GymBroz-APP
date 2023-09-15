import { View, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
const Events: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Eventos</Text>
        </View>
    )
}

export default Events