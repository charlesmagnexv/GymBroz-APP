import {
    VStack,
    Button,
    Input,
    Center,
    Spinner,
    View,
    Image,
    Text,
    HStack,
    ScrollView,
    Box,
    Heading
} from 'native-base';
import React, { useState } from "react";
import { 
    StyleSheet, 
    TouchableHighlight, 
    TouchableOpacity
} from "react-native";
import { useAuth } from "../../context/auth";
import gymbrozTheme from '../../theme/gymbrozTheme';
import { FontAwesome, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons'; 
import ModalUserImage from '../../components/ModalUserImage';

import { SwipeListView } from 'react-native-swipe-list-view';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    spinnerStyle: {
        width: 300,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: gymbrozTheme.palette.muted[300],
        borderRadius: 5,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 70,
        borderColor: gymbrozTheme.palette.primary.main,
        borderWidth: 2
    },
    backRightBtnLeft: {
        backgroundColor: gymbrozTheme.palette.secondary.main,
        right: 70,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});


const Account: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [listData, setListData] = useState(
        Array(10)
            .fill('')
            .map((_, i) => ({ key: `${i}`, text: `#${i+1}` }))
    );
    
    const { user, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        
        <ScrollView>
            <Center flex={1} justifyContent='flex-start' paddingTop={3} paddingBottom={10}>
                <Text 
                    bold 
                    italic 
                    fontSize="4xl" 
                    paddingTop={12} 
                    paddingBottom={5}
                    color={gymbrozTheme.palette.primary.main}>
                        Conta
                </Text>
                <Image source={require('../../../assets/img/baseUserImage-gymbroz.png')} 
                    size={150}
                    style={{
                        borderColor: gymbrozTheme.palette.primary.main,
                        borderWidth: 2,
                        borderRadius: 75,
                    }}
                    alt={"Imagem do Perfil"} 
                />
                <HStack paddingTop={1} space={12} paddingLeft={10}>
                    <MaterialCommunityIcons />
                    <MaterialCommunityIcons name="account-edit" 
                        style={{
                            backgroundColor: gymbrozTheme.palette.secondary.main,
                            borderColor: gymbrozTheme.palette.primary.main,
                            borderWidth: 2,
                            borderRadius: 75,
                        }} 
                        size={40}
                        color="black" 
                        onPress={() => setModalVisible(true)}/>
                </HStack>
                <VStack width="100%" mx="3" maxW="300px" space={6} paddingTop={1}>
                    <VStack space={2}>
                        <Text bold fontSize={18} color={gymbrozTheme.palette.primary.main} >Nome</Text>
                        <Input  
                            backgroundColor={gymbrozTheme.palette.muted[300]}
                            borderColor={'black'}
                            size="lg" 
                            fontSize={18}
                            color={gymbrozTheme.palette.primary.main}
                            placeholder={user?.firstName} 
                            placeholderTextColor={gymbrozTheme.palette.primary.main}
                            isDisabled
                        />
                    </VStack>
                    <VStack space={2}>
                        <Text bold fontSize={18} color={gymbrozTheme.palette.primary.main} >Sobrenome</Text>
                        <Input  
                            backgroundColor={gymbrozTheme.palette.muted[300]}
                            borderColor={'black'}
                            size="lg" 
                            fontSize={18}
                            color={gymbrozTheme.palette.primary.main}
                            placeholder={user?.lastName} 
                            placeholderTextColor={gymbrozTheme.palette.primary.main}
                            isDisabled
                        />
                    </VStack>
                    <VStack space={2}>
                        <Text bold fontSize={18} color={gymbrozTheme.palette.primary.main} >E-mail</Text>
                        <Input  
                            backgroundColor={gymbrozTheme.palette.muted[300]}
                            borderColor={'black'}
                            size="lg" 
                            fontSize={18}
                            color={gymbrozTheme.palette.primary.main}
                            placeholder={user?.email} 
                            placeholderTextColor={gymbrozTheme.palette.primary.main}
                            isDisabled
                        />
                    </VStack>
                    <VStack space={2}>
                        <Text bold fontSize={18} color={gymbrozTheme.palette.primary.main} >Amigos</Text>
    
                    </VStack>
                    <Center>
                        {loading ?
                            <View style={styles.spinnerStyle} mt={6} >
                                <Spinner color='white' />
                            </View> :
                            <Button
                                onPress={handleSignOut}
                                bg={gymbrozTheme.palette.red.main}
                                _pressed={{ bg: gymbrozTheme.palette.red.dark }}
                                mt={6}
                                width={200}
                                leftIcon={<FontAwesome name="sign-out" size={27} color="white" />}
                            >
                                Sign-Out
                            </Button>}
                    </Center>
                </VStack>
                <ModalUserImage showModal={modalVisible} closeModal={handleCloseModal} />
            </Center>
        </ScrollView>
    )
}

export default Account