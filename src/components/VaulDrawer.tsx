'use client';

import { Drawer } from 'vaul';

export default function VaulDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800  transition-colors shadow-sm">
        Open Drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[20px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-white rounded-t-[20px] flex-1">
            <div aria-hidden className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4 text-gray-900">Drawer for React.</Drawer.Title>
              <p className="text-gray-600 mb-2">
                This component can be used as a Dialog replacement on mobile and tablet devices.
              </p>
              <p className="text-gray-600 mb-2">
                This is a simple drawer implementation with smooth animations and drag-to-close functionality.
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
} 