
import React from 'react';
import { NfcScanRecord, getScanHistory, clearScanHistory } from '@/services/storageService';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, History, Save, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NfcScanHistory: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = React.useState<NfcScanRecord[]>([]);

  React.useEffect(() => {
    setHistory(getScanHistory());
  }, []);

  const handleClearHistory = () => {
    clearScanHistory();
    setHistory([]);
  };

  const handleViewDetails = (record: NfcScanRecord) => {
    navigate(`/view/${record.id}`, { state: { record } });
  };

  if (history.length === 0) {
    return (
      <Card className="mt-6 bg-gray-50">
        <CardContent className="pt-6 text-center text-gray-500">
          <History className="mx-auto h-10 w-10 opacity-30" />
          <p className="mt-2">No scan history yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Recent Scans</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="text-red-500 border-red-200"
          onClick={handleClearHistory}
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Clear
        </Button>
      </div>
      
      {history.map((record) => (
        <Card 
          key={record.id} 
          className={`
            overflow-hidden
            ${record.type === 'read' ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-green-500'}
          `}
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium flex items-center">
                {record.type === 'read' ? (
                  <Eye className="h-4 w-4 mr-2 text-blue-500" />
                ) : (
                  <Save className="h-4 w-4 mr-2 text-green-500" />
                )}
                {record.type === 'read' ? 'Read' : 'Write'} Operation
              </CardTitle>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(record.timestamp, { addSuffix: true })}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-sm text-gray-700">
              {Object.keys(record.data).length > 0 ? (
                <div className="truncate">
                  Fields: {Object.keys(record.data).join(', ')}
                </div>
              ) : (
                <div className="text-gray-500 italic">No data</div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-2 bg-gray-50 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-500"
              onClick={() => handleViewDetails(record)}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default NfcScanHistory;
