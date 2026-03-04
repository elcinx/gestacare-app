import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Colors } from '../../constants/Colors';
import { Theme } from '../../constants/Theme';

interface WarningModalProps {
    visible: boolean;
    onClose: () => void;
}

export const WarningModal: React.FC<WarningModalProps> = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} onClose={onClose} title="⚠️ UYARI">
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Ionicons name="warning" size={48} color={Colors.error} />
                </View>
                <Text style={styles.text}>
                    Lütfen 4-5 kesme şeker veya 150-200 ml meyve suyu alınız. Ardından ek bir ara öğün alınız. 15 dakika sonra kan şekerinize bakınız.
                </Text>
                <Button title="Tamam" onPress={onClose} variant="primary" style={styles.button} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 16,
        backgroundColor: '#FEE2E2',
        padding: 16,
        borderRadius: 50,
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textMain,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    button: {
        width: '100%',
    },
});
