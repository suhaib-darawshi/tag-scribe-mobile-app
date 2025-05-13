
/// <reference types="vite/client" />

// Define the Capacitor NFC plugin interface for TypeScript
interface CapacitorNFCPlugin {
  isEnabled(): Promise<{ isEnabled: boolean }>;
  startScanSession(): Promise<void>;
  stopScanSession(): Promise<void>;
  write(options: { message: { records: Array<any> } }): Promise<void>;
}

interface CapacitorPlugins {
  CapacitorNFC?: CapacitorNFCPlugin;
}

interface Window {
  Capacitor?: {
    Plugins: CapacitorPlugins;
  };
}
