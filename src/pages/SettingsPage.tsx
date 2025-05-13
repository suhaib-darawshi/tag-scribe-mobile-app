
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const SettingsPage: React.FC = () => {
  return (
    <AppLayout title="Settings">
      <div className="py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
            <CardDescription>Configure your NFC application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="nfc-notifications" className="font-medium">NFC Notifications</Label>
                <p className="text-sm text-gray-500">Get notified when an NFC tag is detected</p>
              </div>
              <Switch id="nfc-notifications" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                <p className="text-sm text-gray-500">Toggle dark mode theme</p>
              </div>
              <Switch id="dark-mode" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="save-history" className="font-medium">Save History</Label>
                <p className="text-sm text-gray-500">Automatically save NFC scan history</p>
              </div>
              <Switch id="save-history" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Application information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">Version</p>
              <p className="text-sm text-gray-500">1.0.0</p>
            </div>
            <div>
              <p className="text-sm font-medium">Developer</p>
              <p className="text-sm text-gray-500">NFC App Team</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
