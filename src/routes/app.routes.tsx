import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Events from '../pages/Events';
import Friends from '../pages/Friends';
import Account from '../pages/Account';
import Icon from 'react-native-vector-icons/FontAwesome5'
import gymbrozTheme from '../theme/gymbrozTheme';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor: `${gymbrozTheme.palette.primary[800]}` },
            tabBarLabelStyle: {
                // color: `${gymbrozTheme.palette.tertiary[500]}`, 
                fontSize: 12
            }
        }}
    >
        <Tab.Screen name="Início" component={Home}
            options={{
                tabBarIcon: ({ color, size, focused }) => (
                    <Icon
                        name="home"
                        color={focused ? gymbrozTheme.palette.tertiary[500] : gymbrozTheme.palette.light[50]}
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
                        color={focused ? gymbrozTheme.palette.tertiary[500] : gymbrozTheme.palette.light[50]}
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
                        color={focused ? gymbrozTheme.palette.tertiary[500] : gymbrozTheme.palette.light[50]}
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
                        color={focused ? gymbrozTheme.palette.tertiary[500] : gymbrozTheme.palette.light[50]}
                        size={25}
                    />
                ),
            }}
        />
    </Tab.Navigator>
)

export default AppRoutes