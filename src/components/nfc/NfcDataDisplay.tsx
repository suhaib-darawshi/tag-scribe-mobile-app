
import React from 'react';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface NfcDataDisplayProps {
  data: Record<string, any>;
  timestamp?: number;
  type?: 'read' | 'write';
}

const NfcDataDisplay: React.FC<NfcDataDisplayProps> = ({ 
  data, 
  timestamp, 
  type = 'read' 
}) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card className="p-4 bg-gray-50 text-center">
        <p className="text-gray-500">No data available</p>
      </Card>
    );
  }

  if (data.error) {
    return (
      <Card className="p-4 bg-red-50 border-red-200">
        <p className="text-red-600">{data.error}</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-white card-shadow animate-fade-in">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            {type === 'read' ? 'Scanned Tag Data' : 'Written Tag Data'}
          </h3>
          {timestamp && (
            <span className="text-xs opacity-80">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <dl className="divide-y divide-gray-200">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="py-3">
              <dt className="text-sm font-medium text-gray-500">{key}</dt>
              <dd className="mt-1 text-sm text-gray-900 break-words">
                {typeof value === 'object' 
                  ? JSON.stringify(value) 
                  : String(value)
                }
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
};

export default NfcDataDisplay;
