
import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import NfcDataDisplay from '@/components/nfc/NfcDataDisplay';
import { Button } from '@/components/ui/button';
import { NfcScanRecord, getScanHistory } from '@/services/storageService';
import { FileText, Tag } from 'lucide-react';

const ViewDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Default sample data for testing
  const defaultRecord: NfcScanRecord = {
    id: 'default-sample',
    timestamp: Date.now() - 120000, // 2 minutes ago
    data: {
      employeeId: 'EMP123',
      name: 'Jane Doe',
      department: 'Operations',
      accessLevel: 'Level 2',
      cardType: 'Employee Badge',
      location: 'Main Building - Floor 3'
    },
    type: 'read'
  };
  
  // Try to get record from location state first, then from storage, finally use default
  const [record, setRecord] = React.useState<NfcScanRecord | null>(
    location.state?.record || null
  );

  React.useEffect(() => {
    if (!record && id) {
      // If no record in location state, try to find it in history
      const history = getScanHistory();
      const foundRecord = history.find(item => item.id === id);
      if (foundRecord) {
        setRecord(foundRecord);
      } else {
        // Use default data if no record found
        setRecord(defaultRecord);
      }
    } else if (!record) {
      // Use default data if no record at all
      setRecord(defaultRecord);
    }
  }, [id, record]);

  const displayRecord = record || defaultRecord;

  return (
    <AppLayout title="Tag Details" showBack>
      <div className="py-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-medium flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-500" />
              {displayRecord.type === 'read' ? 'Scanned' : 'Written'} Tag Details
              {!record && (
                <span className="ml-2 text-sm text-gray-500 font-normal">(Sample Data)</span>
              )}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(displayRecord.timestamp).toLocaleString()}
            </p>
          </div>
          
          {displayRecord.type === 'write' && (
            <Button 
              onClick={() => navigate('/write', { 
                state: { initialData: displayRecord.data } 
              })}
            >
              Write Again
            </Button>
          )}
        </div>
        
        <NfcDataDisplay 
          data={displayRecord.data} 
          timestamp={displayRecord.timestamp} 
          type={displayRecord.type} 
        />
      </div>
    </AppLayout>
  );
};

export default ViewDetails;
