import sys

with open('src/pages/Dashboard.tsx', 'r') as f:
    content = f.read()

# Make welcome text gradient
old_h1 = """<h1 className="text-4xl font-black tracking-tighter uppercase">Welcome back, {user?.name?.split(' ')[0]}!</h1>"""
new_h1 = """<h1 className="text-4xl font-black tracking-tighter uppercase"><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3366] via-[#9D4EDD] to-[#00E5FF]">Welcome back, {user?.name?.split(' ')[0]}!</span></h1>"""

if old_h1 in content:
    content = content.replace(old_h1, new_h1)

# Add gradients to metric cards
old_metrics = """        <Card className="p-6 bg-card border border-border shadow-sm rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-muted-foreground font-black tracking-widest uppercase mb-2">Total Leads</div>
          <div className="text-4xl font-black">{metrics.totalLeads}</div>
        </Card>
        
        <Card className="p-6 bg-accent-lime/10 border border-accent-lime rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
            <TrendingUp className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-primary font-black tracking-widest uppercase mb-2">Win Rate</div>
          <div className="text-4xl font-black text-accent">{metrics.winRate}%</div>
        </Card>

        <Card className="p-6 bg-card border border-border shadow-sm rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <IndianRupee className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-muted-foreground font-black tracking-widest uppercase mb-2">Pipeline Value</div>
          <div className="text-4xl font-black">{formatCurrency(metrics.pipelineValue)}</div>
        </Card>"""
        
new_metrics = """        <Card className="p-6 bg-gradient-to-br from-[#FF3366]/10 to-transparent border border-[#FF3366]/20 shadow-sm rounded-2xl relative overflow-hidden group hover:border-[#FF3366]/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity text-[#FF3366]">
            <Users className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-[#FF3366] font-black tracking-widest uppercase mb-2">Total Leads</div>
          <div className="text-4xl font-black">{metrics.totalLeads}</div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/20 rounded-2xl relative overflow-hidden group hover:border-[#00E5FF]/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity text-[#00E5FF]">
            <TrendingUp className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-[#00E5FF] font-black tracking-widest uppercase mb-2">Win Rate</div>
          <div className="text-4xl font-black text-accent">{metrics.winRate}%</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-[#9D4EDD]/10 to-transparent border border-[#9D4EDD]/20 shadow-sm rounded-2xl relative overflow-hidden group hover:border-[#9D4EDD]/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity text-[#9D4EDD]">
            <IndianRupee className="w-16 h-16" />
          </div>
          <div className="text-[10px] text-[#9D4EDD] font-black tracking-widest uppercase mb-2">Pipeline Value</div>
          <div className="text-4xl font-black">{formatCurrency(metrics.pipelineValue)}</div>
        </Card>"""
        
if old_metrics in content:
    content = content.replace(old_metrics, new_metrics)
    
# Quick actions
old_add_btn = """<Button onClick={() => navigate('/app/leads?new=true')} className="flex items-center justify-center gap-2 h-14 bg-primary text-white rounded-xl hover:bg-primary/90 font-bold">"""
new_add_btn = """<Button onClick={() => navigate('/app/leads?new=true')} className="flex items-center justify-center gap-2 h-14 bg-gradient-to-r from-[#FF3366] to-[#9D4EDD] text-white rounded-xl hover:opacity-90 border-none shadow-md shadow-[#FF3366]/20 font-bold">"""

old_invoice_btn = """<Button variant="outline" className="flex items-center justify-center gap-2 h-14 rounded-xl font-bold bg-white" onClick={() => navigate('/app/clients')}>"""
new_invoice_btn = """<Button variant="outline" className="flex items-center justify-center gap-2 h-14 rounded-xl font-bold bg-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors" onClick={() => navigate('/app/clients')}>"""

if old_add_btn in content:
    content = content.replace(old_add_btn, new_add_btn)
if old_invoice_btn in content:
    content = content.replace(old_invoice_btn, new_invoice_btn)

with open('src/pages/Dashboard.tsx', 'w') as f:
    f.write(content)
print("Dashboard patched")
