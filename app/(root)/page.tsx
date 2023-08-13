'use client';
import { useStoreModal } from '@/hooks/useStoreModal';
import { useEffect } from 'react';

export default function SetupPage() {
  // needs to be this way for useEffect
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <main></main>;
}
