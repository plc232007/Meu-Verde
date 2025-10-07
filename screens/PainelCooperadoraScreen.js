// screens/PainelCooperadoraScreen.js

import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

const Cores = {
  verdePrincipal: '#2E7D32', textoPrincipal: '#333', textoClaro: '#FFFFFF',
  fundo: '#FFFFFF', cinza: '#f2f2f2', borda: '#e0e0e0',
};

const ItemDoacao = ({ doador, item, distancia, data, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.iconeItem}><Feather name="package" size={24} color={Cores.verdePrincipal} /></View>
    <View style={styles.infoItem}>
      <Text style={styles.itemTitulo}>{item}</Text>
      <Text style={styles.itemSubtitulo}>Doador(a): {doador}</Text>
      <Text style={styles.itemSubtitulo}>Distância: {distancia}</Text>
    </View>
    <View style={styles.dataItem}><Text style={styles.itemData}>{data}</Text></View>
  </TouchableOpacity>
);

export default function PainelCooperadoraScreen({ navigation, doacoes }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bem-vinda à Cooperadora!</Text>
        <View style={styles.botoesAcaoContainer}>
            <TouchableOpacity style={styles.botaoAcao}><FontAwesome5 name="clipboard-list" size={24} color={Cores.verdePrincipal} /><Text style={styles.botaoAcaoTexto}>Ver doações disponíveis</Text></TouchableOpacity>
            <TouchableOpacity style={styles.botaoAcao}><FontAwesome5 name="check-circle" size={24} color={Cores.verdePrincipal} /><Text style={styles.botaoAcaoTexto}>Confirmar recebimento</Text></TouchableOpacity>
            <TouchableOpacity style={styles.botaoAcao}><FontAwesome5 name="map-marked-alt" size={24} color={Cores.verdePrincipal} /><Text style={styles.botaoAcaoTexto}>Gerenciar ponto de coleta</Text></TouchableOpacity>
        </View>

        <Text style={styles.tituloLista}>Doações Próximas</Text>
        <FlatList
          data={doacoes}
          renderItem={({ item }) => (
            <ItemDoacao {...item} onPress={() => navigation.navigate('DetalhesDoacao', { doacaoId: item.id })} />
          )}
          keyExtractor={item => item.id}
          style={styles.lista}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Cores.fundo },
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
    titulo: { fontSize: 24, fontWeight: 'bold', color: Cores.textoPrincipal, marginBottom: 20 },
    botoesAcaoContainer: { marginBottom: 20 },
    botaoAcao: { flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.cinza, padding: 15, borderRadius: 10, marginBottom: 10 },
    botaoAcaoTexto: { fontSize: 16, fontWeight: 'bold', color: Cores.verdePrincipal, marginLeft: 15 },
    tituloLista: { fontSize: 20, fontWeight: 'bold', color: Cores.textoPrincipal, marginBottom: 10, borderTopWidth: 1, borderTopColor: Cores.borda, paddingTop: 20 },
    lista: { width: '100%' },
    itemContainer: { flexDirection: 'row', backgroundColor: Cores.fundo, padding: 15, marginVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: Cores.borda, alignItems: 'center' },
    iconeItem: { marginRight: 15 },
    infoItem: { flex: 1 },
    itemTitulo: { fontSize: 16, fontWeight: 'bold', color: Cores.textoPrincipal },
    itemSubtitulo: { fontSize: 14, color: '#666' },
    dataItem: { alignItems: 'flex-end' },
    itemData: { fontSize: 12, color: '#999' }
});