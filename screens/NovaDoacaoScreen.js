// screens/NovaDoacaoScreen.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Cores = {
  verdePrincipal: '#2E7D32', textoPrincipal: '#333', textoClaro: '#FFFFFF',
  fundo: '#FFFFFF', borda: '#e0e0e0',
};

export default function NovaDoacaoScreen({ navigation, route }) {
  const { setDoacoes } = route.params;
  const [nomeItem, setNomeItem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleConfirmarDoacao = () => {
    if (!nomeItem.trim() || !endereco.trim()) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha pelo menos o nome do item e o endereço.');
      return;
    }

    const novaDoacao = {
      id: Date.now().toString(),
      item: nomeItem,
      doador: 'Você',
      distancia: '0 km',
      status: 'Aguardando Coleta',
      data: new Date().toLocaleDateString('pt-BR'),
      endereco: endereco,
      obs: descricao,
    };

    setDoacoes(listaAnterior => [novaDoacao, ...listaAnterior]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView>
          <View style={styles.header}><Feather name="plus-circle" size={30} color={Cores.verdePrincipal} /><Text style={styles.tituloHeader}>Cadastrar Nova Doação</Text></View>
          <Text style={styles.label}>Nome do Item*</Text>
          <TextInput style={styles.input} placeholder="Ex: Notebook, Celular, Monitor" value={nomeItem} onChangeText={setNomeItem} />
          <Text style={styles.label}>Descrição (Opcional)</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Descreva o estado do item, se possui defeitos, etc." value={descricao} onChangeText={setDescricao} multiline={true} numberOfLines={4} />
          <Text style={styles.label}>Endereço para Coleta*</Text>
          <TextInput style={styles.input} placeholder="Seu endereço completo" value={endereco} onChangeText={setEndereco} />
          <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmarDoacao}><Text style={styles.botaoConfirmarTexto}>Confirmar Doação</Text></TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Cores.fundo },
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
    tituloHeader: { fontSize: 24, fontWeight: 'bold', color: Cores.textoPrincipal, marginLeft: 10 },
    label: { fontSize: 16, fontWeight: 'bold', color: Cores.textoPrincipal, marginBottom: 5 },
    input: { backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: Cores.borda, borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20 },
    textArea: { height: 100, textAlignVertical: 'top' },
    botaoConfirmar: { backgroundColor: Cores.verdePrincipal, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    botaoConfirmarTexto: { color: Cores.textoClaro, fontSize: 18, fontWeight: 'bold' }
});