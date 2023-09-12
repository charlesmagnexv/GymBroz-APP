import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useAuth } from "../../context/auth";
import {
    VStack,
    Button,
    FormControl,
    Input,
    Center,
    Spinner
} from 'native-base';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState({});
    const { signIn, loading } = useAuth();

    function handleSign() {
        validate() ? signIn({
            email,
            password
        }) : console.log(errors)
    }

    const validate = () => {
        if (email === undefined) {
            setErrors({
                ...errors,
                name: 'Campo e-mail é obrigatório'
            });
            return false;
        } else if (password === undefined) {
            setErrors({
                ...errors,
                name: 'Campo senha é obrigatório'
            });
            return false;
        }
        return true;
    };

    return (
        <Center flex={1}>
            <Text>{`Teste: ${loading}`}</Text>
            <VStack width="100%" mx="3" maxW="300px">
                <FormControl isRequired isInvalid={'email' in errors}>
                    <FormControl.Label _text={{
                        bold: true
                    }}>
                        Email
                    </FormControl.Label>
                    <Input placeholder="E-mail" onChangeText={value => setEmail(value)} />
                    {'email' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
                        Campo e-mail é obrigatório
                    </FormControl.HelperText>}
                </FormControl>
                <FormControl isRequired isInvalid={'password' in errors}>
                    <FormControl.Label _text={{
                        bold: true
                    }}>
                        Senha
                    </FormControl.Label>
                    <Input placeholder="Senha" type="password" onChangeText={value => setPassword(value)} />
                    {'password' in errors ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage> : <FormControl.HelperText>
                        Campo senha é obrigatório
                    </FormControl.HelperText>}
                </FormControl>
                <Button onPress={() => { handleSign() }} mt="5" colorScheme="cyan">
                    {loading ? <Spinner color="cyan.500" /> : 'Entrar'}
                </Button>
            </VStack>
        </Center>
    )
};

export default SignIn;