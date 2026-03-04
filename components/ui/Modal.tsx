import React from 'react';
import {
    Modal as RNModal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ViewStyle,
    TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Theme } from '../../constants/Theme';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children, style }) => {
    return (
        <RNModal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.content, style]}>
                            <View style={styles.header}>
                                <Text style={styles.title}>{title}</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Ionicons name="close" size={24} color={Colors.textMain} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.body}>
                                {children}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    content: {
        backgroundColor: Colors.surface,
        borderRadius: Theme.borderRadius.modal,
        width: '100%',
        maxHeight: Dimensions.get('window').height * 0.8,
        ...Theme.shadow,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textMain,
    },
    body: {
        padding: 20,
    },
});
