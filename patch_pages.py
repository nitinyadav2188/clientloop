import sys

# Leads
with open('src/pages/Leads.tsx', 'r') as f:
    content = f.read()

old_add_btn = """<Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>"""
new_add_btn = """<Button onClick={() => setIsAddOpen(true)} className="bg-gradient-to-r from-[#FF3366] to-[#9D4EDD] text-white hover:opacity-90 transition-opacity border-none shadow-md shadow-[#FF3366]/20">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>"""
if old_add_btn in content:
    content = content.replace(old_add_btn, new_add_btn)

old_badge_hot = """<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">"""
new_badge_hot = """<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#FF3366]/10 text-[#FF3366]">"""
if old_badge_hot in content:
    content = content.replace(old_badge_hot, new_badge_hot)

old_badge_warm = """<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">"""
new_badge_warm = """<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#FF9933]/10 text-[#FF9933]">"""
if old_badge_warm in content:
    content = content.replace(old_badge_warm, new_badge_warm)

old_badge_cold = """<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">"""
new_badge_cold = """<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#00E5FF]/10 text-[#00E5FF]">"""
if old_badge_cold in content:
    content = content.replace(old_badge_cold, new_badge_cold)

with open('src/pages/Leads.tsx', 'w') as f:
    f.write(content)

# Clients
with open('src/pages/Clients.tsx', 'r') as f:
    content = f.read()

old_client_btn = """<Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>"""
new_client_btn = """<Button onClick={() => setIsAddOpen(true)} className="bg-gradient-to-r from-[#00E5FF] to-[#3F46FF] text-white hover:opacity-90 transition-opacity border-none shadow-md shadow-[#00E5FF]/20">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>"""
if old_client_btn in content:
    content = content.replace(old_client_btn, new_client_btn)

with open('src/pages/Clients.tsx', 'w') as f:
    f.write(content)

print("Pages patched")

