// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListing from './components/product_listing';
import IndividualProduct from './components/individual_product';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="product_listing">
                <Stack.Screen 
                    name="product_listing" 
                    component={ProductListing} 
                    options={{ headerShown: false }} // Hide the header
                />
                <Stack.Screen 
                    name="individual_product" 
                    component={IndividualProduct} 
                    options={{ headerShown: false }} // Hide the header
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

