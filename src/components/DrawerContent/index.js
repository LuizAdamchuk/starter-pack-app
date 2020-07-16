import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../../hooks/authContext';

import avatar from '../../assets/avatar.png';

export function DrawerContent(props) {
  const { signOut } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme);
  }, [isDarkTheme]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 16,
                alignItems: 'center',
              }}
            >
              <Avatar.Image source={avatar} size={50} />
              <View style={{ marginLeft: 12 }}>
                <Title style={styles.title}>John Doe</Title>
                <Caption style={styles.caption}>@johndoe</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={styles.paragraph}>80</Paragraph>
                <Caption style={styles.caption}>Seguindo</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={styles.paragraph}>100</Paragraph>
                <Caption style={styles.caption}>Seguidores</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="home" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
              label="Home"
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
              label="Usuário"
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="settings" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
              label="Configurações"
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="help-circle" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Support');
              }}
              label="Dúvidas?"
            />
          </Drawer.Section>
          <Drawer.Section title="Preferências">
            <TouchableRipple onPress={() => handleToggleTheme()}>
              <View style={styles.preference}>
                <Text>Tema Claro/Escuro</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="log-out" color={color} size={size} />
              )}
              onPress={() => {
                signOut();
              }}
              label="Sair"
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginTop: 40,
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
