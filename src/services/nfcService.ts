
import { toast } from 'sonner';

// Mock NFC capabilities for web preview
// In a real app with Capacitor, we'd use the actual Capacitor plugins

// Get NFC plugin (mock version for web preview)
const getNfcPlugin = async () => {
  // In a real app, this would use Capacitor's plugin system
  // const { CapacitorNFC } = Plugins;
  return {
    isEnabled: async () => ({ isEnabled: true }),
    startScanSession: async () => console.log('NFC scan session started (mock)'),
    stopScanSession: async () => console.log('NFC scan session stopped (mock)'),
    write: async (data: any) => console.log('Write to NFC tag (mock):', data)
  };
};

// Check if NFC is available
export const checkNfcAvailability = async (): Promise<boolean> => {
  try {
    const nfc = await getNfcPlugin();
    const result = await nfc.isEnabled();
    return result.isEnabled;
  } catch (error) {
    console.error('NFC availability check failed:', error);
    return false;
  }
};

// Start NFC listener
export const startNfcListener = async () => {
  try {
    const nfc = await getNfcPlugin();
    await nfc.startScanSession();
    console.log('NFC scan session started');
    return true;
  } catch (error) {
    console.error('Failed to start NFC scan session:', error);
    toast.error('Failed to start NFC scanning');
    return false;
  }
};

// Stop NFC listener
export const stopNfcListener = async () => {
  try {
    const nfc = await getNfcPlugin();
    await nfc.stopScanSession();
    console.log('NFC scan session stopped');
    return true;
  } catch (error) {
    console.error('Failed to stop NFC scan session:', error);
    return false;
  }
};

// Register event listeners
export const registerNfcListeners = (
  onNfcDetected: (tagData: any) => void,
  onError: (error: any) => void
) => {
  // In web preview, simulate NFC tag detection with a button click
  document.addEventListener('simulateNfcScan', (event: any) => {
    console.log('Simulated NFC tag detected');
    onNfcDetected({
      message: {
        records: [
          {
            type: 'text/plain',
            payload: JSON.stringify({ name: "Sample Tag", id: "123456", info: "This is a simulated NFC tag" })
          }
        ]
      }
    });
  });

  // Real NFC event listeners would be set up here in a real app
  document.addEventListener('nfcTagDetected', (event: any) => {
    console.log('NFC tag detected:', event.detail);
    onNfcDetected(event.detail);
  });

  document.addEventListener('nfcError', (event: any) => {
    console.error('NFC error:', event.detail);
    onError(event.detail);
  });
};

// Write data to NFC tag
export const writeToNfcTag = async (data: Record<string, any>): Promise<boolean> => {
  try {
    const nfc = await getNfcPlugin();
    
    // Convert data object to NDEF message format
    const textRecord = {
      id: [],
      payload: JSON.stringify(data),
      type: "text/plain",
      typeCategory: "NfcTextTypeCategory",
    };
    
    await nfc.write({ message: { records: [textRecord] } });
    console.log('Data written to NFC tag:', data);
    toast.success('Data successfully written to NFC tag');
    return true;
  } catch (error) {
    console.error('Error writing to NFC tag:', error);
    toast.error('Failed to write data to NFC tag');
    return false;
  }
};

// Parse NFC tag data
export const parseNfcData = (tagData: any): Record<string, any> => {
  try {
    if (!tagData || !tagData.message || !tagData.message.records) {
      return { error: 'Invalid tag data format' };
    }

    const records = tagData.message.records;
    for (const record of records) {
      if (record.type === 'text/plain' && record.payload) {
        try {
          return JSON.parse(record.payload);
        } catch (e) {
          return { text: record.payload };
        }
      }
    }
    
    return { error: 'No readable data found' };
  } catch (error) {
    console.error('Error parsing NFC data:', error);
    return { error: 'Failed to parse tag data' };
  }
};
