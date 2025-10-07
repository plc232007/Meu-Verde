// screens/DetalhesDoacaoScreen.js

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Cores = {
  verdePrincipal: '#2E7D32', textoPrincipal: '#333', textoClaro: '#FFFFFF',
  fundo: '#FFFFFF', borda: '#e0e0e0',
};

export default function DetalhesDoacaoScreen({ route, navigation }) {
  const { doacaoId, setDoacoes, doacoes } = route.params;
  const doacao = doacoes.find(item => item.id === doacaoId);

  const handleConfirmarRecebimento = () => {
    setDoacoes(doacoesAtuais => 
      doacoesAtuais.map(item => 
        item.id === doacaoId ? { ...item, status: 'Coletado' } : item
      )
    );
    Alert.alert('Sucesso', 'O status da doação foi atualizado para "Coletado".');
    navigation.goBack();
  };

  if (!doacao) {
    return (
      <SafeAreaView style={styles.safeArea}><View style={styles.container}><Text style={styles.tituloHeader}>Doação não encontrada</Text></View></SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}><Feather name="package" size={30} color={Cores.verdePrincipal} /><Text style={styles.tituloHeader}>{doacao.item}</Text></View>
          <View style={styles.card}><Text style={styles.cardTitulo}>Status</Text><Text style={styles.cardConteudo}>{doacao.status}</Text></View>
          <View style={styles.card}><Text style={styles.cardTitulo}>Doador(a)</Text><Text style={styles.cardConteudo}>{doacao.doador} ({doacao.distancia})</Text></View>
          <View style={styles.card}><Text style={styles.cardTitulo}>Data da Solicitação</Text><Text style={styles.cardConteudo}>{doacao.data}</Text></View>
          <View style={styles.card}><Text style={styles.cardTitulo}>Endereço para Coleta</Text><Text style={styles.cardConteudo}>{doacao.endereco}</Text></View>
          {doacao.obs ? (<View style={styles.card}><Text style={styles.cardTitulo}>Observações</Text><Text style={styles.cardConteudo}>{doacao.obs}</Text></View>) : null}
          
          {doacao.status === 'Aguardando Coleta' && (
            <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmarRecebimento}>
              <Text style={styles.botaoConfirmarTexto}>Confirmar Recebimento</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Cores.fundo },
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    tituloHeader: { fontSize: 24, fontWeight: 'bold', color: Cores.textoPrincipal, marginLeft: 10, flexShrink: 1 },
    card: { backgroundColor: '#F9F9F9', borderRadius: 10, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: Cores.borda },
    cardTitulo: { fontSize: 14, fontWeight: 'bold', color: Cores.verdePrincipal, marginBottom: 5 },
    cardConteudo: { fontSize: 16, color: Cores.textoPrincipal },
    botaoConfirmar: { backgroundColor: Cores.verdePrincipal, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    botaoConfirmarTexto: { color: Cores.textoClaro, fontSize: 18, fontWeight: 'bold' }
});