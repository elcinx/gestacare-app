import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface BadgeProps {
    text: string;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'gray';
    style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'primary', style }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return { backgroundColor: '#D1FAE5', color: Colors.success };
            case 'warning':
                return { backgroundColor: '#FEF3C7', color: Colors.warning };
            case 'error':
                return { backgroundColor: '#FEE2E2', color: Colors.error };
            case 'info':
                return { backgroundColor: '#DBEAFE', color: '#2563EB' };
            case 'primary':
                return { backgroundColor: Colors.primaryLight, color: Colors.primary };
            case 'gray':
                return { backgroundColor: '#F3F4F6', color: Colors.textSecondary };
            default:
                return { backgroundColor: Colors.primaryLight, color: Colors.primary };
        }
    };

    const variantStyles = getVariantStyles();

    return (
        <View style={[styles.badge, { backgroundColor: variantStyles.backgroundColor }, style]}>
            <Text style={[styles.text, { color: variantStyles.color }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 50,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
});
