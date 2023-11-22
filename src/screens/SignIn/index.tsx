import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../../context/auth";
import {
    VStack,
    Button,
    FormControl,
    Input,
    Center,
    Spinner,
    View,
    Image,
    Text,
    ScrollView
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import gymbrozTheme from "../../theme/gymbrozTheme";
import { useFeedback } from "../../context/useFeedback";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ModalSignUp from "../../components/ModalSignUp";

type FormData = {
    email: string;
    password: string;
};

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const styles = StyleSheet.create({
    title: {
        color: gymbrozTheme.palette.primary.main,
    },
    icon: {
        marginRight: 10,
    },
    spinnerStyle: {
        width: 300,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: gymbrozTheme.palette.muted[300],
        borderRadius: 5,
    },
});
  

const SignIn: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { signIn } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { addFeedback } = useFeedback()

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data: FormData) => {
        setLoading(true)
        signIn({
            email: data.email,
            password: data.password
        }).then(res => {
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            addFeedback({
                title: 'Erro no login',
                typeMessage: 'error',
                description: err.response.data.message
            })
        })
    };

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <ScrollView>
            <Center flex={1} justifyContent='flex-start' paddingTop={12}>
                <Text bold fontSize="2xl" style={styles.title}>GymBroz</Text>
                <Image source={require('../../../assets/img/img-gymbroz.png')} size={'xl'} alt={"Homem forte"} />
                <VStack width="100%" mx="3" maxW="300px">
                    <FormControl isInvalid={'email' in errors}>
                        <FormControl.Label mt={2}>E-mail</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    placeholder="E-mail"
                                    onChangeText={(val) => onChange(val)}
                                    value={value}
                                    _focus={{
                                        bg: 'lightBlue.50'
                                    }}
                                    autoCapitalize='none'
                                />
                            )}
                            name="email"
                            rules={{
                                required: 'Campo obrigatório',
                                pattern: { value: REGEX_EMAIL, message: 'E-mail inválido' }
                            }}
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage>
                            {errors.email?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={'password' in errors}>
                        <FormControl.Label mt={2}>Senha</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    secureTextEntry={!showPassword}
                                    placeholder="Password"
                                    type="password"
                                    onChangeText={(val) => onChange(val)}
                                    value={value}
                                    _focus={{
                                        bg: 'lightBlue.50'
                                    }}
                                    autoCapitalize='none'
                                    InputRightElement={<MaterialCommunityIcons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={28}
                                        style={styles.icon}
                                        onPress={toggleShowPassword} />}
                                />
                            )}
                            name="password"
                            rules={{ required: 'Campo obrigatório', }}
                            defaultValue=""
                        />

                        <FormControl.ErrorMessage>
                            {errors.password?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    {loading ?
                        <View style={styles.spinnerStyle} mt={6} >
                            <Spinner color='white' />
                        </View> :
                        <Button
                            onPress={handleSubmit(onSubmit)}
                            bg={gymbrozTheme.palette.secondary.main}
                            _pressed={{ bg: gymbrozTheme.palette.secondary.dark }}
                            mt={6}
                        >
                            Entrar
                        </Button>}
                </VStack>
                <Text
                    color={gymbrozTheme.palette.primary.main}
                    mt={10}
                    underline
                    fontSize="md"
                >
                    Recuperar Acesso
                </Text>
                <Text
                    color={gymbrozTheme.palette.primary.main}
                    mt={2}
                    fontSize="md"
                    
                >
                    Não tem uma conta?
                    <Text
                        color={gymbrozTheme.palette.primary.main}
                        underline
                        fontSize="md"
                        onPress={() => setModalVisible(true)}
                    >
                    Cadastre-se
                    </Text>
                </Text>
                <ModalSignUp showModal={modalVisible} closeModal={handleCloseModal} />
            </Center>
        </ScrollView>
    )
};

export default SignIn;