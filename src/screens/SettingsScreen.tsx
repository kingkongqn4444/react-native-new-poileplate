import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import { useSettings, useTheme, useNotifications } from '../hooks';
import { getThemeColors } from '../utils';

export const SettingsScreen: React.FC = () => {
  const { theme, language, notifications, privacy } = useSettings();
  const { toggleTheme, setTheme } = useTheme();
  const { toggleNotification, updateNotifications } = useNotifications();
  const colors = getThemeColors(theme);

  const handleLanguageChange = () => {
    // You can implement language selection logic here
    console.log('Language change requested');
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
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 15,
      color: colors.text,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    settingValue: {
      fontSize: 14,
      color: colors.textSecondary,
      marginRight: 10,
    },
    themeButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    themeButtonText: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text,
    },
    themeButtonTextActive: {
      color: 'white',
    },
    themeContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 5,
      fontStyle: 'italic',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scrollView}>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Theme</Text>
            <View style={styles.themeContainer}>
              {(['light', 'dark', 'system'] as const).map((themeOption) => (
                <TouchableOpacity
                  key={themeOption}
                  style={[
                    styles.themeButton,
                    theme === themeOption && styles.themeButtonActive,
                  ]}
                  onPress={() => setTheme(themeOption)}
                >
                  <Text
                    style={[
                      styles.themeButtonText,
                      theme === themeOption && styles.themeButtonTextActive,
                    ]}
                  >
                    {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Language</Text>
            <TouchableOpacity onPress={handleLanguageChange}>
              <Text style={styles.settingValue}>{language.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.infoText}>
                Receive push notifications on your device
              </Text>
            </View>
            <Switch
              value={notifications.push}
              onValueChange={() => toggleNotification('push')}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notifications.push ? 'white' : colors.textSecondary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Text style={styles.infoText}>
                Receive notifications via email
              </Text>
            </View>
            <Switch
              value={notifications.email}
              onValueChange={() => toggleNotification('email')}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notifications.email ? 'white' : colors.textSecondary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>SMS Notifications</Text>
              <Text style={styles.infoText}>
                Receive notifications via SMS
              </Text>
            </View>
            <Switch
              value={notifications.sms}
              onValueChange={() => toggleNotification('sms')}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notifications.sms ? 'white' : colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Analytics</Text>
              <Text style={styles.infoText}>
                Help improve the app by sharing usage analytics
              </Text>
            </View>
            <Switch
              value={privacy.analytics}
              onValueChange={() => {
                // You can implement analytics toggle logic here
                console.log('Analytics toggle');
              }}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={privacy.analytics ? 'white' : colors.textSecondary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Crash Reporting</Text>
              <Text style={styles.infoText}>
                Automatically send crash reports to help fix bugs
              </Text>
            </View>
            <Switch
              value={privacy.crashReporting}
              onValueChange={() => {
                // You can implement crash reporting toggle logic here
                console.log('Crash reporting toggle');
              }}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={privacy.crashReporting ? 'white' : colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>App Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Build Number</Text>
            <Text style={styles.settingValue}>100</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
