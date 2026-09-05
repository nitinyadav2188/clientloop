import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

# Replace "How it works" numbers
old_step1 = """<div className="w-12 h-12 bg-primary text-[#C8FF2C] rounded-xl flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-primary/20">1</div>"""
new_step1 = """<div className="w-12 h-12 bg-gradient-to-br from-[#FF3366] to-[#FF9933] text-white rounded-xl flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-[#FF3366]/20">1</div>"""

old_step2 = """<div className="w-12 h-12 bg-primary text-[#C8FF2C] rounded-xl flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-primary/20">2</div>"""
new_step2 = """<div className="w-12 h-12 bg-gradient-to-br from-[#00E5FF] to-[#3F46FF] text-white rounded-xl flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-[#00E5FF]/20">2</div>"""

old_step3 = """<div className="w-12 h-12 bg-primary text-[#C8FF2C] rounded-xl flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-primary/20">3</div>"""
new_step3 = """<div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#FF3366] text-white rounded-xl flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-[#9D4EDD]/20">3</div>"""

if old_step1 in content:
    content = content.replace(old_step1, new_step1)
if old_step2 in content:
    content = content.replace(old_step2, new_step2)
if old_step3 in content:
    content = content.replace(old_step3, new_step3)
print("Replaced how it works steps")

# Replace Pricing card
old_pricing_card = """<Card className="p-8 border-2 border-primary shadow-xl flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 text-xs font-bold tracking-wider rounded-full uppercase">
                Recommended
              </div>"""
new_pricing_card = """<Card className="p-8 border-2 border-[#3F46FF] shadow-2xl shadow-[#3F46FF]/10 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#3F46FF] to-[#00E5FF] text-white px-4 py-1.5 text-[10px] font-black tracking-widest rounded-full uppercase shadow-md">
                Recommended
              </div>"""
if old_pricing_card in content:
    content = content.replace(old_pricing_card, new_pricing_card)
    print("Replaced pricing card")
    
old_pro_btn = """<Button className="w-full bg-primary text-white" onClick={() => handleLogin()}>Start Pro</Button>"""
new_pro_btn = """<Button className="w-full bg-gradient-to-r from-[#3F46FF] to-[#00E5FF] text-white font-bold hover:opacity-90 transition-opacity border-none" onClick={() => handleLogin()}>Start Pro</Button>"""
if old_pro_btn in content:
    content = content.replace(old_pro_btn, new_pro_btn)
    
old_cta_btn = """<Button size="lg" className="rounded-full px-12 h-16 text-lg bg-primary text-white hover:bg-primary/90" onClick={() => handleLogin()}>
          Start Free Now
        </Button>"""
new_cta_btn = """<Button size="lg" className="rounded-full px-12 h-16 text-[14px] font-black tracking-widest uppercase bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:scale-105 transition-transform duration-200 border-none shadow-xl shadow-[#3F46FF]/20" onClick={() => handleLogin()}>
          Start Free Now
        </Button>"""
if old_cta_btn in content:
    content = content.replace(old_cta_btn, new_cta_btn)

with open('src/pages/LandingPage.tsx', 'w') as f:
    f.write(content)

print("Landing page patching complete")

