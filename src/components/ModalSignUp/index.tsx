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
    Modal,
} from 'native-base';
import { useForm } from 'react-hook-form';
import gymbrozTheme from "../../theme/gymbrozTheme";
import {useFeedback} from "../../context/useFeedback";
import Stepper from "react-native-stepper-ui";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { postRegisterUser, confirmEmail } from "../../services/register";


interface ModalProps {
    showModal: boolean;
    closeModal: () => void
}

export interface FormCreateAccountDTO {
    name: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    token: string;
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

const ModalSignUp: React.FC<ModalProps> = ({ showModal, closeModal }) => {
    const [loading, setLoading] = useState<Boolean>(true)
    const [active, setActive] = useState(0)

    const { control, handleSubmit, formState: { errors } } = useForm<FormCreateAccountDTO>();
    const { addFeedback } = useFeedback()

    const onSubmit = (data: FormCreateAccountDTO) => {
        if (active == 0) {
            setLoading(true)
            postRegisterUser({
                firstName: data.name,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            })
                .then(res => {
                    setLoading(false)
                    setActive((p) => p + 1);
                })
                .catch(error => {
                    setLoading(false)
                    addFeedback({
                        title: 'Erro no Cadastro dos Dados',
                        typeMessage: 'error',
                        description: error.response.data.message
                    })
                })
        } else if (active == 1) {
            setLoading(true)
            confirmEmail(data.token)
                .then(res => {
                    setLoading(false)
                    addFeedback({
                        title: 'Sucesso no Cadastro de Usuário',
                        typeMessage: 'success',
                        description: "O Usuário foi cadastrado e confirmado com sucesso no GymBroz!"
                    })
                })
                .catch(error => {
                    setLoading(false)
                    addFeedback({
                        title: 'Erro na Confirmação do E-mail',
                        typeMessage: 'error',
                        description: error.response.data.message
                    })
                })
        } else {

        }
    };

    const Etapa1 = (props: { title: string }) => {
        return(
            <View flex={1} justifyContent='flex-start' paddingTop={7}>
                <Center>
                    <Text paddingBottom={2} fontSize="2xl">Digite seu Dados</Text>
                    <VStack width="100%" mx="3" maxW="300px" paddingBottom={5}>
                        <FirstStep />
                    </VStack>
                </Center>
            </View>  
        );
    };
    
    const Etapa2 = (props: { title: string }) => {
        return(
            <Center flex={1} justifyContent='flex-start' paddingTop={7}>
                <Text paddingBottom={2} fontSize="2xl" textAlign={'center'}>
                    Insira o Token de Confirmação aqui para concluir seu Cadastro
                </Text>
                <VStack width="100%" mx="3" maxW="300px" paddingBottom={10}>
                    <SecondStep />
                </VStack>
                
            </Center>
        );
    };
    
    const content = [
        <Etapa1 title="Cadastro_Usuario_Etapa1" />,
        <Etapa2 title="Cadastro_Usuario_Etapa2" />,

    ];

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
                            <Text bold italic fontSize="4xl" style={styles.title}>Cadastre-se!</Text>
                        </Center>
                    </Modal.Header>
                    <Modal.Body>
                        <Center>
                        <Stepper
                            active={active}
                            content={content}
                            onBack={() => setActive((p) => p - 1)}
                            onFinish={handleSubmit(onSubmit)}
                            onNext={handleSubmit(onSubmit)}
                            stepStyle={{
                                width: 50, 
                                height: 50,
                                backgroundColor: gymbrozTheme.palette.secondary.main
                            }}
                            wrapperStyle={{
                                width: 350
                            }}
                            showButton={true}
                            buttonStyle={{
                                width: 130,
                                height: 50,
                                backgroundColor: gymbrozTheme.palette.secondary.main,
                                justifyContent: 'center',
                                
                            }}
                            buttonTextStyle={{
                                fontSize: 18,
                                textAlign: 'center'
                            }}
                        />
                        </Center>
                    </Modal.Body>
                    <Modal.Footer>
                            
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ModalSignUp