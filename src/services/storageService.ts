
// Storage keys
const SCAN_HISTORY_KEY = 'nfc_scan_history';
const MAX_HISTORY_ITEMS = 20;

export interface NfcScanRecord {
  id: string;
  timestamp: number;
  data: Record<string, any>;
  type: 'read' | 'write';
}

// Get scan history
export const getScanHistory = (): NfcScanRecord[] => {
  try {
    const history = localStorage.getItem(SCAN_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting scan history:', error);
    return [];
  }
};

// Add scan to history
export const addScanToHistory = (scan: Omit<NfcScanRecord, 'id'>): void => {
  try {
    const history = getScanHistory();
    
    // Create a new record with ID
    const newRecord: NfcScanRecord = {
      ...scan,
      id: generateId(),
    };
    
    // Add to beginning of history array
    const updatedHistory = [newRecord, ...history].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error adding scan to history:', error);
  }
};

// Clear scan history
export const clearScanHistory = (): void => {
  try {
    localStorage.removeItem(SCAN_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing scan history:', error);
  }
};

// Generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
