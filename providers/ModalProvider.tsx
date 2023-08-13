'use client';

import StoreModal from '@/components/modals/StoreModal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ensure not hydration errors (server side)
  if (!isMounted) return null;

  return <StoreModal />;
};

export default ModalProvider;
