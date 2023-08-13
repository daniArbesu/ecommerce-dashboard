'use client';

import { useStoreModal } from '@/hooks/useStoreModal';
import Modal from '../ui/modal';

const StoreModal = () => {
  const store = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store and manage your products from there"
      isOpen={store.isOpen}
      onClose={store.onClose}
    >
      Future Create Store Modal
    </Modal>
  );
};

export default StoreModal;
