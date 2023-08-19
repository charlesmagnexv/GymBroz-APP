import React, { useContext } from 'react'
import AuthRoutes from "../routes/auth.routes";
import AppRoutes from "../routes/app.routes";
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/auth';

const Routes: React.FC = () => {
    const { signed, loading } = useAuth();
  
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#666" />
        </View>
      );
    }
  
    return signed ? <AppRoutes /> : <AuthRoutes />;
  };
  
  export default Routes;