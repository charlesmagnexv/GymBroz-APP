import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CircleIcon } from 'native-base';
import Home from '../pages/Home';
import Events from '../pages/Events';
import Friends from '../pages/Friends';
import Account from '../pages/Account';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
    <Tab.Navigator>
        <Tab.Screen name="Início" component={Home}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <CircleIcon name="home" />
                ),
            }} />
        <Tab.Screen name="Eventos" component={Events} />
        <Tab.Screen name="Amigos" component={Friends} />
        <Tab.Screen name="Conta" component={Account} />
    </Tab.Navigator>
)

export default AppRoutes