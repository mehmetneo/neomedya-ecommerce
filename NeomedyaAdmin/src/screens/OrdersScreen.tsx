import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import {
  Text,
  Card,
  Chip,
  IconButton,
  useTheme,
  Surface,
  Button,
  Portal,
  Dialog,
  List,
  RadioButton,
} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

type OrdersScreenProps = {
  navigation: StackNavigationProp<any>;
};

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'payment_pending';

type Order = {
  id: string;
  customerName: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: number;
  paymentMethod?: string;
  shippingAddress?: string;
};

export default function OrdersScreen({ navigation }: OrdersScreenProps) {
  const theme = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusDialogVisible, setStatusDialogVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('pending');

  useEffect(() => {
    // Gerçek uygulamada API'den alınır
    loadOrders();
  }, []);

  const loadOrders = () => {
    // localStorage'dan siparişleri al (gerçek uygulamada API'den alınır)
    const mockOrders: Order[] = [
      {
        id: 'ORD-1703123456789',
        customerName: 'Ahmet Yılmaz',
        total: 299.99,
        status: 'payment_pending',
        date: '2024-01-15',
        items: 3,
        paymentMethod: 'Banka Transferi',
        shippingAddress: 'İstanbul, Türkiye',
      },
      {
        id: 'ORD-1703123456790',
        customerName: 'Fatma Demir',
        total: 159.99,
        status: 'processing',
        date: '2024-01-14',
        items: 2,
        paymentMethod: 'Kapıda Ödeme',
        shippingAddress: 'Ankara, Türkiye',
      },
      {
        id: 'ORD-1703123456791',
        customerName: 'Mehmet Kaya',
        total: 89.99,
        status: 'shipped',
        date: '2024-01-13',
        items: 1,
        paymentMethod: 'Kripto Para',
        shippingAddress: 'İzmir, Türkiye',
      },
      {
        id: 'ORD-1703123456792',
        customerName: 'Ayşe Özkan',
        total: 199.99,
        status: 'delivered',
        date: '2024-01-12',
        items: 4,
        paymentMethod: 'Banka Transferi',
        shippingAddress: 'Bursa, Türkiye',
      },
    ];
    setOrders(mockOrders);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return theme.colors.warning;
      case 'processing': return theme.colors.info;
      case 'shipped': return theme.colors.secondary;
      case 'delivered': return theme.colors.success;
      case 'cancelled': return theme.colors.error;
      case 'payment_pending': return theme.colors.tertiary;
      default: return theme.colors.primary;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'Beklemede';
      case 'processing': return 'İşleniyor';
      case 'shipped': return 'Kargoda';
      case 'delivered': return 'Teslim Edildi';
      case 'cancelled': return 'İptal Edildi';
      case 'payment_pending': return 'Ödeme Bekleniyor';
      default: return status;
    }
  };

  const getStatusDescription = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'Sipariş alındı, hazırlanmaya başlanacak';
      case 'processing': return 'Sipariş hazırlanıyor ve paketleniyor';
      case 'shipped': return 'Sipariş kargoya verildi ve yolda';
      case 'delivered': return 'Sipariş başarıyla teslim edildi';
      case 'cancelled': return 'Sipariş iptal edildi';
      case 'payment_pending': return 'Havale ödemesi bekleniyor';
      default: return 'Sipariş durumu bilinmiyor';
    }
  };

  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.status);
    setStatusDialogVisible(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return

    try {
      // API'ye sipariş durumu güncelleme isteği gönder
      const response = await fetch('http://localhost:3000/api/orders/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          status: selectedStatus
        })
      })

      const data = await response.json()

      if (data.success) {
        // Başarılı güncelleme
        Alert.alert(
          'Başarılı',
          `Sipariş ${selectedOrder.id} durumu "${getStatusText(selectedStatus)}" olarak güncellendi.`,
          [{ text: 'Tamam', onPress: () => setStatusDialogVisible(false) }]
        )

        // Orders listesini yenile
        loadOrders()
      } else {
        // Hata durumu
        Alert.alert(
          'Hata',
          data.error || 'Sipariş durumu güncellenirken bir hata oluştu.',
          [{ text: 'Tamam' }]
        )
      }
    } catch (error) {
      console.error('API hatası:', error)
      Alert.alert(
        'Bağlantı Hatası',
        'Sunucuya bağlanırken bir hata oluştu. Lütfen tekrar deneyin.',
        [{ text: 'Tamam' }]
      )
    }
  }

  const renderOrderCard = ({ item }: { item: Order }) => (
    <Card style={styles.orderCard} mode="outlined" onPress={() => handleOrderPress(item)}>
      <Card.Content style={styles.orderContent}>
        <View style={styles.orderHeader}>
          <Text variant="titleMedium" style={styles.orderId}>
            Sipariş #{item.id}
          </Text>
          <Chip
            mode="outlined"
            style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) + '20' }]}
            textStyle={{ color: getStatusColor(item.status) }}
          >
            {getStatusText(item.status)}
          </Chip>
        </View>
        
        <Text variant="bodyMedium" style={styles.customerName}>
          {item.customerName}
        </Text>
        
        <View style={styles.orderDetails}>
          <Text variant="bodySmall" style={styles.orderDate}>
            {new Date(item.date).toLocaleDateString('tr-TR')}
          </Text>
          <Text variant="bodySmall" style={styles.orderItems}>
            {item.items} ürün
          </Text>
        </View>

        {item.paymentMethod && (
          <Text variant="bodySmall" style={styles.paymentMethod}>
            Ödeme: {item.paymentMethod}
          </Text>
        )}
        
        <Text variant="titleLarge" style={styles.orderTotal}>
          ₺{item.total}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
        showsVerticalScrollIndicator={false}
      />

      {/* Sipariş Durumu Güncelleme Dialog'u */}
      <Portal>
        <Dialog visible={statusDialogVisible} onDismiss={() => setStatusDialogVisible(false)}>
          <Dialog.Title>Sipariş Durumu Güncelle</Dialog.Title>
          <Dialog.Content>
            {selectedOrder && (
              <View>
                <Text variant="bodyMedium" style={styles.dialogText}>
                  Sipariş: #{selectedOrder.id}
                </Text>
                <Text variant="bodyMedium" style={styles.dialogText}>
                  Müşteri: {selectedOrder.customerName}
                </Text>
                <Text variant="bodyMedium" style={styles.dialogText}>
                  Tutar: ₺{selectedOrder.total}
                </Text>
                <Text variant="bodyMedium" style={styles.dialogText}>
                  Mevcut Durum: {getStatusText(selectedOrder.status)}
                </Text>
                
                <Text variant="titleMedium" style={styles.statusTitle}>
                  Yeni Durum Seçin:
                </Text>
                
                <RadioButton.Group onValueChange={value => setSelectedStatus(value as OrderStatus)} value={selectedStatus}>
                  <RadioButton.Item label="Beklemede" value="pending" />
                  <RadioButton.Item label="İşleniyor" value="processing" />
                  <RadioButton.Item label="Kargoda" value="shipped" />
                  <RadioButton.Item label="Teslim Edildi" value="delivered" />
                  <RadioButton.Item label="İptal Edildi" value="cancelled" />
                  <RadioButton.Item label="Ödeme Bekleniyor" value="payment_pending" />
                </RadioButton.Group>
                
                <Text variant="bodySmall" style={styles.statusDescription}>
                  {getStatusDescription(selectedStatus)}
                </Text>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setStatusDialogVisible(false)}>İptal</Button>
            <Button onPress={handleStatusUpdate}>Güncelle</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  orderList: {
    padding: 16,
  },
  orderCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  orderContent: {
    paddingVertical: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontWeight: 'bold',
  },
  statusChip: {
    height: 24,
  },
  customerName: {
    marginBottom: 8,
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderDate: {
    opacity: 0.7,
  },
  orderItems: {
    opacity: 0.7,
  },
  paymentMethod: {
    marginBottom: 8,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  orderTotal: {
    fontWeight: 'bold',
    color: '#6366f1',
  },
  dialogText: {
    marginBottom: 8,
  },
  statusTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  statusDescription: {
    marginTop: 8,
    opacity: 0.7,
    fontStyle: 'italic',
  },
}); 