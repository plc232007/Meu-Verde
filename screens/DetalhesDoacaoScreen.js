// screens/DetalhesDoacaoScreen.js

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

// --- Paleta de Cores ---
const Cores = {
  verdePrincipal: '#2E7D32',
  textoPrincipal: '#333',
  fundo: '#FFFFFF',
  borda: '#e0e0e0',
};

// --- SIMULAÇÃO DE UM BANCO DE DADOS MAIS COMPLETO ---
// Em um app real, buscaríamos apenas o item com o ID recebido.
const BANCO_DE_DADOS_COMPLETO = [
    { id: '1', doador: 'Maria S.', item: 'Monitor LCD 22"', distancia: '2.5 km', data: '28/09/2025', status: 'Coletado', endereco: 'Rua das Flores, 123', obs: 'Monitor funcionando, mas com um arranhão na tela.'},
    { id: '2', doador: 'João P.', item: 'Notebook antigo Dell', distancia: '5.1 km', data: '05/10/2025', status: 'Aguardando Coleta', endereco: 'Av. Principal, 456', obs: 'Bateria não segura carga, mas o resto funciona.'},
    { id: '3', doador: 'Ana L.', item: 'Celular e carregadores', distancia: '1.8 km', data: '05/10/2025', status: 'Finalizado', endereco: 'Praça da Matriz, 789', obs: 'Dois celulares Samsung e um Motorola.'},
    { id: '4', doador: 'Carlos M.', item: 'Teclado e Mouse', distancia: '7.3 km', data: '03/10/2025', status: 'Aguardando Coleta', endereco: 'Rodovia Anhanguera, km 10', obs: ''},
];

// --- Componente Principal da Tela ---
// Note que recebemos { route } para pegar os parâmetros
export default function DetalhesDoacaoScreen({ route }) {
  // 1. Pegamos o ID da doação que foi enviado pela tela anterior
  const { doacaoId } = route.params;

  // 2. Procuramos a doação completa no nosso "banco de dados"
  const doacao = BANCO_DE_DADOS_COMPLETO.find(item => item.id === doacaoId);

  // 3. Se por algum motivo a doação não for encontrada
  if (!doacao) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Doação não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 4. Renderizamos os detalhes da doação encontrada
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Feather name="package" size={30} color={Cores.verdePrincipal} />
            <Text style={styles.tituloHeader}>{doacao.item}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Status</Text>
            <Text style={styles.cardConteudo}>{doacao.status}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Doador(a)</Text>
            <Text style={styles.cardConteudo}>{doacao.doador} ({doacao.distancia})</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Data da Solicitação</Text>
            <Text style={styles.cardConteudo}>{doacao.data}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Endereço para Coleta</Text>
            <Text style={styles.cardConteudo}>{doacao.endereco}</Text>
          </View>

          {doacao.obs && (
            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Observações</Text>
                <Text style={styles.cardConteudo}>{doacao.obs}</Text>
            </View>
          )}

        </View>
      </ScrollView>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tituloHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Cores.textoPrincipal,
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Cores.borda,
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Cores.verdePrincipal,
    marginBottom: 5,
  },
  cardConteudo: {
    fontSize: 16,
    color: Cores.textoPrincipal,
  }
});