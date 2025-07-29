import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Surface,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { LineChart, BarChart } from 'react-native-chart-kit';

type DashboardScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const theme = useTheme();

  const stats = {
    totalSales: 125000,
    totalOrders: 156,
    totalCustomers: 89,
    totalProducts: 234,
  };

  const chartData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const QuickActionCard = ({ title, value, icon, color, onPress }: any) => (
    <Card style={styles.quickCard} onPress={onPress}>
      <Card.Content style={styles.quickCardContent}>
        <IconButton
          icon={icon}
          size={32}
          iconColor={color}
          style={styles.quickCardIcon}
        />
        <View>
          <Text variant="titleMedium" style={styles.quickCardTitle}>
            {title}
          </Text>
          <Text variant="headlineSmall" style={[styles.quickCardValue, { color }]}>
            {value}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.welcomeText}>
          Hoş Geldiniz! 👋
        </Text>
        <Text variant="bodyMedium" style={styles.dateText}>
          {new Date().toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* İstatistik Kartları */}
      <View style={styles.statsContainer}>
        <QuickActionCard
          title="Toplam Satış"
          value={`₺${stats.totalSales.toLocaleString()}`}
          icon="currency-try"
          color={theme.colors.primary}
          onPress={() => navigation.navigate('Orders')}
        />
        <QuickActionCard
          title="Siparişler"
          value={stats.totalOrders}
          icon="package-variant"
          color={theme.colors.secondary}
          onPress={() => navigation.navigate('Orders')}
        />
        <QuickActionCard
          title="Müşteriler"
          value={stats.totalCustomers}
          icon="account-group"
          color={theme.colors.tertiary}
          onPress={() => navigation.navigate('Customers')}
        />
        <QuickActionCard
          title="Ürünler"
          value={stats.totalProducts}
          icon="tshirt-crew"
          color={theme.colors.success}
          onPress={() => navigation.navigate('Products')}
        />
      </View>

      {/* Satış Grafiği */}
      <Surface style={styles.chartCard} elevation={2}>
        <Text variant="titleMedium" style={styles.chartTitle}>
          Haftalık Satış Grafiği
        </Text>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: theme.colors.primary,
            },
          }}
          bezier
          style={styles.chart}
        />
      </Surface>

      {/* Hızlı İşlemler */}
      <View style={styles.actionsContainer}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Hızlı İşlemler
        </Text>
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            icon="plus"
            onPress={() => navigation.navigate('AddProduct')}
            style={styles.actionButton}
          >
            Yeni Ürün
          </Button>
          <Button
            mode="outlined"
            icon="package-variant"
            onPress={() => navigation.navigate('Orders')}
            style={styles.actionButton}
          >
            Siparişler
          </Button>
          <Button
            mode="outlined"
            icon="account-group"
            onPress={() => navigation.navigate('Customers')}
            style={styles.actionButton}
          >
            Müşteriler
          </Button>
          <Button
            mode="outlined"
            icon="cog"
            onPress={() => navigation.navigate('Settings')}
            style={styles.actionButton}
          >
            Ayarlar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateText: {
    opacity: 0.7,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  quickCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  quickCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickCardIcon: {
    marginRight: 16,
  },
  quickCardTitle: {
    marginBottom: 4,
  },
  quickCardValue: {
    fontWeight: 'bold',
  },
  chartCard: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  chartTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  chart: {
    borderRadius: 12,
  },
  actionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
  },
}); 