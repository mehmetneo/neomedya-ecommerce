import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  useTheme,
  SegmentedButtons,
} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

type AddProductScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function AddProductScreen({ navigation }: AddProductScreenProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Erkek');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const categories = ['Erkek', 'Kadın', 'Çocuk', 'Aksesuar'];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Kamera izni gereklidir.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !stock) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    setLoading(true);
    
    // Simüle edilmiş kaydetme işlemi
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Başarılı', 'Ürün başarıyla eklendi', [
        { text: 'Tamam', onPress: () => navigation.goBack() }
      ]);
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text variant="titleLarge" style={styles.title}>
          Yeni Ürün Ekle
        </Text>

        {/* Fotoğraf Bölümü */}
        <View style={styles.imageSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Ürün Fotoğrafı
          </Text>
          {image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.productImage} />
              <Button
                mode="outlined"
                onPress={() => setImage(null)}
                style={styles.removeImageButton}
              >
                Fotoğrafı Kaldır
              </Button>
            </View>
          ) : (
            <View style={styles.imageButtons}>
              <Button
                mode="outlined"
                icon="camera"
                onPress={takePhoto}
                style={styles.imageButton}
              >
                Fotoğraf Çek
              </Button>
              <Button
                mode="outlined"
                icon="image"
                onPress={pickImage}
                style={styles.imageButton}
              >
                Galeriden Seç
              </Button>
            </View>
          )}
        </View>

        {/* Ürün Bilgileri */}
        <View style={styles.formSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Ürün Bilgileri
          </Text>

          <TextInput
            label="Ürün Adı *"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Fiyat (₺) *"
            value={price}
            onChangeText={setPrice}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Stok Miktarı *"
            value={stock}
            onChangeText={setStock}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Açıklama"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <Text variant="bodyMedium" style={styles.categoryLabel}>
            Kategori
          </Text>
          <SegmentedButtons
            value={category}
            onValueChange={setCategory}
            buttons={categories.map(cat => ({
              value: cat,
              label: cat,
            }))}
            style={styles.categoryButtons}
          />
        </View>

        {/* Kaydet Butonu */}
        <Button
          mode="contained"
          onPress={handleSave}
          loading={loading}
          disabled={loading}
          style={styles.saveButton}
          contentStyle={styles.saveButtonContent}
        >
          Ürünü Kaydet
        </Button>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  imageSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  removeImageButton: {
    marginTop: 8,
  },
  imageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  imageButton: {
    flex: 1,
  },
  formSection: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  categoryLabel: {
    marginBottom: 8,
    fontWeight: '500',
  },
  categoryButtons: {
    marginBottom: 16,
  },
  saveButton: {
    borderRadius: 8,
  },
  saveButtonContent: {
    paddingVertical: 8,
  },
}); 