import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../../../context/auth";
import {

    FormControl,
    Input,
    Center,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import gymbrozTheme from "../../../theme/gymbrozTheme";
import { useFeedback } from "../../../context/useFeedback";
import { FormCreateAccountDTO } from "..";

type FormData = {
    email: string;
    password: string;
};

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



const SecondStep: React.FC = () => {    
    const { control, formState: { errors } } = useForm<FormCreateAccountDTO>();

    return (
        <Center flex={1} justifyContent='flex-start' paddingTop={5}>
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
                    <FormControl.ErrorMessage>
                        {errors.email?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
        </Center> 
    )
};

export default SecondStep;