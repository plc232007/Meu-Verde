// screens/PainelDoadorScreen.js - CORRIGIDO

import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

// ... const Cores, DADOS_INICIAIS e ItemMinhaDoacao continuam iguais ...
const Cores = {
  verdePrincipal: '#2E7D32', textoPrincipal: '#333', textoClaro: '#FFFFFF', fundo: '#FFFFFF',
  cinza: '#f2f2f2', borda: '#e0e0e0', statusPendente: '#FFA726',
  statusConcluido: '#66BB6A', statusFinalizado: '#42A5F5',
};

const ItemMinhaDoacao = ({ item, status, data, onPress }) => {
  let corStatus = Cores.statusPendente;
  if (status === 'Coletado') corStatus = Cores.statusConcluido;
  else if (status === 'Finalizado') corStatus = Cores.statusFinalizado;
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={[styles.statusIndicator, { backgroundColor: corStatus }]} /><View style={styles.infoItem}><Text style={styles.itemTitulo}>{item}</Text><Text style={styles.itemSubtitulo}>Status: {status}</Text></View><View style={styles.dataItem}><Text style={styles.itemData}>{data}</Text></View>
    </TouchableOpacity>
  );
};


// CORREÇÃO: A função agora recebe "setDoacoes" do App.js
export default function PainelDoadorScreen({ navigation, doacoes, setDoacoes }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Olá, Doador!</Text>
        <Text style={styles.subtitulo}>Obrigado por fazer a diferença.</Text>

        <TouchableOpacity 
          style={styles.botaoPrincipal}
          // CORREÇÃO: Agora ele tem a função "setDoacoes" para passar para a próxima tela
          onPress={() => navigation.navigate('NovaDoacao', { setDoacoes: setDoacoes })}
        >
            <Feather name="plus-circle" size={20} color={Cores.textoClaro} />
            <Text style={styles.botaoPrincipalTexto}>Fazer Nova Doação</Text>
        </TouchableOpacity>

        <Text style={styles.tituloLista}>Minhas Doações</Text>

        <FlatList
          data={doacoes}
          renderItem={({ item }) => (
            <ItemMinhaDoacao 
              {...item} 
              onPress={() => navigation.navigate('DetalhesDoacao', { doacaoId: item.id })}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.lista}
        />
      </View>
    </SafeAreaView>
  );
}

// ... Os estilos (const styles) continuam exatamente iguais ...
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Cores.fundo },
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
    titulo: { fontSize: 24, fontWeight: 'bold', color: Cores.textoPrincipal },
    subtitulo: { fontSize: 16, color: '#666', marginBottom: 20 },
    botaoPrincipal: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.verdePrincipal, padding: 15, borderRadius: 10, marginBottom: 30 },
    botaoPrincipalTexto: { fontSize: 18, fontWeight: 'bold', color: Cores.textoClaro, marginLeft: 10 },
    tituloLista: { fontSize: 20, fontWeight: 'bold', color: Cores.textoPrincipal, marginBottom: 10 },
    lista: { width: '100%' },
    itemContainer: { flexDirection: 'row', backgroundColor: Cores.fundo, padding: 15, marginVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: Cores.borda, alignItems: 'center' },
    statusIndicator: { width: 10, height: 10, borderRadius: 5, marginRight: 15 },
    infoItem: { flex: 1 },
    itemTitulo: { fontSize: 16, fontWeight: 'bold', color: Cores.textoPrincipal },
    itemSubtitulo: { fontSize: 14, color: '#666' },
    dataItem: { alignItems: 'flex-end' },
    itemData: { fontSize: 12, color: '#999' }
});