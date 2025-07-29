import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, List, Switch, Button, Divider, useTheme } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

type SettingsScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const theme = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', style: 'destructive', onPress: () => {
          navigation.replace('Login');
        }},
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>Genel Ayarlar</List.Subheader>
        <List.Item
          title="Bildirimler"
          description="Push bildirimleri al"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={() => <Switch value={true} />}
        />
        <List.Item
          title="Karanlık Tema"
          description="Karanlık tema kullan"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => <Switch value={false} />}
        />
        <List.Item
          title="Otomatik Giriş"
          description="Uygulama açıldığında otomatik giriş yap"
          left={(props) => <List.Icon {...props} icon="login" />}
          right={() => <Switch value={true} />}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Hesap</List.Subheader>
        <List.Item
          title="Profil Bilgileri"
          description="Ad, e-posta ve şifre değiştir"
          left={(props) => <List.Icon {...props} icon="account" />}
          onPress={() => {}}
        />
        <List.Item
          title="Güvenlik"
          description="İki faktörlü doğrulama"
          left={(props) => <List.Icon {...props} icon="shield" />}
          onPress={() => {}}
        />
        <List.Item
          title="Yedekleme"
          description="Verileri yedekle"
          left={(props) => <List.Icon {...props} icon="cloud-upload" />}
          onPress={() => {}}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Uygulama</List.Subheader>
        <List.Item
          title="Hakkında"
          description="Versiyon 1.0.0"
          left={(props) => <List.Icon {...props} icon="information" />}
          onPress={() => {}}
        />
        <List.Item
          title="Yardım"
          description="Kullanım kılavuzu"
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          onPress={() => {}}
        />
        <List.Item
          title="Geri Bildirim"
          description="Hata bildir veya öneri gönder"
          left={(props) => <List.Icon {...props} icon="message" />}
          onPress={() => {}}
        />
      </List.Section>

      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          textColor={theme.colors.error}
        >
          Çıkış Yap
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  logoutContainer: {
    padding: 20,
    marginTop: 20,
  },
  logoutButton: {
    borderColor: '#ef4444',
  },
}); 