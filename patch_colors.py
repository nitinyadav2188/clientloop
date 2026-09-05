import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

# Replace Hero Backgrounds with vibrant orbs
old_hero_bg = """        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#E5E7EB_2px,transparent_2px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F7F2] pointer-events-none z-0"></div>"""

new_hero_bg = """        {/* Vibrant Ambient Orbs */}
        <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-[#FF3366]/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] bg-[#00E5FF]/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#C8FF2C]/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
        
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#E5E7EB_2px,transparent_2px)] [background-size:32px_32px] opacity-60 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none z-0"></div>"""

if old_hero_bg in content:
    content = content.replace(old_hero_bg, new_hero_bg)
    print("Replaced hero bg")

# Replace "IN YOUR DMS" sticker with vibrant gradient
old_dms_sticker = """<div className="absolute inset-0 bg-accent -z-10 -rotate-2 rounded-2xl scale-105 origin-center shadow-xl"></div>"""
new_dms_sticker = """<div className="absolute inset-0 bg-gradient-to-r from-[#3F46FF] via-[#9D4EDD] to-[#FF3366] -z-10 -rotate-2 rounded-2xl scale-105 origin-center shadow-2xl"></div>"""

if old_dms_sticker in content:
    content = content.replace(old_dms_sticker, new_dms_sticker)
    print("Replaced DMS sticker")

# Make the simple workspace badge more colorful
old_workspace_badge = """<strong className="text-primary font-black uppercase tracking-widest text-[11px] sm:text-[13px] bg-white px-2 py-1 rounded-md border border-border mx-1 shadow-sm">simple workspace</strong>"""
new_workspace_badge = """<strong className="text-white font-black uppercase tracking-widest text-[11px] sm:text-[13px] bg-gradient-to-r from-[#00E5FF] to-[#3F46FF] px-3 py-1.5 rounded-lg mx-1 shadow-md">simple workspace</strong>"""

if old_workspace_badge in content:
    content = content.replace(old_workspace_badge, new_workspace_badge)
    print("Replaced workspace badge")

# Replace primary button on landing page to be more vibrant
old_primary_btn = """<Button size="lg" onClick={() => handleLogin()} className="rounded-full px-10 h-16 text-[13px] font-black uppercase tracking-widest bg-primary text-[#C8FF2C] hover:bg-primary/90 w-full sm:w-auto shadow-xl hover:-translate-y-1 transition-transform duration-200">
              Start for free
            </Button>"""
new_primary_btn = """<Button size="lg" onClick={() => handleLogin()} className="rounded-full px-10 h-16 text-[13px] font-black uppercase tracking-widest bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:opacity-90 w-full sm:w-auto shadow-xl hover:-translate-y-1 hover:shadow-[#FF3366]/25 transition-all duration-200 border-none">
              Start for free
            </Button>"""
if old_primary_btn in content:
    content = content.replace(old_primary_btn, new_primary_btn)
    print("Replaced primary button")

with open('src/pages/LandingPage.tsx', 'w') as f:
    f.write(content)

print("Landing page patching complete")

