import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    StyleProp
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';
import { Theme } from '../../constants/Theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    pill?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    style,
    textStyle,
    pill = false
}) => {
    const handlePress = () => {
        if (!disabled && !loading) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress();
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'secondary':
                return { backgroundColor: Colors.primaryLight };
            case 'outline':
                return { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.primary };
            case 'danger':
                return { backgroundColor: Colors.error };
            default:
                return {};
        }
    };

    const getTextStyles = () => {
        switch (variant) {
            case 'secondary':
                return { color: Colors.primary };
            case 'outline':
                return { color: Colors.primary };
            case 'danger':
                return { color: Colors.surface };
            default:
                return { color: Colors.surface };
        }
    };

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator color={variant === 'primary' ? Colors.surface : Colors.primary} />;
        }
        return (
            <Text style={[
                styles.text,
                size === 'small' && styles.textSmall,
                size === 'large' && styles.textLarge,
                getTextStyles(),
                textStyle
            ]}>
                {title}
            </Text>
        );
    };

    const buttonStyles = [
        styles.base,
        size === 'small' && styles.small,
        size === 'large' && styles.large,
        pill && styles.pill,
        getVariantStyles(),
        disabled && styles.disabled,
        style
    ];

    if (variant === 'primary' && !disabled) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handlePress}
                disabled={disabled || loading}
                style={buttonStyles}
            >
                <LinearGradient
                    colors={Colors.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFill, pill ? styles.pill : styles.primaryGradient]}
                />
                {renderContent()}
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePress}
            disabled={disabled || loading}
            style={buttonStyles}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    primaryGradient: {
        borderRadius: 16,
    },
    small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    large: {
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    pill: {
        borderRadius: 50,
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    textSmall: {
        fontSize: 14,
    },
    textLarge: {
        fontSize: 18,
    },
    disabled: {
        opacity: 0.5,
        backgroundColor: Colors.textSecondary,
    },
});
