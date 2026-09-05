import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProposals } from '@/hooks/useProposals';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Proposal } from '@/types';

interface AddProposalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProposalDialog({ open, onOpenChange }: AddProposalDialogProps) {
  const { addProposal } = useProposals();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project: '',
    client: '',
    amount: 0,
    status: 'draft' as Proposal['status']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.project || !formData.client) return;

    setLoading(true);
    try {
      await addProposal(formData);
      toast({ title: 'Proposal created', type: 'success' });
      onOpenChange(false);
      setFormData({ project: '', client: '', amount: 0, status: 'draft' });
    } catch (error) {
      toast({ title: 'Failed to create proposal', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Proposal</DialogTitle>
          <DialogDescription>Draft a new proposal to send to a client.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="project">Project Title *</Label>
            <Input 
              id="project" 
              required
              value={formData.project} 
              onChange={e => setFormData({ ...formData, project: e.target.value })}
              placeholder="e.g. Website Redesign"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client">Client Name *</Label>
            <Input 
              id="client" 
              required
              value={formData.client} 
              onChange={e => setFormData({ ...formData, client: e.target.value })}
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Proposal Amount (₹)</Label>
            <Input 
              id="amount" 
              type="number"
              min="0"
              value={formData.amount || ''} 
              onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
              placeholder="50000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <select 
              id="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as Proposal['status'] })}
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.project || !formData.client}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
