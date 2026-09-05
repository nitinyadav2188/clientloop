import React, { useState } from 'react';
import { store } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Check, Mail, MessageSquare, Briefcase, Download } from 'lucide-react';

export default function Settings() {
  const user = store.getUser();
  const { toast } = useToast();
  
  const [name, setName] = useState(user.name);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      store.setUser({ ...user, name });
      setIsSaving(false);
      toast({ title: 'Profile updated', type: 'success' });
    }, 600);
  };

  const handleDownloadData = () => {
    const leads = store.getLeads();
    
    if (leads.length === 0) {
      toast({ title: 'No data to export', type: 'error' });
      return;
    }
    
    const headers = ['ID', 'Name', 'Company', 'Email', 'Project', 'Stage', 'Value (INR)', 'Temperature', 'Source', 'Last Contact', 'Created At'];
    
    const rows = leads.map(lead => [
      lead.id,
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${(lead.company || '').replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${(lead.project || '').replace(/"/g, '""')}"`,
      lead.stage,
      lead.estimated_value,
      lead.temperature,
      lead.source,
      lead.last_contact_at,
      lead.created_at
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `clientloop_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({ title: 'Data exported successfully', type: 'success' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 h-full overflow-y-auto pb-10">
      <div className="flex flex-col gap-1 shrink-0">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Settings</h1>
        <p className="text-muted-foreground font-medium">
          Manage your account, integrations, and <span className="text-primary font-bold">data</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          <Button variant="secondary" className="w-full justify-start font-medium">Profile</Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">Workspace</Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">Integrations</Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">Billing</Button>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email} disabled />
                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
              </div>
              <Button onClick={handleSave} disabled={isSaving || name === user.name}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>You are currently on the {user.plan} plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold uppercase tracking-wider">{user.plan} Plan</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">0/25 leads used</p>
                </div>
                <Button variant="outline">Upgrade</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect your favorite tools.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Create leads from WhatsApp messages.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">Extract leads from messages.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export your leads and client data at any time. You own your data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">Export CSV</p>
                  <p className="text-xs text-muted-foreground">Download all your leads and pipeline data.</p>
                </div>
                <Button variant="outline" onClick={handleDownloadData}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
