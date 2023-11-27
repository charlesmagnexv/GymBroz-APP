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
import { confirmEmail } from "../../services/register";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FormCreateAccountDTO } from "../ModalSignUp";

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

interface ModalProps {
    showModal: boolean;
    closeModal: () => void
}

const ModalConfirmEmail: React.FC<ModalProps> = ({ showModal, closeModal }) => {
    const [loading, setLoading] = useState<Boolean>(false);

    const { addFeedback } = useFeedback()
    const { control, handleSubmit, formState: { errors } } = useForm<FormCreateAccountDTO>();

    const onSubmit = (data: FormCreateAccountDTO) => {
        setLoading(true)
        console.log("Ativado")
            confirmEmail(data.token)
                .then(res => {
                    setLoading(false)
                    console.log("SUCESSO")
                    addFeedback({
                        title: 'Sucesso na Confirmação do E-mail',
                        typeMessage: 'success',
                        description: "O E-mail do Usuário foi confirmado com sucesso!"
                    })
                    closeModal()
                })
                .catch(error => {
                    setLoading(false)
                    console.log("ERROR")
                    addFeedback({
                        title: 'Erro na Confirmação do E-mail',
                        typeMessage: 'error',
                        description: error.response.data.message
                    })
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
                                Insira o Token de Confirmação aqui para concluir seu Cadastro
                            </Text>
                            <VStack width="100%" mx="3" space={2} maxW="300px" paddingBottom={5}>
                                <FormControl isInvalid={'token' in errors} mt={3}>
                                    <FormControl.Label mt={2}>Token</FormControl.Label>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                onBlur={onBlur}
                                                placeholder="Token"
                                                onChangeText={(val) => onChange(val)}
                                                value={value}
                                                _focus={{
                                                    bg: 'lightBlue.50'
                                                }}
                                                autoCapitalize='none'
                                                paddingBottom={20}
                                            />
                                        )}
                                        name="token"
                                        rules={{
                                            required: 'Campo obrigatório',
                                        }}
                                        defaultValue=""
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {errors.token?.message}
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
                                    Confirmar
                                </Button>}
                        </Center>
                    </Modal.Body>
                    <Modal.Footer>
                            
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
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

export default ModalConfirmEmail