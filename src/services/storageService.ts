
// Storage keys
const SCAN_HISTORY_KEY = 'nfc_scan_history';
const MAX_HISTORY_ITEMS = 20;

export interface NfcScanRecord {
  id: string;
  timestamp: number;
  data: Record<string, any>;
  type: 'read' | 'write';
}

// Initialize with sample data if no history exists
const initializeSampleData = (): void => {
  const existing = localStorage.getItem(SCAN_HISTORY_KEY);
  if (!existing) {
    const sampleData: NfcScanRecord[] = [
      {
        id: 'sample1',
        timestamp: Date.now() - 300000, // 5 minutes ago
        data: {
          id: 'EMP001',
          name: 'John Smith',
          department: 'Engineering',
          accessLevel: 'Level 3'
        },
        type: 'read'
      },
      {
        id: 'sample2',
        timestamp: Date.now() - 600000, // 10 minutes ago
        data: {
          id: 'EMP002',
          name: 'Sarah Johnson',
          department: 'Marketing',
          accessLevel: 'Level 2'
        },
        type: 'read'
      },
      {
        id: 'sample3',
        timestamp: Date.now() - 900000, // 15 minutes ago
        data: {
          id: 'ASSET001',
          type: 'Equipment',
          location: 'Building A - Floor 2',
          status: 'Active'
        },
        type: 'write'
      },
      {
        id: 'sample4',
        timestamp: Date.now() - 1200000, // 20 minutes ago
        data: {
          url: 'https://company.com/product/123',
          productId: 'PROD123',
          category: 'Electronics'
        },
        type: 'read'
      }
    ];
    
    localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(sampleData));
  }
};

// Get scan history
export const getScanHistory = (): NfcScanRecord[] => {
  try {
    // Initialize sample data if needed
    initializeSampleData();
    
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
