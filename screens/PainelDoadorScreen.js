// screens/PainelDoadorScreen.js

import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

// --- Paleta de Cores ---
const Cores = {
  verdePrincipal: '#2E7D32',
  textoPrincipal: '#333',
  textoClaro: '#FFFFFF',
  fundo: '#FFFFFF',
  cinza: '#f2f2f2',
  borda: '#e0e0e0',
  statusPendente: '#FFA726', // Laranja
  statusConcluido: '#66BB6A', // Verde
};

// --- DADOS DE EXEMPLO DAS MINHAS DOACOES ---
const DADOS_MINHAS_DOACOES = [
  { id: '1', item: 'Notebook antigo', status: 'Coletado', data: '28/09/2025' },
  { id: '2', item: 'Celular e carregadores', status: 'Aguardando Coleta', data: '05/10/2025' },
  { id: '3', item: 'Monitor LCD', status: 'Finalizado', data: '15/09/2025' },
];

// --- Componente para renderizar cada doação na lista ---
const ItemMinhaDoacao = ({ item, status, data }) => {
  // Define a cor do status da doação
  const corStatus = status === 'Aguardando Coleta' ? Cores.statusPendente : Cores.statusConcluido;

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={[styles.statusIndicator, { backgroundColor: corStatus }]} />
      <View style={styles.infoItem}>
        <Text style={styles.itemTitulo}>{item}</Text>
        <Text style={styles.itemSubtitulo}>Status: {status}</Text>
      </View>
      <View style={styles.dataItem}>
        <Text style={styles.itemData}>{data}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Componente Principal da Tela ---
export default function PainelDoadorScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Olá, Doador!</Text>
        <Text style={styles.subtitulo}>Obrigado por fazer a diferença.</Text>

        {/* Botão de Ação Principal */}
        <TouchableOpacity style={styles.botaoPrincipal}>
            <Feather name="plus-circle" size={20} color={Cores.textoClaro} />
            <Text style={styles.botaoPrincipalTexto}>Fazer Nova Doação</Text>
        </TouchableOpacity>

        <Text style={styles.tituloLista}>Minhas Doações</Text>

        {/* Lista de Minhas Doações */}
        <FlatList
          data={DADOS_MINHAS_DOACOES}
          renderItem={({ item }) => <ItemMinhaDoacao {...item} />}
          keyExtractor={item => item.id}
          style={styles.lista}
        />
      </View>
    </SafeAreaView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Cores.textoPrincipal,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  botaoPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.verdePrincipal,
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  botaoPrincipalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Cores.textoClaro,
    marginLeft: 10,
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Cores.textoPrincipal,
    marginBottom: 10,
  },
  lista: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: Cores.fundo,
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Cores.borda,
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  infoItem: {
    flex: 1,
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Cores.textoPrincipal,
  },
  itemSubtitulo: {
    fontSize: 14,
    color: '#666',
  },
  dataItem: {
    alignItems: 'flex-end',
  },
  itemData: {
    fontSize: 12,
    color: '#999',
  }
});