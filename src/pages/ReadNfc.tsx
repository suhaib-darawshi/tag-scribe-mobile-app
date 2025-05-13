
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import NfcScanner from '@/components/nfc/NfcScanner';
import NfcDataDisplay from '@/components/nfc/NfcDataDisplay';
import { NfcProvider } from '@/contexts/NfcContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ReadNfc: React.FC = () => {
  const [scannedData, setScannedData] = useState<Record<string, any> | null>(null);

  const handleScanComplete = (data: Record<string, any>) => {
    setScannedData(data);
  };

  return (
    <NfcProvider>
      <AppLayout title="Scan NFC">
        <div className="py-6">
          {!scannedData ? (
            <NfcScanner onScanComplete={handleScanComplete} scanMode="read" />
          ) : (
            <div className="space-y-6 animate-fade-in">
              <NfcDataDisplay data={scannedData} timestamp={Date.now()} />
              
              <div className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => setScannedData(null)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Scan Another Tag
                </Button>
              </div>
            </div>
          )}
        </div>
      </AppLayout>
    </NfcProvider>
  );
};

export default ReadNfc;
