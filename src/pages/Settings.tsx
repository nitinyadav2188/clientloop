import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLeads } from '@/hooks/useLeads';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Check, Mail, MessageSquare, Briefcase, Download, Loader2, CreditCard, Key, Blocks } from 'lucide-react';
import { Lead, Client } from '@/types';

export default function Settings() {
  const { profile, user: authUser, refreshProfile } = useAuth();
  const user = profile || { name: '', plan: 'free', email: '' };
  const { leads } = useLeads();
  const { toast } = useToast();
  
  const [name, setName] = useState(user.name);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'integrations' | 'billing'>('profile');

  const handleSave = async () => {
    setIsSaving(true);
    await updateDoc(doc(db, 'users', authUser!.uid), { name }); 
    await refreshProfile();
    setIsSaving(false);
    toast({ title: "Profile updated", type: "success" });
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadData = async () => {
    if (!authUser) return;
    setIsExporting(true);
    
    try {
      const leadsSnap = await getDocs(collection(db, 'users', authUser.uid, 'leads'));
      const clientsSnap = await getDocs(collection(db, 'users', authUser.uid, 'clients'));
      const leadsData = leadsSnap.docs.map(doc => doc.data() as Lead);
      const clientsData = clientsSnap.docs.map(doc => doc.data() as Client);

      if (leadsData.length === 0 && clientsData.length === 0) {
        toast({ title: 'No data to export', type: 'error' });
        setIsExporting(false);
        return;
      }

      // Generate Leads CSV
      if (leadsData.length > 0) {
        const leadHeaders = ['ID', 'Name', 'Company', 'Email', 'Project', 'Stage', 'Value', 'Temperature', 'Source', 'Last Contact', 'Created At'];
        const leadRows = leadsData.map(lead => [
          lead.id,
          `"${lead.name.replace(/"/g, '""')}"`,
          `"${(lead.company || '').replace(/"/g, '""')}"`,
          `"${(lead.email || '').replace(/"/g, '""')}"`,
          `"${(lead.project || '').replace(/"/g, '""')}"`,
          lead.stage,
          lead.estimated_value || 0,
          lead.temperature,
          lead.source,
          lead.last_contact_at,
          lead.created_at
        ]);
        const leadCsv = [leadHeaders.join(','), ...leadRows.map(row => row.join(','))].join('\n');
        downloadCSV(leadCsv, `clientloop_leads_${new Date().toISOString().split('T')[0]}.csv`);
      }

      // Generate Clients CSV
      if (clientsData.length > 0) {
        const clientHeaders = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Total Revenue', 'Created At'];
        const clientRows = clientsData.map(client => [
          client.id,
          `"${client.name.replace(/"/g, '""')}"`,
          `"${(client.company || '').replace(/"/g, '""')}"`,
          `"${(client.email || '').replace(/"/g, '""')}"`,
          `"${(client.phone || '').replace(/"/g, '""')}"`,
          client.total_revenue || 0,
          client.created_at
        ]);
        const clientCsv = [clientHeaders.join(','), ...clientRows.map(row => row.join(','))].join('\n');
        downloadCSV(clientCsv, `clientloop_clients_${new Date().toISOString().split('T')[0]}.csv`);
      }

      toast({ title: 'Data exported successfully', type: 'success' });
    } catch (error) {
      console.error("Export error", error);
      toast({ title: 'Failed to export data', type: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleAction = (msg: string) => {
    toast({ title: msg, description: "This feature is currently available in the premium add-on tier.", type: "default" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 h-full overflow-y-auto pb-10">
      <div className="flex flex-col gap-1 shrink-0">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Settings</h1>
        <p className="text-muted-foreground font-medium">
          Manage your account, integrations, and <span className="text-primary font-bold">data</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          <Button 
            variant={activeTab === 'profile' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start ${activeTab === 'profile' ? 'font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </Button>
          <Button 
            variant={activeTab === 'workspace' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start ${activeTab === 'workspace' ? 'font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('workspace')}
          >
            Workspace
          </Button>
          <Button 
            variant={activeTab === 'integrations' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start ${activeTab === 'integrations' ? 'font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('integrations')}
          >
            Integrations
          </Button>
          <Button 
            variant={activeTab === 'billing' ? 'secondary' : 'ghost'} 
            className={`w-full justify-start ${activeTab === 'billing' ? 'font-medium' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('billing')}
          >
            Billing
          </Button>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <>
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
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export your leads and client data at any time. You own your data.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">Export CSV</p>
                      <p className="text-xs text-muted-foreground">Download all your leads and pipeline data.</p>
                    </div>
                    <Button variant="outline" onClick={handleDownloadData} disabled={isExporting}>
                      {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                      {isExporting ? 'Exporting...' : 'Download Data'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'workspace' && (
            <Card>
              <CardHeader>
                <CardTitle>Workspace Preferences</CardTitle>
                <CardDescription>Manage your team and defaults.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Workspace Name</Label>
                  <Input defaultValue={`${user.name.split(' ')[0]}'s Workspace`} />
                </div>
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Input defaultValue="INR (₹)" disabled />
                </div>
                <Button onClick={() => handleAction("Workspace updated")}>
                  Save Workspace
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
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
                  <Button variant="outline" size="sm" onClick={() => handleAction("Connecting WhatsApp...")}>Connect</Button>
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
                  <Button variant="outline" size="sm" onClick={() => handleAction("Connecting LinkedIn...")}>Connect</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                      <Blocks className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Zapier</p>
                      <p className="text-xs text-muted-foreground">Connect with 5000+ apps.</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAction("Connecting Zapier...")}>Connect</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>You are currently on the {user.plan} plan.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-muted/30 mb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold uppercase tracking-wider">{user.plan} Plan</span>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{leads.length} leads created</p>
                  </div>
                  <Button onClick={() => handleAction("Opening Upgrade Portal...")}>Upgrade Plan</Button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">Payment Methods</h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">No payment method added</p>
                        <p className="text-xs text-muted-foreground">Add a card to upgrade your plan.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleAction("Adding payment method...")}>Add Card</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
