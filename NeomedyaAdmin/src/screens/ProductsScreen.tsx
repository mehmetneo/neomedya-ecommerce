import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Searchbar,
  Chip,
  IconButton,
  FAB,
  useTheme,
  Surface,
} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

type ProductsScreenProps = {
  navigation: StackNavigationProp<any>;
};

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  status: 'active' | 'inactive';
};

export default function ProductsScreen({ navigation }: ProductsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const theme = useTheme();

  // Mock ürün verileri
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Pamuklu T-Shirt',
      price: 89.99,
      category: 'Erkek',
      stock: 45,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
      status: 'active',
    },
    {
      id: '2',
      name: 'Elegant Kadın Elbise',
      price: 199.99,
      category: 'Kadın',
      stock: 23,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop',
      status: 'active',
    },
    {
      id: '3',
      name: 'Çocuk Spor Ayakkabı',
      price: 129.99,
      category: 'Çocuk',
      stock: 12,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
      status: 'active',
    },
    {
      id: '4',
      name: 'Deri Cüzdan',
      price: 79.99,
      category: 'Aksesuar',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop',
      status: 'inactive',
    },
  ];

  const categories = ['Tümü', 'Erkek', 'Kadın', 'Çocuk', 'Aksesuar'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tümü' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditProduct = (product: Product) => {
    navigation.navigate('EditProduct', { product });
  };

  const handleDeleteProduct = (product: Product) => {
    Alert.alert(
      'Ürünü Sil',
      `${product.name} ürününü silmek istediğinizden emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Sil', style: 'destructive', onPress: () => {
          Alert.alert('Başarılı', 'Ürün silindi');
        }},
      ]
    );
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <Card style={styles.productCard} mode="outlined">
      <Card.Content style={styles.productContent}>
        <View style={styles.productInfo}>
          <Text variant="titleMedium" style={styles.productName}>
            {item.name}
          </Text>
          <Text variant="bodyMedium" style={styles.productCategory}>
            {item.category}
          </Text>
          <Text variant="titleLarge" style={styles.productPrice}>
            ₺{item.price}
          </Text>
          <View style={styles.productMeta}>
            <Chip
              icon={item.stock > 10 ? 'check-circle' : 'alert-circle'}
              mode="outlined"
              style={[
                styles.stockChip,
                { backgroundColor: item.stock > 10 ? theme.colors.success + '20' : theme.colors.warning + '20' }
              ]}
            >
              Stok: {item.stock}
            </Chip>
            <Chip
              icon={item.status === 'active' ? 'check-circle' : 'close-circle'}
              mode="outlined"
              style={[
                styles.statusChip,
                { backgroundColor: item.status === 'active' ? theme.colors.success + '20' : theme.colors.error + '20' }
              ]}
            >
              {item.status === 'active' ? 'Aktif' : 'Pasif'}
            </Chip>
          </View>
        </View>
        <View style={styles.productActions}>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => handleEditProduct(item)}
            iconColor={theme.colors.primary}
          />
          <IconButton
            icon="delete"
            size={20}
            onPress={() => handleDeleteProduct(item)}
            iconColor={theme.colors.error}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Arama ve Filtreler */}
      <Surface style={styles.searchContainer} elevation={2}>
        <Searchbar
          placeholder="Ürün ara..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryChip}
              mode="outlined"
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </Surface>

      {/* Ürün Listesi */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB - Yeni Ürün Ekle */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddProduct')}
        label="Yeni Ürün"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    padding: 16,
    marginBottom: 8,
  },
  searchBar: {
    marginBottom: 12,
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    marginRight: 8,
  },
  productList: {
    padding: 16,
  },
  productCard: {
    marginBottom: 12,
    borderRadius: 12,
  },
  productContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCategory: {
    opacity: 0.7,
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  productMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  stockChip: {
    height: 24,
  },
  statusChip: {
    height: 24,
  },
  productActions: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 