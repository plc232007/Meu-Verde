// screens/PainelCooperadoraScreen.js

import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';

// --- Paleta de Cores (importada mentalmente do App.js) ---
const Cores = {
  verdePrincipal: '#2E7D32',
  textoPrincipal: '#333',
  textoClaro: '#FFFFFF',
  fundo: '#FFFFFF',
  cinza: '#f2f2f2',
  borda: '#e0e0e0',
};

// --- DADOS DE EXEMPLO (Simulando um banco de dados) ---
const DADOS_DOACOES = [
  { id: '1', doador: 'Maria S.', item: 'Monitor LCD', distancia: '2.5 km', data: 'Hoje' },
  { id: '2', doador: 'João P.', item: 'Notebook antigo', distancia: '5.1 km', data: 'Ontem' },
  { id: '3', doador: 'Ana L.', item: 'Celular e carregadores', distancia: '1.8 km', data: 'Hoje' },
  { id: '4', doador: 'Carlos M.', item: 'Teclado e Mouse', distancia: '7.3 km', data: '2 dias atrás' },
];

// --- Componente para renderizar cada item da lista ---
const ItemDoacao = ({ id, doador, item, distancia, data, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.iconeItem}>
      <Feather name="package" size={24} color={Cores.verdePrincipal} />
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.itemTitulo}>{item}</Text>
      <Text style={styles.itemSubtitulo}>Doador(a): {doador}</Text>
      <Text style={styles.itemSubtitulo}>Distância: {distancia}</Text>
    </View>
    <View style={styles.dataItem}>
      <Text style={styles.itemData}>{data}</Text>
    </View>
  </TouchableOpacity>
);

// O componente principal agora recebe { navigation }
export default function PainelCooperadoraScreen({ navigation }) {
  // ... (o resto da função fica igual) ...
        <FlatList
          data={DADOS_DOACOES}
          renderItem={({ item }) => (
            <ItemDoacao 
              {...item} 
              onPress={() => navigation.navigate('DetalhesDoacao', { doacaoId: item.id })}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.lista}
        />
  // ... (o resto da função e os estilos ficam iguais) ...
}

// --- Componente Principal da Tela ---
export default function PainelCooperadoraScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bem-vinda à Cooperadora!</Text>
        
        {/* Botões de Ação Principal */}
        <View style={styles.botoesAcaoContainer}>
            <TouchableOpacity style={styles.botaoAcao}>
                <FontAwesome5 name="clipboard-list" size={24} color={Cores.verdePrincipal} />
                <Text style={styles.botaoAcaoTexto}>Ver doações disponíveis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoAcao}>
                <FontAwesome5 name="check-circle" size={24} color={Cores.verdePrincipal} />
                <Text style={styles.botaoAcaoTexto}>Confirmar recebimento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoAcao}>
                <FontAwesome5 name="map-marked-alt" size={24} color={Cores.verdePrincipal} />
                <Text style={styles.botaoAcaoTexto}>Gerenciar ponto de coleta</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.tituloLista}>Doações Próximas</Text>

        {/* Lista de Doações */}
        <FlatList
          data={DADOS_DOACOES}
          renderItem={({ item }) => <ItemDoacao {...item} />}
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
    marginBottom: 20,
  },
  botoesAcaoContainer: {
    marginBottom: 20,
  },
  botaoAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Cores.cinza,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  botaoAcaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Cores.verdePrincipal,
    marginLeft: 15,
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Cores.textoPrincipal,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: Cores.borda,
    paddingTop: 20,
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
  iconeItem: {
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