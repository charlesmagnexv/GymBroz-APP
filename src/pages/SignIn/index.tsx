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
    Text,
    WarningTwoIcon
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import gymbrozTheme from "../../theme/gymbrozTheme";

type FormData = {
    email: string;
    password: string;
};

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const styles = StyleSheet.create({
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
    const [loading, setLoading] = useState<boolean>(false)

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
            // err.response.data.message
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
                            pattern: { value: REGEX_EMAIL, message: 'E-mail inválido' }
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
                {loading ?
                    <View style={styles.spinnerStyle} mt={5} >
                        <Spinner color='white' />
                    </View> :
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        bg={gymbrozTheme.palette.tertiary[500]}
                        _pressed={{ bg: gymbrozTheme.palette.tertiary[600] }}
                        mt={5}
                    >
                        Entrar
                    </Button>}
            </VStack>
        </Center>
    )
};

export default SignIn;