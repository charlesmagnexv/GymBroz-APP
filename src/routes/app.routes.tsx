import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
)

export default AppRoutes