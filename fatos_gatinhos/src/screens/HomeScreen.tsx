
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchFacts, Fact } from '../services/api';

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<Fact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetchFacts();
        if (mounted) setData(res);
      } catch (err: any) {
        if (mounted) setError(err.message ?? 'Erro ao buscar dados');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando fatos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fatos sobre gatos</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.factText}>{item.text}</Text>
            <Text style={styles.meta}>Fonte: {item.source ?? 'desconhecida'}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  center: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  header: {
    fontSize:24,
    fontWeight:'700',
    marginBottom:16,
    color: '#6C63FF',
    textAlign:'center'
  },
  card: {
    padding:16,
    borderRadius:12,
    backgroundColor:'#ffffff',
    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowRadius:4,
    elevation:3
  },
  factText: {
    fontSize:16,
    marginBottom:6,
    color:'#333'
  },
  meta: {
    fontSize:12,
    color:'#777'
  },
  sep: {
    height:12
  }
});
