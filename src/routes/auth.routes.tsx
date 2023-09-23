import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import gymbrozTheme from '../theme/gymbrozTheme';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor:`${gymbrozTheme.palette.light[50]}` }
        }}
    >
        <AuthStack.Screen name='SignIn' component={SignIn} />
    </AuthStack.Navigator>
);

export default AuthRoutes;