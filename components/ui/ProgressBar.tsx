import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

interface ProgressBarProps {
    progress: number; // 0 to 1
    height?: number;
    style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, height = 8, style }) => {
    return (
        <View style={[styles.container, { height }, style]}>
            <View style={[styles.fill, { width: `${Math.min(100, progress * 100)}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.primaryLight,
        borderRadius: 10,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
});
