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
    useTheme
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
    email: string;
    password: string;
};

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const SignIn: React.FC = () => {
    const [loading, setLoading] = useState<Boolean>(false)

    const { colors } = useTheme()
    const { signIn } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        setLoading(true)
        signIn({
            email: data.email,
            password: data.password
        }).then(res => {
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    };

    return (
        <Center flex={1}>
            <VStack width="100%" mx="3" maxW="300px">
                <FormControl isInvalid={'email' in errors}>
                    <FormControl.Label>E-mail</FormControl.Label>
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
                            />
                        )}
                        name="email"
                        rules={{
                            required: 'Campo obrigatório',
                            pattern: REGEX_EMAIL
                        }}
                        defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                        {errors.email?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={'password' in errors}>
                    <FormControl.Label>Senha</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                placeholder="Password"
                                type="password"
                                onChangeText={(val) => onChange(val)}
                                value={value}
                                _focus={{
                                    bg: 'lightBlue.50'
                                }}
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
                {loading ? <Spinner />
                    : <Button onPress={handleSubmit(onSubmit)} colorScheme="tertiary" mt={5}>
                        Entrar
                    </Button>}
            </VStack>
        </Center>
    )
};

export default SignIn;