
import React, { useEffect, useState } from 'react';
import { useNfc } from '@/contexts/NfcContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Scan, StopCircle } from 'lucide-react';

interface NfcScannerProps {
  onScanComplete?: (data: Record<string, any>) => void;
  scanMode?: 'read' | 'write';
}

const NfcScanner: React.FC<NfcScannerProps> = ({ onScanComplete, scanMode = 'read' }) => {
  const { isNfcAvailable, isScanning, startScan, stopScan, lastScannedData } = useNfc();
  const [animateScanner, setAnimateScanner] = useState(false);

  useEffect(() => {
    return () => {
      // Clean up by stopping the scan when the component unmounts
      if (isScanning) {
        stopScan();
      }
    };
  }, [isScanning, stopScan]);

  useEffect(() => {
    if (lastScannedData && isScanning && scanMode === 'read' && onScanComplete) {
      onScanComplete(lastScannedData);
    }
  }, [lastScannedData, isScanning, onScanComplete, scanMode]);

  const handleStartScan = async () => {
    await startScan();
    setAnimateScanner(true);
  };

  const handleStopScan = async () => {
    await stopScan();
    setAnimateScanner(false);
  };

  if (!isNfcAvailable) {
    return (
      <Card className="p-6 text-center bg-yellow-50 border-yellow-200">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">NFC Not Available</h3>
        <p className="text-yellow-700">
          NFC functionality is not available on this device or permission has not been granted.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="mb-8 text-center">
        <div className="relative inline-flex justify-center items-center">
          <div 
            className={`${
              animateScanner ? 'nfc-pulse' : ''
            } bg-blue-500 rounded-full w-40 h-40 flex items-center justify-center z-10`}
          >
            <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center">
              <Scan className="h-16 w-16 text-blue-500" />
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          {isScanning 
            ? `${scanMode === 'read' ? 'Scanning for NFC tags...' : 'Ready to write. Approach an NFC tag...'}`
            : `Tap the button to ${scanMode === 'read' ? 'start scanning' : 'begin writing'}`
          }
        </p>
      </div>

      <div>
        {!isScanning ? (
          <Button 
            className="btn-gradient text-white px-8 py-6 rounded-full shadow-lg"
            onClick={handleStartScan}
          >
            <Scan className="mr-2 h-5 w-5" />
            {scanMode === 'read' ? 'Start Scanning' : 'Ready to Write'}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="px-8 py-6 rounded-full border-red-300 text-red-500"
            onClick={handleStopScan}
          >
            <StopCircle className="mr-2 h-5 w-5" />
            Stop
          </Button>
        )}
      </div>
    </div>
  );
};

export default NfcScanner;
