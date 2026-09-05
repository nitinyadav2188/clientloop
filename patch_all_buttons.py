import sys
import re

def clean_button_classes(file_path, replacements):
    with open(file_path, 'r') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(file_path, 'w') as f:
        f.write(content)

# AuthLayout
auth_replacements = [
    (
        '<Button onClick={() => navigate(\'/app/leads?new=true\')} className="bg-gradient-to-r from-[#FF3366] to-[#9D4EDD] text-white hover:opacity-90 transition-opacity rounded-full h-12 px-6 text-[12px] font-black tracking-widest uppercase shadow-lg shadow-[#FF3366]/25 border-none">',
        '<Button onClick={() => navigate(\'/app/leads?new=true\')} size="lg" className="rounded-full">'
    )
]
clean_button_classes('src/components/layout/AuthLayout.tsx', auth_replacements)

# Dashboard
dash_replacements = [
    (
        '<Button onClick={() => navigate(\'/app/leads?new=true\')} className="flex items-center justify-center gap-2 h-14 bg-gradient-to-r from-[#FF3366] to-[#9D4EDD] text-white rounded-xl hover:opacity-90 border-none shadow-md shadow-[#FF3366]/20 font-bold">',
        '<Button onClick={() => navigate(\'/app/leads?new=true\')} size="lg" className="w-full flex items-center justify-center gap-2 h-14 text-base">'
    ),
    (
        '<Button variant="outline" className="flex items-center justify-center gap-2 h-14 rounded-xl font-bold bg-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors" onClick={() => navigate(\'/app/clients\')}>',
        '<Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2 h-14 text-base" onClick={() => navigate(\'/app/clients\')}>'
    )
]
clean_button_classes('src/pages/Dashboard.tsx', dash_replacements)

# Leads
leads_replacements = [
    (
        '<Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-[#FF3366] to-[#9D4EDD] text-white hover:opacity-90 transition-opacity border-none shadow-md shadow-[#FF3366]/20">',
        '<Button onClick={() => setIsAddModalOpen(true)}>'
    )
]
clean_button_classes('src/pages/Leads.tsx', leads_replacements)

# Clients
clients_replacements = [
    (
        '<Button onClick={() => setIsAddOpen(true)} className="bg-gradient-to-r from-[#00E5FF] to-[#3F46FF] text-white hover:opacity-90 transition-opacity border-none shadow-md shadow-[#00E5FF]/20">',
        '<Button onClick={() => setIsAddOpen(true)}>'
    )
]
clean_button_classes('src/pages/Clients.tsx', clients_replacements)

# LandingPage
landing_replacements = [
    (
        '<Button onClick={() => handleLogin()} className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-12 text-[13px] font-black tracking-widest uppercase shadow-sm">',
        '<Button onClick={() => handleLogin()} className="rounded-full px-8 h-10">'
    ),
    (
        '<Button size="lg" onClick={() => handleLogin()} className="rounded-full px-10 h-16 text-[14px] font-bold tracking-normal bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:opacity-90 w-full sm:w-auto shadow-xl hover:-translate-y-1 hover:shadow-[#FF3366]/25 transition-all duration-200 border-none">',
        '<Button size="lg" onClick={() => handleLogin()} className="rounded-full px-10 h-14 text-base w-full sm:w-auto">'
    ),
    (
        '<Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-[14px] font-bold tracking-normal w-full bg-white hover:bg-muted/50 border border-border shadow-sm hover:-translate-y-1 transition-transform duration-200">',
        '<Button size="lg" variant="outline" onClick={() => document.getElementById(\'how-it-works\')?.scrollIntoView({ behavior: \'smooth\' })} className="rounded-full px-10 h-14 text-base w-full sm:w-auto">'
    ),
    (
        '<a href="#how-it-works" className="w-full sm:w-auto">',
        '<div className="w-full sm:w-auto">'
    ),
    (
        '</a>\n          </div>',
        '</div>\n          </div>'
    ),
    (
        '<Button className="w-full bg-gradient-to-r from-[#3F46FF] to-[#00E5FF] text-white font-bold hover:opacity-90 transition-opacity border-none" onClick={() => handleLogin()}>Start Pro</Button>',
        '<Button className="w-full" onClick={() => handleLogin()}>Start Pro</Button>'
    ),
    (
        '<Button size="lg" className="rounded-full px-12 h-16 text-[16px] font-bold tracking-normal bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:-translate-y-1 hover:shadow-[#FF3366]/25 transition-all duration-200 border-none shadow-xl shadow-[#3F46FF]/20" onClick={() => handleLogin()}>',
        '<Button size="lg" className="rounded-full px-12 h-14 text-base" onClick={() => handleLogin()}>'
    )
]
clean_button_classes('src/pages/LandingPage.tsx', landing_replacements)

print("All buttons patched successfully")
