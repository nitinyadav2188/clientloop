import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { store } from '@/lib/store';
import { Lead } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

const MONTHLY_DATA = [
  { name: 'Jan', revenue: 45000, expenses: 12000 },
  { name: 'Feb', revenue: 52000, expenses: 14000 },
  { name: 'Mar', revenue: 38000, expenses: 11000 },
  { name: 'Apr', revenue: 65000, expenses: 15000 },
  { name: 'May', revenue: 84000, expenses: 18000 },
  { name: 'Jun', revenue: 72000, expenses: 16000 },
  { name: 'Jul', revenue: 95000, expenses: 19000 },
];

export default function Revenue() {
  const [leads, setLeads] = React.useState<Lead[]>([]);

  React.useEffect(() => {
    setLeads(store.getLeads());
  }, []);

  const pipelineData = useMemo(() => {
    const stages = [
      { id: 'lead', name: 'Lead', color: '#9CA3AF' },
      { id: 'contacted', name: 'Contacted', color: '#3F46FF' },
      { id: 'meeting', name: 'Meeting', color: '#111111' },
      { id: 'proposal', name: 'Proposal', color: '#C8FF2C' },
      { id: 'negotiation', name: 'Negotiation', color: '#F59E0B' }
    ];

    return stages.map(stage => {
      const stageLeads = leads.filter(l => l.stage === stage.id && l.status === 'active');
      const value = stageLeads.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0);
      return {
        name: stage.name,
        value,
        count: stageLeads.length,
        color: stage.color
      };
    }).filter(d => d.count > 0);
  }, [leads]);

  const wonRevenue = leads
    .filter(l => l.stage === 'won')
    .reduce((sum, lead) => sum + (lead.estimated_value || 0), 0);

  const totalPipeline = pipelineData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-1 shrink-0">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Revenue Overview</h1>
        <p className="text-muted-foreground font-medium">
          Track your <span className="text-primary font-bold">financial health</span> and pipeline value.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        <div className="bg-card border border-border p-5 rounded-2xl">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">YTD Revenue</p>
          <p className="text-3xl font-black">₹4.5L</p>
          <div className="mt-2 flex items-center gap-1 text-accent font-bold text-xs">
            <ArrowUpRight className="w-3 h-3" />
            <span>24% from last year</span>
          </div>
        </div>
        <div className="bg-card border border-border p-5 rounded-2xl">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Active Pipeline</p>
          <p className="text-3xl font-black">{formatCurrency(totalPipeline)}</p>
          <div className="mt-2 flex items-center gap-1 text-muted-foreground font-bold text-xs">
            <span>Across {pipelineData.reduce((sum, d) => sum + d.count, 0)} deals</span>
          </div>
        </div>
        <div className="bg-accent-lime/10 border border-accent-lime p-5 rounded-2xl">
          <p className="text-[10px] text-primary uppercase tracking-widest font-black mb-1">Recent Wins</p>
          <p className="text-3xl font-black text-accent">{formatCurrency(wonRevenue)}</p>
          <div className="mt-2 flex items-center gap-1 text-primary font-bold text-xs">
            <span>In the last 30 days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0 pb-10">
        <div className="lg:col-span-2 bg-card border border-border p-5 rounded-2xl flex flex-col min-h-[400px]">
          <h3 className="text-lg font-black tracking-tight uppercase mb-6">Monthly Revenue</h3>
          <div className="flex-1 w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 700, fill: '#6B7280' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 700, fill: '#6B7280' }}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#F7F7F2' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #E5E7EB',
                    boxShadow: '4px 4px 0px 0px rgba(17,17,17,1)',
                    fontWeight: 'bold',
                    color: '#111111'
                  }}
                  itemStyle={{ color: '#111111', fontWeight: 'bold' }}
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#111111" radius={[4, 4, 0, 0]} name="Revenue" maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl flex flex-col min-h-[400px]">
          <h3 className="text-lg font-black tracking-tight uppercase mb-6">Pipeline by Stage</h3>
          <div className="flex-1 w-full h-full min-h-[300px] flex items-center justify-center">
            {pipelineData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: '1px solid #E5E7EB',
                      boxShadow: '4px 4px 0px 0px rgba(17,17,17,1)',
                      fontWeight: 'bold',
                      color: '#111111'
                    }}
                    itemStyle={{ color: '#111111', fontWeight: 'bold' }}
                    formatter={(value: number) => [formatCurrency(value), 'Value']}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-xs font-bold text-primary ml-1">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <span className="text-2xl">🤷‍♂️</span>
                </div>
                <p className="font-bold">No active deals</p>
                <p className="text-xs mt-1">Add deals to your pipeline to see data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
