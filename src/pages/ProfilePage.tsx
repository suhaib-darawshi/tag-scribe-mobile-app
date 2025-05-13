
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <AppLayout title="Profile">
      <div className="py-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <UserRound className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <CardTitle>User Profile</CardTitle>
              <p className="text-sm text-gray-500">Manage your account details</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="text-gray-700">Demo User</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-gray-700">user@example.com</p>
              </div>
              <div>
                <label className="text-sm font-medium">NFC Tags Written</label>
                <p className="text-gray-700">0</p>
              </div>
              <div>
                <label className="text-sm font-medium">NFC Tags Read</label>
                <p className="text-gray-700">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
