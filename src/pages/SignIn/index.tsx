import React from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../../context/auth";
import {
    VStack,
    Button,
    FormControl,
    Input,
    Center,
    Spinner
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
    const { signIn } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        signIn({
            email: data.email,
            password: data.password
        })
    };

    return (
        <Center flex={1}>
            <VStack width="100%" mx="3" maxW="300px">
                <FormControl isRequired isInvalid={'email' in errors}>
                    <FormControl.Label>E-mail</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                placeholder="E-mail"
                                onChangeText={(val) => onChange(val)}
                                value={value}
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
                    <FormControl.Label>Password</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                placeholder="Password"
                                onChangeText={(val) => onChange(val)}
                                value={value}
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
                <Button onPress={handleSubmit(onSubmit)} colorScheme="pink">
                    Entrar
                </Button>
            </VStack>
        </Center>
    )
};

export default SignIn;