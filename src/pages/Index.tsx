
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Scan, Save, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useNfc } from '@/contexts/NfcContext';
import { NfcProvider } from '@/contexts/NfcContext';
import NfcScanHistory from '@/components/nfc/NfcScanHistory';

const Index = () => {
  const navigate = useNavigate();

  return (
    <NfcProvider>
      <AppLayout title="NFC Reader/Writer">
        <div className="py-6 space-y-6">
          <HomeContent navigate={navigate} />
        </div>
      </AppLayout>
    </NfcProvider>
  );
};

const HomeContent = ({ navigate }: { navigate: (path: string) => void }) => {
  const { isNfcAvailable } = useNfc();

  return (
    <>
      {/* NFC Status */}
      {!isNfcAvailable && (
        <Card className="bg-yellow-50 border-yellow-200 p-4 text-center">
          <p className="text-yellow-700">
            NFC functionality is not available on this device or permission has not been granted.
          </p>
        </Card>
      )}

      {/* Actions */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="overflow-hidden card-shadow">
          <div className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-blue-100 p-4">
              <Scan className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-medium">Read NFC Tags</h2>
            <p className="text-gray-600 text-sm">
              Scan NFC tags to read their stored data content.
            </p>
            <Button 
              className="btn-gradient w-full mt-4"
              onClick={() => navigate('/read')}
              disabled={!isNfcAvailable}
            >
              Start Reading
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden card-shadow">
          <div className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-green-100 p-4">
              <Save className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-medium">Write to NFC Tags</h2>
            <p className="text-gray-600 text-sm">
              Create content and write it to compatible NFC tags.
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
              onClick={() => navigate('/write')}
              disabled={!isNfcAvailable}
            >
              Start Writing
            </Button>
          </div>
        </Card>
      </div>

      {/* History Section */}
      <div className="mt-8">
        <NfcScanHistory />
      </div>
    </>
  );
};

export default Index;
