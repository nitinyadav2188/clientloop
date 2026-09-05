import sys

with open('src/components/layout/AuthLayout.tsx', 'r') as f:
    content = f.read()

old_add_btn = """<Button onClick={() => navigate('/app/leads?new=true')} className="bg-primary text-[#C8FF2C] hover:bg-primary/90 rounded-full h-12 px-6 text-[12px] font-black tracking-widest uppercase shadow-md">"""
new_add_btn = """<Button onClick={() => navigate('/app/leads?new=true')} className="bg-gradient-to-r from-[#FF3366] to-[#9D4EDD] text-white hover:opacity-90 transition-opacity rounded-full h-12 px-6 text-[12px] font-black tracking-widest uppercase shadow-lg shadow-[#FF3366]/25 border-none">"""

if old_add_btn in content:
    content = content.replace(old_add_btn, new_add_btn)
    with open('src/components/layout/AuthLayout.tsx', 'w') as f:
        f.write(content)
    print("Patched Add Lead button")
else:
    print("Could not find Add Lead button")

