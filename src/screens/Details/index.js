import React, { useEffect, useState } from 'react';

import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { api } from '../../services/api';

import { styles } from './style';
import { Header } from '../../components/Header';

export const Details = () => {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    api.get('/articles').then(res => {
      setArticlesData(res.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header />
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.content}>
            {articlesData.map((i, k) => (
              <Text key={k}>{i.title}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
