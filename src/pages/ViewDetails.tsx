
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
  
  // Try to get record from location state first, then from storage
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
      }
    }
  }, [id, record]);

  if (!record) {
    return (
      <AppLayout title="Record Not Found" showBack>
        <div className="py-12 text-center">
          <Tag className="mx-auto h-16 w-16 text-gray-300" />
          <h2 className="mt-4 text-xl font-medium text-gray-700">Record Not Found</h2>
          <p className="mt-2 text-gray-500">
            The NFC record you're looking for could not be found.
          </p>
          <Button 
            className="mt-6" 
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Tag Details" showBack>
      <div className="py-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-medium flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-500" />
              {record.type === 'read' ? 'Scanned' : 'Written'} Tag Details
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(record.timestamp).toLocaleString()}
            </p>
          </div>
          
          {record.type === 'write' && (
            <Button 
              onClick={() => navigate('/write', { 
                state: { initialData: record.data } 
              })}
            >
              Write Again
            </Button>
          )}
        </div>
        
        <NfcDataDisplay 
          data={record.data} 
          timestamp={record.timestamp} 
          type={record.type} 
        />
      </div>
    </AppLayout>
  );
};

export default ViewDetails;
