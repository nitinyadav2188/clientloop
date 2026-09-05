import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

export default function Proposals() {
  const [proposals] = useState([
    { id: 'prop-1', client: 'Rahul Sharma', project: 'Website Redesign', amount: 45000, status: 'sent', date: '2023-11-01' },
    { id: 'prop-2', client: 'Sarah Jenkins', project: 'Mobile App UI', amount: 80000, status: 'draft', date: '2023-11-03' },
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proposals</h1>
          <p className="text-muted-foreground text-sm">Create and track your client proposals.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Proposal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Drafts</div>
          <div className="text-2xl font-bold">1</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Sent</div>
          <div className="text-2xl font-bold">1</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Accepted</div>
          <div className="text-2xl font-bold text-accent-lime drop-shadow-sm">0</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Value (Sent)</div>
          <div className="text-2xl font-bold">₹45,000</div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search proposals..." className="pl-9" />
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm flex-1 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
            <tr>
              <th className="px-4 py-3 font-medium">Proposal</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {proposals.map((prop) => (
              <tr key={prop.id} className="hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-3 font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  {prop.project}
                </td>
                <td className="px-4 py-3">{prop.client}</td>
                <td className="px-4 py-3 font-medium">{formatCurrency(prop.amount)}</td>
                <td className="px-4 py-3 text-muted-foreground">{prop.date}</td>
                <td className="px-4 py-3">
                  <Badge variant={prop.status === 'sent' ? 'info' : 'outline'}>{prop.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
