/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  webpack: (config, { isServer }) => {
    // NeomedyaAdmin klasörünü build'den hariç tut
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-navigation/native': false,
      '@react-navigation/stack': false,
      'react-native-paper': false,
      'expo-status-bar': false,
    }
    return config
  },
}

module.exports = nextConfig 