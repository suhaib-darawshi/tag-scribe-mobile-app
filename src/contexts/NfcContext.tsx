
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  checkNfcAvailability, 
  startNfcListener, 
  stopNfcListener,
  registerNfcListeners,
  parseNfcData,
  writeToNfcTag
} from '@/services/nfcService';
import { toast } from 'sonner';
import { addScanToHistory } from '@/services/storageService';

interface NfcContextType {
  isNfcAvailable: boolean;
  isScanning: boolean;
  lastScannedData: Record<string, any> | null;
  startScan: () => Promise<void>;
  stopScan: () => Promise<void>;
  writeData: (data: Record<string, any>) => Promise<boolean>;
}

const NfcContext = createContext<NfcContextType | undefined>(undefined);

export const NfcProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isNfcAvailable, setIsNfcAvailable] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [lastScannedData, setLastScannedData] = useState<Record<string, any> | null>(null);

  // Check NFC availability when component mounts
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const available = await checkNfcAvailability();
        setIsNfcAvailable(available);
        console.log(`NFC is ${available ? 'available' : 'not available'}`);
      } catch (error) {
        console.error('Error checking NFC availability:', error);
        setIsNfcAvailable(false);
      }
    };

    checkAvailability();
  }, []);

  // Register NFC event listeners
  useEffect(() => {
    const handleNfcDetected = (tagData: any) => {
      const parsedData = parseNfcData(tagData);
      setLastScannedData(parsedData);
      
      // Add to history
      addScanToHistory({
        timestamp: Date.now(),
        data: parsedData,
        type: 'read',
      });
      
      toast.success('NFC tag scanned successfully');
    };

    const handleNfcError = (error: any) => {
      toast.error('NFC scan error occurred');
      console.error('NFC error:', error);
    };

    registerNfcListeners(handleNfcDetected, handleNfcError);
  }, []);

  // Start NFC scanning
  const startScan = async () => {
    if (!isNfcAvailable) {
      toast.error('NFC is not available on this device');
      return;
    }

    try {
      const started = await startNfcListener();
      if (started) {
        setIsScanning(true);
        toast.info('Ready to scan NFC tags');
      }
    } catch (error) {
      console.error('Error starting NFC scan:', error);
      toast.error('Failed to start NFC scanning');
    }
  };

  // Stop NFC scanning
  const stopScan = async () => {
    try {
      await stopNfcListener();
      setIsScanning(false);
    } catch (error) {
      console.error('Error stopping NFC scan:', error);
    }
  };

  // Write data to NFC tag
  const writeData = async (data: Record<string, any>) => {
    if (!isNfcAvailable) {
      toast.error('NFC is not available on this device');
      return false;
    }

    try {
      const success = await writeToNfcTag(data);
      if (success) {
        // Add to history
        addScanToHistory({
          timestamp: Date.now(),
          data: data,
          type: 'write',
        });
      }
      return success;
    } catch (error) {
      console.error('Error in writeData:', error);
      toast.error('Failed to write data to NFC tag');
      return false;
    }
  };

  return (
    <NfcContext.Provider
      value={{
        isNfcAvailable,
        isScanning,
        lastScannedData,
        startScan,
        stopScan,
        writeData,
      }}
    >
      {children}
    </NfcContext.Provider>
  );
};

export const useNfc = () => {
  const context = useContext(NfcContext);
  if (context === undefined) {
    throw new Error('useNfc must be used within an NfcProvider');
  }
  return context;
};
