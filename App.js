// App.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';
import logoImagem from './assets/circuito-verde-img.png'; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando NOSSAS telas de arquivos separados
import PainelCooperadoraScreen from './screens/PainelCooperadoraScreen';
import PainelDoadorScreen from './screens/PainelDoadorScreen'; // <-- NOVO

// --- Paleta de Cores 'Verde' ---
const Cores = {
  verdePrincipal: '#2E7D32',
  verdeClaro: '#C8E6C9',
  textoPrincipal: '#333',
  textoClaro: '#FFFFFF',
  fundo: '#FFFFFF',
  cinza: '#f2f2f2',
};

// --- TELAS GENÉRICAS ---

function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SelecaoPerfil'); 
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={logoImagem} style={styles.logo} />
      <Text style={styles.slogan}>Dê um novo destino ao seu eletrônico.</Text>
      
      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      
      <Pressable 
        style={({ pressed }) => [styles.button, { backgroundColor: pressed ? '#1B5E20' : Cores.verdePrincipal }]} 
        onPress={handleLogin} disabled={loading} >
        {loading ? <ActivityIndicator color={Cores.textoClaro} /> : <Text style={styles.buttonText}>Entrar</Text>}
      </Pressable>
      
      <TouchableOpacity style={styles.linkButton}>
        <FontAwesome name="user" size={20} color={Cores.textoPrincipal} style={styles.icon} />
        <Text style={styles.linkText}>Entrar como Doador</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton}>
        <FontAwesome5 name="building" size={20} color={Cores.textoPrincipal} style={styles.icon} />
        <Text style={styles.linkText}>Entrar como Cooperadora</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SelecaoPerfilScreen({ navigation }) {
  return (
    <View style={styles.containerSimples}>
      <Feather name="git-branch" size={40} color={Cores.verdePrincipal} />
      <Text style={styles.titulo}>Como você deseja continuar?</Text>
      <Text style={styles.subtitulo}>Sua escolha nos ajuda a personalizar sua experiência.</Text>
      <Pressable style={({ pressed }) => [styles.profileButton, { opacity: pressed ? 0.8 : 1 }]} onPress={() => navigation.navigate('PainelCooperadora')}>
          <FontAwesome5 name="building" size={24} color={Cores.verdePrincipal} />
          <Text style={styles.profileButtonText}>Sou Cooperadora</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.profileButton, { opacity: pressed ? 0.8 : 1 }]} onPress={() => navigation.navigate('PainelDoador')}>
          <FontAwesome name="user" size={24} color={Cores.verdePrincipal} />
          <Text style={styles.profileButtonText}>Sou Doador</Text>
      </Pressable>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: Cores.verdePrincipal },
          headerTintColor: Cores.textoClaro,
          headerTitleStyle: { fontWeight: 'bold' },
        }}> 
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="SelecaoPerfil" component={SelecaoPerfilScreen} options={{ title: 'Escolha seu Perfil' }} />
        <Stack.Screen name="PainelCooperadora" component={PainelCooperadoraScreen} options={{ title: 'Painel da Cooperadora' }} />
        {/* Usando nosso novo arquivo para a tela do Doador */}
        <Stack.Screen name="PainelDoador" component={PainelDoadorScreen} options={{ title: 'Painel do Doador' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, backgroundColor: Cores.fundo, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 50,
  },
  logo: {
    width: 400, height: 250, resizeMode: 'contain', marginBottom: 10,
  },
  slogan: {
    fontSize: 18, color: Cores.textoPrincipal, marginBottom: 40, textAlign: 'center',
  },
  input: {
    width: '100%', height: 50, backgroundColor: Cores.cinza, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: '#e0e0e0',
  },
  button: {
    width: '100%', height: 50, backgroundColor: Cores.verdePrincipal, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 20,
  },
  buttonText: {
    color: Cores.textoClaro, fontSize: 18, fontWeight: 'bold',
  },
  linkButton: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 15,
  },
  linkText: {
    fontSize: 16, color: Cores.textoPrincipal,
  },
  icon: {
    marginRight: 10,
  },
  containerSimples: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: Cores.fundo,
  },
  titulo: {
    fontSize: 24, fontWeight: 'bold', color: Cores.textoPrincipal, textAlign: 'center', marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40,
  },
  profileButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.cinza, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10, marginBottom: 15, width: '80%', borderWidth: 1, borderColor: Cores.verdeClaro,
  },
  profileButtonText: {
    color: Cores.verdePrincipal, fontSize: 18, fontWeight: 'bold', marginLeft: 15,
  }
});