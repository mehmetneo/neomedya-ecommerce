import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Chip, useTheme } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

type CustomersScreenProps = {
  navigation: StackNavigationProp<any>;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
};

export default function CustomersScreen({ navigation }: CustomersScreenProps) {
  const theme = useTheme();

  const customers: Customer[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@email.com',
      totalOrders: 5,
      totalSpent: 1250.99,
      lastOrder: '2024-01-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Fatma Demir',
      email: 'fatma@email.com',
      totalOrders: 3,
      totalSpent: 450.99,
      lastOrder: '2024-01-14',
      status: 'active',
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@email.com',
      totalOrders: 8,
      totalSpent: 2100.99,
      lastOrder: '2024-01-13',
      status: 'active',
    },
  ];

  const renderCustomerCard = ({ item }: { item: Customer }) => (
    <Card style={styles.customerCard} mode="outlined">
      <Card.Content>
        <View style={styles.customerHeader}>
          <Text variant="titleMedium" style={styles.customerName}>
            {item.name}
          </Text>
          <Chip
            mode="outlined"
            style={[
              styles.statusChip,
              { backgroundColor: item.status === 'active' ? theme.colors.success + '20' : theme.colors.error + '20' }
            ]}
          >
            {item.status === 'active' ? 'Aktif' : 'Pasif'}
          </Chip>
        </View>
        
        <Text variant="bodyMedium" style={styles.customerEmail}>
          {item.email}
        </Text>
        
        <View style={styles.customerStats}>
          <Text variant="bodySmall">Sipariş: {item.totalOrders}</Text>
          <Text variant="bodySmall">Toplam: ₺{item.totalSpent}</Text>
          <Text variant="bodySmall">
            Son: {new Date(item.lastOrder).toLocaleDateString('tr-TR')}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        renderItem={renderCustomerCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.customerList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  customerList: {
    padding: 16,
  },
  customerCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontWeight: 'bold',
  },
  statusChip: {
    height: 24,
  },
  customerEmail: {
    marginBottom: 8,
    opacity: 0.7,
  },
  customerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}); 