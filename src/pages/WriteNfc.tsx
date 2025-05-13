
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import NfcWriteForm from '@/components/nfc/NfcWriteForm';
import NfcScanner from '@/components/nfc/NfcScanner';
import NfcDataDisplay from '@/components/nfc/NfcDataDisplay';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { NfcProvider } from '@/contexts/NfcContext';
import { useNfc } from '@/contexts/NfcContext';

const WriteNfc: React.FC = () => {
  const [step, setStep] = useState<'form' | 'write' | 'success'>('form');
  const [dataToWrite, setDataToWrite] = useState<Record<string, any> | null>(null);
  const { writeData } = useNfc();

  const handleFormSubmit = (data: Record<string, any>) => {
    setDataToWrite(data);
    setStep('write');
  };

  const handleWriteStart = async () => {
    if (dataToWrite) {
      const success = await writeData(dataToWrite);
      if (success) {
        setStep('success');
      }
    }
  };

  const handleReset = () => {
    setDataToWrite(null);
    setStep('form');
  };

  return (
    <NfcProvider>
      <AppLayout title="Write NFC Tag" showBack>
        <div className="py-6">
          {step === 'form' && (
            <div className="space-y-4">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-blue-700 text-sm">
                  Create the data you want to write to the NFC tag. You can add multiple fields as needed.
                </p>
              </Card>
              <NfcWriteForm onSubmit={handleFormSubmit} />
            </div>
          )}

          {step === 'write' && dataToWrite && (
            <div className="space-y-6">
              <NfcDataDisplay data={dataToWrite} type="write" />
              
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-blue-700 text-sm">
                  Ready to write. Press the button below and approach an NFC tag.
                </p>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Form
                </Button>
                
                <Button 
                  className="btn-gradient"
                  onClick={handleWriteStart}
                >
                  Start Writing
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && dataToWrite && (
            <div className="space-y-6 text-center">
              <div className="py-8 flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-6 mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-medium text-green-700">Write Successful!</h2>
                <p className="text-gray-600 mt-2">
                  The data has been successfully written to the NFC tag.
                </p>
              </div>
              
              <NfcDataDisplay data={dataToWrite} type="write" timestamp={Date.now()} />
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="mx-2"
                >
                  Write Another Tag
                </Button>
              </div>
            </div>
          )}
        </div>
      </AppLayout>
    </NfcProvider>
  );
};

export default WriteNfc;
