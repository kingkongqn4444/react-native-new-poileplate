import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useUserProfile, useLogout } from '../hooks';
import { getThemeColors } from '../utils';
import { useSettings } from '../hooks';

export const ProfileScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const { user, updateProfile, isLoading } = useUserProfile();
  const { logout } = useLogout();
  const { theme } = useSettings();
  const colors = getThemeColors(theme);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateProfile({
        name,
        email,
        phone,
      });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      color: colors.text,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 15,
      color: colors.text,
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 5,
      color: colors.textSecondary,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: colors.surface,
      color: colors.text,
    },
    inputDisabled: {
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 20,
    },
    button: {
      flex: 1,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      backgroundColor: colors.secondary,
    },
    dangerButton: {
      backgroundColor: colors.error,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    infoContainer: {
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 8,
      marginBottom: 15,
    },
    infoText: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 5,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scrollView}>
        <Text style={styles.title}>Profile</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={name}
              onChangeText={setName}
              editable={isEditing}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
              placeholder="Enter your phone"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoText}>{user.id}</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Created At</Text>
            <Text style={styles.infoText}>
              {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoText}>
              {new Date(user.updatedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Save</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => {
                  setIsEditing(false);
                  setName(user.name);
                  setEmail(user.email);
                  setPhone(user.phone || '');
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
