import React, { useState, useEffect } from 'react';
import * as Drawer from '../../vaul-main/src';

interface WeightOption {
  weight: string;
  price: number;
}

interface MenuItem {
  title: string;
  description: string;
  price: number;
  image: string;
  isTopRated?: boolean;
  weightOptions?: WeightOption[];
}

// Add type declaration for window
declare global {
  interface Window {
    itemDrawerState: {
      isOpen: boolean;
      item: MenuItem | null;
    };
    closeItemDrawer: () => void;
  }
}

export default function ItemDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<MenuItem | null>(null);

  // Listen for changes from the Astro component
  useEffect(() => {
    const handleDrawerUpdate = () => {
      if (window.itemDrawerState) {
        setIsOpen(window.itemDrawerState.isOpen);
        setItem(window.itemDrawerState.item);
      }
    };

    // Initialize
    if (window.itemDrawerState) {
      setIsOpen(window.itemDrawerState.isOpen);
      setItem(window.itemDrawerState.item);
    }

    // Listen for updates
    document.addEventListener('itemDrawerUpdate', handleDrawerUpdate);
    
    return () => {
      document.removeEventListener('itemDrawerUpdate', handleDrawerUpdate);
    };
  }, []);
  
  const handleClose = () => {
    if (window.closeItemDrawer) {
      window.closeItemDrawer();
    } else {
      setIsOpen(false);
    }
  };
  
  if (!item) return null;
  
  const hasWeightOptions = item.weightOptions && item.weightOptions.length > 0;

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[85vh] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 pb-6 flex-1 overflow-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            
            <div className="max-w-md mx-auto">
              <div className="relative aspect-[4/3] w-full bg-gray-200 rounded-lg overflow-hidden mb-6">
                <img 
                  src={item.image || "/placeholder.svg"} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                
                {item.isTopRated && (
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full text-sm text-orange-500 font-medium flex items-center shadow-sm">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="mr-1">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Top rated
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-6">{item.description}</p>
              
              {hasWeightOptions ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Available Options</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {item.weightOptions?.map((option, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium">{option.weight}</span>
                        <span className="text-gray-900 font-semibold">EGP {option.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium text-gray-900">Price</span>
                  <span className="text-xl font-semibold text-gray-900">EGP {item.price.toFixed(2)}</span>
                </div>
              )}
              
              <button 
                onClick={handleClose}
                className="w-full py-3 bg-gray-900 text-white rounded-lg mt-8 font-medium hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
} 