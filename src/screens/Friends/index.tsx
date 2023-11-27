import { 
    View, 
    Text, 
    ScrollView, 
    Center, 
    VStack
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});

const Friends: React.FC = () => {
    return (
        <ScrollView>
            <Center flex={1} justifyContent='flex-start' paddingTop={12} paddingBottom={10}>
                <VStack>
                    <Text>Chat para Amigos</Text>
                    
                </VStack> 
            </Center>
        </ScrollView>
    )
}

export default Friends