import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Events from '../screens/Events';
import Friends from '../screens/Friends';
import Account from '../screens/Account';
import Icon from 'react-native-vector-icons/FontAwesome5'
import gymbrozTheme from '../theme/gymbrozTheme';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: `${gymbrozTheme.palette.primary.main}` },
            tabBarLabelStyle: {
                fontSize: 12
            },
            tabBarActiveTintColor: `${gymbrozTheme.palette.light[50]}`,
            tabBarInactiveTintColor: `${gymbrozTheme.palette.muted[400]}`
        }}
    >
        <Tab.Screen name="Início" component={Home}
            options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon
                        name="home"
                        color={color}
                        size={25}
                    />
                ),
            }}
        />
        <Tab.Screen name="Eventos" component={Events}
            options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon
                        name="list-ul"
                        color={color}
                        size={25}
                    />
                ),
            }}
        />
        <Tab.Screen name="Amigos" component={Friends}
            options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon
                        name="user-friends"
                        color={color}
                        size={25}
                    />
                ),
            }}
        />
        <Tab.Screen name="Conta" component={Account}
            options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon
                        name="cog"
                        color={color}
                        size={25}
                    />
                ),
            }}
        />
    </Tab.Navigator>
)

export default AppRoutes