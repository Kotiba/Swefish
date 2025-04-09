'use client';

import { Drawer } from 'vaul';
import { useState, useEffect } from 'react';
import type { MenuItem } from '../../utils/types';

declare global {
  interface Window {
    updateDrawerState: (item: MenuItem | null, isOpen: boolean) => void;
  }
}

export default function MenuItemDrawer() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.updateDrawerState = (item: MenuItem | null, open: boolean) => {
      setSelectedItem(item);
      setIsOpen(open);
    };
  }, []);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[20px] mt-24 h-[70%] lg:h-[600px] fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-white rounded-t-[20px] flex-1 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-4">
              <div aria-hidden className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
              {selectedItem && (
                <>
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={`/src/images/products/${selectedItem.image}.jpg`}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        console.error('Failed to load image:', selectedItem.image);
                      }}
                    />
                  </div>
                  <Drawer.Title className="font-medium text-xl text-gray-900">
                    {selectedItem.title}
                  </Drawer.Title>
                  <div className="text-yellow-600 font-semibold">
                    ${selectedItem.price.toFixed(2)}
                  </div>
                  <p className="text-gray-600">
                    {selectedItem.description}
                  </p>
                  {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                    <div className="text-gray-600">
                      <strong>Allergens:</strong> {selectedItem.allergens.join(', ')}
                    </div>
                  )}
                  {selectedItem.weightOptions && selectedItem.weightOptions.length > 0 && (
                    <div className="text-gray-600">
                      <strong>Available Sizes:</strong>
                      {selectedItem.weightOptions.map((option) => (
                        <span key={option.weight} className="ml-2">
                          {option.weight} (${option.price.toFixed(2)})
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
} 