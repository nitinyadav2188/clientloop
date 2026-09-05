import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

old_footer = """      {/* Footer */}
      <footer className="bg-primary text-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg leading-none">C</span>
              </div>
              <span className="font-bold text-xl tracking-tight">ClientLoop</span>
            </div>
            <p className="text-white/60 mb-6">Turn conversations into clients.</p>
            <div className="text-white/40 text-sm">
              Built by Nitin Yadav
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-semibold mb-4 text-white/80">Product</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white/80">Legal</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>"""

new_footer = """      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 px-6 border-t border-white/10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#FF3366]/50 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-lg h-24 bg-[#FF3366]/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16 relative z-10">
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3F46FF] to-[#FF3366] p-[2px]">
                <div className="w-full h-full bg-[#0A0A0A] rounded-[10px] flex items-center justify-center">
                  <span className="text-white font-black text-xl leading-none">C</span>
                </div>
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">ClientLoop</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm font-medium">
              The modern CRM built specifically for freelancers and independent consultants. Turn scattered conversations into booked clients and closed deals.
            </p>
            <div className="flex items-center gap-4">
              {/* Social links */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00E5FF] hover:bg-white/10 hover:border-[#00E5FF]/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FF3366] hover:bg-white/10 hover:border-[#FF3366]/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
          
          {/* Links Col 1 */}
          <div className="md:col-span-2 lg:col-span-2 lg:col-start-7">
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              <li><a href="#features" className="hover:text-[#00E5FF] transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-[#00E5FF] transition-colors">How it works</a></li>
              <li><a href="#pricing" className="hover:text-[#00E5FF] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              <li><a href="#founder" className="hover:text-[#FF3366] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#FF3366] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF3366] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF3366] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              <li><a href="#" className="hover:text-[#9D4EDD] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#9D4EDD] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#9D4EDD] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-white/40 text-sm font-medium">
            © {new Date().getFullYear()} ClientLoop. Built by <span className="text-white/60 font-bold hover:text-white transition-colors cursor-pointer">Nitin Yadav</span>.
          </p>
          <div className="flex items-center gap-2 text-sm font-bold text-white/40">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></div>
            All systems operational
          </div>
        </div>
      </footer>"""

if old_footer in content:
    content = content.replace(old_footer, new_footer)
else:
    print("Old footer not found")
    sys.exit(1)

with open('src/pages/LandingPage.tsx', 'w') as f:
    f.write(content)
print("Footer patched successfully")
