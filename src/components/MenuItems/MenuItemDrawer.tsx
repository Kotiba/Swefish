'use client';

import { Drawer } from 'vaul';
import { useState, useEffect } from 'react';
import type { MenuItem } from '../../utils/types';

declare global {
  interface Window {
    updateDrawerState: (item: MenuItem | null, isOpen: boolean) => void;
  }
}

// Format price to display integers without decimal points
const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return 'Price on Selection';
  return Number.isInteger(price) ? price.toString() : price.toFixed(2);
};

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
                  <Drawer.Title className="font-medium text-xl text-gray-900">
                    {selectedItem.title}
                  </Drawer.Title>
                  
                  {/* Show base price only if there are no weight options */}
                  {(!selectedItem.weightOptions || selectedItem.weightOptions.length === 0) && (
                    <div className="text-yellow-600 font-semibold">
                      {selectedItem.price !== undefined && selectedItem.price !== null 
                        ? `EGP ${formatPrice(selectedItem.price)}` 
                        : 'Price on Selection'}
                    </div>
                  )}
                  
                  <p className="text-gray-600 mt-2">
                    {selectedItem.description}
                  </p>
                  
                  {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                    <div className="text-gray-600 mt-3">
                      <strong>Allergens:</strong> {selectedItem.allergens.join(', ')}
                    </div>
                  )}
                  
                  {/* Improved Weight Options UI */}
                  {selectedItem.weightOptions && selectedItem.weightOptions.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-medium text-gray-800 mb-2">Options:</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedItem.weightOptions.map((option) => (
                          <div 
                            key={option.weight} 
                            className="border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50"
                          >
                            <span className="font-medium text-gray-700">{option.weight}</span>
                            <span className="text-yellow-600 font-semibold">
                              {option.price !== undefined 
                                ? `EGP ${formatPrice(option.price)}` 
                                : 'Price on Selection'}
                            </span>
                          </div>
                        ))}
                      </div>
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