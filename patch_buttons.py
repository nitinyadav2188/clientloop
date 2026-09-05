import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

# Fix hero CTA button typography
old_hero_btn = """<Button size="lg" onClick={() => handleLogin()} className="rounded-full px-10 h-16 text-[13px] font-black uppercase tracking-widest bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:opacity-90 w-full sm:w-auto shadow-xl hover:-translate-y-1 hover:shadow-[#FF3366]/25 transition-all duration-200 border-none">
              Start for free
            </Button>"""
new_hero_btn = """<Button size="lg" onClick={() => handleLogin()} className="rounded-full px-10 h-16 text-[14px] font-bold tracking-normal bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:opacity-90 w-full sm:w-auto shadow-xl hover:-translate-y-1 hover:shadow-[#FF3366]/25 transition-all duration-200 border-none">
              Start for free
            </Button>"""
if old_hero_btn in content:
    content = content.replace(old_hero_btn, new_hero_btn)

# Fix hero secondary button typography
old_secondary_btn = """<Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-[13px] font-black uppercase tracking-widest w-full bg-white hover:bg-muted/50 border-2 border-border shadow-sm hover:-translate-y-1 transition-transform duration-200">
                See how it works
              </Button>"""
new_secondary_btn = """<Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-[14px] font-bold tracking-normal w-full bg-white hover:bg-muted/50 border border-border shadow-sm hover:-translate-y-1 transition-transform duration-200">
                See how it works
              </Button>"""
if old_secondary_btn in content:
    content = content.replace(old_secondary_btn, new_secondary_btn)

# Fix bottom CTA button typography
old_bottom_cta = """<Button size="lg" className="rounded-full px-12 h-16 text-[14px] font-black tracking-widest uppercase bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:scale-105 transition-transform duration-200 border-none shadow-xl shadow-[#3F46FF]/20" onClick={() => handleLogin()}>
          Start Free Now
        </Button>"""
new_bottom_cta = """<Button size="lg" className="rounded-full px-12 h-16 text-[16px] font-bold tracking-normal bg-gradient-to-r from-[#3F46FF] to-[#FF3366] text-white hover:-translate-y-1 hover:shadow-[#FF3366]/25 transition-all duration-200 border-none shadow-xl shadow-[#3F46FF]/20" onClick={() => handleLogin()}>
          Start Free Now
        </Button>"""
if old_bottom_cta in content:
    content = content.replace(old_bottom_cta, new_bottom_cta)

with open('src/pages/LandingPage.tsx', 'w') as f:
    f.write(content)

print("Landing page buttons patched")

