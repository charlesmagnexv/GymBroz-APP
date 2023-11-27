import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../../context/auth";
import {
    FormControl,
    Input,
    Center,
    VStack,
    Button,
    Spinner,
    View,
    Image,
    Text,
    Modal,
    WarningOutlineIcon,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import gymbrozTheme from "../../theme/gymbrozTheme";
import {useFeedback} from "../../context/useFeedback";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ModalUserImage from "../ModalUserImage";
import ModalConfirmEmail from "../ModalConfirmEmail";


const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface ModalProps {
    showModal: boolean;
    closeModal: () => void
}

export type FormCreateAccountDTO = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    token: string;
}

const ModalSignUp: React.FC<ModalProps> = ({ showModal, closeModal }) => {
    const [loading, setLoading] = useState<Boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { signUp } = useAuth();
    const { addFeedback } = useFeedback()
    const { watch, control, handleSubmit, formState: { errors } } = useForm<FormCreateAccountDTO>();

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const confirmPassword = (value: string) => {
        if (value !== watch('password')) {
            return 'As senhas não são iguais'
        }
        return true
    }
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowRePassword = () => {
        setShowRePassword(!showRePassword);
    };

    const onSubmit = (data: FormCreateAccountDTO) => {
        setLoading(true);
        console.log("Ativado")
        signUp({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        })
            .then(res => {
                setLoading(false)
                addFeedback({
                    title: 'Sucesso no Cadastro de Usuário',
                    typeMessage: 'success',
                    description: "O Usuário foi cadastrado com sucesso no GymBroz!"
                })
                console.log("Deu certo")
                closeModal()
                setModalVisible(true)
            })
            .catch(error => {
                setLoading(false)
                addFeedback({
                    title: 'Erro no Cadastro dos Dados',
                    typeMessage: 'error',
                    description: error.response.data.message
                })
                console.log("ERRO")
            })
    };

    return (
        <>
            <Modal 
                isOpen={showModal} 
                onClose={closeModal}
                >
                <Modal.Content width={400}>
                    <Modal.CloseButton />
                    <Modal.Header>    
                        <Center>
                            <Text bold italic fontSize="4xl" 
                                color={gymbrozTheme.palette.secondary.main}
                            >
                                Cadastre-se!
                            </Text>
                        </Center>
                    </Modal.Header>
                    <Modal.Body>
                        <Center flex={1} justifyContent='flex-start' paddingTop={5}>
                            <Text paddingBottom={2} bold fontSize="md" style={styles.title}>
                                Digite seus Dados nos campos abaixo
                            </Text>
                            <VStack width="100%" mx="3" space={2} maxW="300px" paddingBottom={5}>
                                <FormControl isRequired isInvalid={'firstName' in errors} mt={3}>
                                    <FormControl.Label mt={2}>Nome</FormControl.Label>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                onBlur={onBlur}
                                                placeholder="Nome"
                                                onChangeText={(val) => onChange(val)}
                                                value={value}
                                                _focus={{
                                                    bg: 'lightBlue.50'
                                                }}
                                                autoCapitalize='none'
                                            />
                                        )}
                                        name="firstName"
                                        rules={{
                                            required: 'Campo obrigatório',
                                        }}
                                        defaultValue=""
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.firstName?.message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'lastName' in errors} mt={3}>
                                    <FormControl.Label mt={2}>Sobrenome</FormControl.Label>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                onBlur={onBlur}
                                                placeholder="Sobrenome"
                                                onChangeText={(val) => onChange(val)}
                                                value={value}
                                                _focus={{
                                                    bg: 'lightBlue.50'
                                                }}
                                                autoCapitalize='none'
                                            />
                                        )}
                                        name="lastName"
                                        rules={{
                                            required: 'Campo obrigatório',
                                        }}
                                        defaultValue=""
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.lastName?.message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'email' in errors} mt={3}>
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
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.email?.message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'password' in errors} mt={3}>
                                    <FormControl.Label mt={2}>Senha</FormControl.Label>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                onBlur={onBlur}
                                                secureTextEntry={!showPassword}
                                                placeholder="Senha"
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
                                                    color="#aaa"
                                                    style={styles.icon}
                                                    onPress={toggleShowPassword} />}
                                            />
                                        )}
                                        name="password"
                                        rules={{
                                            required: 'Campo obrigatório',
                                            minLength: {
                                                value: 8,
                                                message: "Senha deve ter no mínimo 8 caracteres"
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!*_\-])[a-zA-Z\d@#$%^&!*_\-]{8,}$/,
                                                message: "Senha inválida"
                                            },
                                        }}
                                        defaultValue=""
                                    />

                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.password?.message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'repassword' in errors} mt={3}>
                                    <FormControl.Label mt={2}>Confirmar Senha</FormControl.Label>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                onBlur={onBlur}
                                                secureTextEntry={!showRePassword}
                                                placeholder="Confirmar Senha"
                                                type="password"
                                                onChangeText={(val) => onChange(val)}
                                                value={value}
                                                _focus={{
                                                    bg: 'lightBlue.50'
                                                }}
                                                autoCapitalize='none'
                                                InputRightElement={<MaterialCommunityIcons
                                                    name={showRePassword ? 'eye-off' : 'eye'}
                                                    size={28}
                                                    color="#aaa"
                                                    style={styles.icon}
                                                    onPress={toggleShowRePassword} />}
                                            />
                                        )}
                                        name="repeatPassword"
                                        rules={{
                                            required: 'Campo obrigatório',
                                            minLength: {
                                                value: 8,
                                                message: "Confirmar Senha deve ter no mínimo 8 caracteres"
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!*_\-])[a-zA-Z\d@#$%^&!*_\-]{8,}$/,
                                                message: "Confirmar Senha inválido"
                                            },
                                            validate: confirmPassword
                                        }}
                                        defaultValue=""

                                    />

                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.repeatPassword?.message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </VStack>
                            {loading ?
                                <View style={styles.spinnerStyle} mt={6} >
                                    <Spinner color='white' />
                                </View> :
                                <Button
                                        onPress={handleSubmit(onSubmit)}
                                        bg={gymbrozTheme.palette.secondary.main}
                                        _pressed={{ bg: gymbrozTheme.palette.secondary.dark }}
                                        width={150}
                                        mt={6}
                                        borderColor={gymbrozTheme.palette.primary.main}
                                        borderWidth={1}
                                        leftIcon={<MaterialIcons name="assignment" size={24} color="white" />}
                                        alignContent={'center'}
                                    >
                                    Cadastrar
                                </Button>}
                        </Center>
                    </Modal.Body>
                    <Modal.Footer>
                            
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <ModalConfirmEmail showModal={modalVisible} closeModal={handleCloseModal} />

        </>
    )
}

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

export default ModalSignUp