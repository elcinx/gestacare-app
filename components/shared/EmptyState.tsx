import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface EmptyStateProps {
    message?: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    message = 'Henüz kayıt bulunmuyor',
    icon = 'clipboard-outline'
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={64} color={Colors.primary} style={{ opacity: 0.3 }} />
            </View>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    iconContainer: {
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});
