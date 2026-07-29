'use client';

import { useState, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  itemCount: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  onClose,
}: UseKeyboardNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % itemCount);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + itemCount) % itemCount);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < itemCount) {
            onSelect(selectedIndex);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [itemCount, selectedIndex, onSelect, onClose]
  );

  const resetIndex = useCallback(() => {
    setSelectedIndex(-1);
  }, []);

  return { selectedIndex, handleKeyDown, resetIndex };
}
