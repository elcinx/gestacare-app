import { Colors } from './Colors';

export const Theme = {
    borderRadius: {
        card: 16,
        modal: 24,
        pill: 50,
    },
    shadow: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    fonts: {
        regular: 'Poppins_400Regular',
        semiBold: 'Poppins_600SemiBold',
        bold: 'Poppins_700Bold',
    }
};
