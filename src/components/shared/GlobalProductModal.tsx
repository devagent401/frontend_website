"use client";

import { useModalStore } from '@/stores/modalStore';
import Modal from './Modal';
import ProductOverview from '@/app/products/[id]/components/ProductOverview';

export default function GlobalProductModal() {
    const { isOpen, product, closeQuickView } = useModalStore();

    if (!product) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeQuickView}
            size="xl"
            title="Quick View"
        >
            <ProductOverview product={product} />
        </Modal>
    );
}

