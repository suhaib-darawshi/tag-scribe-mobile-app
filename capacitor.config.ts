
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c1e2965ae8984d4a9cca9399a9a14119',
  appName: 'NFC Reader Writer',
  webDir: 'dist',
  server: {
    url: 'https://c1e2965a-e898-4d4a-9cca-9399a9a14119.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorNFC: {
      shouldConnectOnStart: false,
      shouldAutoStart: false,
    }
  }
};

export default config;
