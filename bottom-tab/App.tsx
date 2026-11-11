import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// ==========================================
// A. SCREEN: HOME (Hiển thị FlatList)
// ==========================================
const SAMPLE_DATA = [
  { id: '1', title: 'Điện thoại Vsmart Joy 3', desc: '1.790.000 đ' },
  { id: '2', title: 'Tai nghe Bluetooth không dây', desc: '350.000 đ' },
  { id: '3', title: 'Ốp lưng silicon chống sốc', desc: '50.000 đ' },
  { id: '4', title: 'Cáp sạc Type-C nhanh 18W', desc: '120.000 đ' },
  { id: '5', title: 'Kính cường lực 9D', desc: '40.000 đ' },
];

function HomeScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.cardItem}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.desc}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headerTitle}>Danh Sách Sản Phẩm</Text>
      <FlatList
        data={SAMPLE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

// ==========================================
// B. SCREEN: SEARCH (Có TextInput nhập từ khóa)
// ==========================================
function SearchScreen() {
  const [keyword, setKeyword] = useState('');

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headerTitle}>Tìm Kiếm</Text>

      <View style={styles.searchBoxContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Nhập từ khóa tìm kiếm..."
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>

      <View style={styles.searchResultWrapper}>
        <Text style={styles.searchTextInfo}>
          {keyword ? `Từ khóa bạn đang tìm: "${keyword}"` : 'Chưa nhập từ khóa nào'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// C. SCREEN: PROFILE (Hiển thị Avatar + Name)
// ==========================================
function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.profileWrapper}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
          }}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>Nguyễn Văn A</Text>
        <Text style={styles.profileEmail}>nguyenvana@example.com</Text>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// D. MAIN: BOTTOM TAB NAVIGATION
// ==========================================
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#1952E6',
          tabBarInactiveTintColor: '#888888',
          tabBarStyle: {
            paddingBottom: 6,
            height: 60,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Trang chủ' }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Tìm kiếm' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Cá nhân' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  // Home styles
  listContent: {
    paddingBottom: 20,
  },
  cardItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  cardDesc: {
    fontSize: 14,
    color: '#EE0A0A',
    marginTop: 4,
    fontWeight: 'bold',
  },
  // Search styles
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
  },
  searchResultWrapper: {
    marginTop: 25,
    alignItems: 'center',
  },
  searchTextInfo: {
    fontSize: 15,
    color: '#666',
  },
  // Profile styles
  profileWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#1952E6',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },
  profileEmail: {
    fontSize: 14,
    color: '#777777',
    marginTop: 4,
  },
});