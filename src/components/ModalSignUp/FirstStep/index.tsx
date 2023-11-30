import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
    FormControl,
    Input,
    Center,
} from 'native-base';
import { 
    useForm, 
    Controller, 
    useFormContext
} from 'react-hook-form';
import gymbrozTheme from "../../../theme/gymbrozTheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FormCreateAccountDTO } from "..";


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

const FirstStep: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    const { control, formState: { errors } } = useForm<FormCreateAccountDTO>();
    const { watch } = useFormContext();

    const confirmPassword = (value: string) => {
        if (value !== watch('password')) {
            return 'As senhas não são iguais'
        }
        return true
    }
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Center flex={1} justifyContent='flex-start' paddingTop={5} paddingBottom={4}>
                <FormControl isInvalid={'nome' in errors} mt={3}>
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
                        name="name"
                        rules={{
                            required: 'Campo obrigatório',
                        }}
                        defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                        {errors.email?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={'sobrenome' in errors} mt={3}>
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
                    <FormControl.ErrorMessage>
                        {errors.email?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={'email' in errors} mt={3}>
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
                <FormControl isInvalid={'password' in errors} mt={3}>
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

                    <FormControl.ErrorMessage>
                        {errors.password?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={'repassword' in errors} mt={3}>
                    <FormControl.Label mt={2}>Confirmar Senha</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                secureTextEntry={!showPassword}
                                placeholder="Repassword"
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

                    <FormControl.ErrorMessage>
                        {errors.password?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
        </Center>
    )
};

export default FirstStep;