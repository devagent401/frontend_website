"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    maxQuantity: number;
}

interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                // Update quantity if item exists
                const newQuantity = Math.min(existingItem.quantity + action.payload.quantity, existingItem.maxQuantity);
                const updatedItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );

                return {
                    ...state,
                    items: updatedItems,
                    total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                    itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0)
                };
            } else {
                // Add new item with specified quantity
                const newItem: CartItem = action.payload;
                const updatedItems = [...state.items, newItem];

                return {
                    ...state,
                    items: updatedItems,
                    total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                    itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0)
                };
            }
        }

        case 'REMOVE_ITEM': {
            const updatedItems = state.items.filter(item => item.id !== action.payload);
            return {
                ...state,
                items: updatedItems,
                total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0)
            };
        }

        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
            }

            const updatedItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: Math.min(action.payload.quantity, item.maxQuantity) }
                    : item
            );

            return {
                ...state,
                items: updatedItems,
                total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0)
            };
        }

        case 'CLEAR_CART':
            return {
                items: [],
                total: 0,
                itemCount: 0
            };

        default:
            return state;
    }
};

interface CartContextType {
    state: CartState;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        total: 0,
        itemCount: 0
    });

    const addItem = (item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{
            state,
            addItem,
            removeItem,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
