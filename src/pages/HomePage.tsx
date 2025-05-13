
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { NfcProvider } from '@/contexts/NfcContext';
import NfcScanHistory from '@/components/nfc/NfcScanHistory';

const HomePage: React.FC = () => {
  return (
    <NfcProvider>
      <AppLayout title="Recent Interactions">
        <div className="py-6">
          <NfcScanHistory />
        </div>
      </AppLayout>
    </NfcProvider>
  );
};

export default HomePage;
