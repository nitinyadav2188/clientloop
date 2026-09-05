import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

old_hero = """      {/* Hero */}
      <section className="pt-32 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8">
            The client pipeline for freelancers
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.95] mb-8">
            STOP LOSING CLIENTS <br className="hidden md:block"/>
            <span className="text-accent">IN YOUR DMS.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            ClientLoop brings your leads, conversations, follow-ups and proposals into one simple workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => handleLogin()} className="rounded-full px-8 h-14 text-base bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
              Start Free
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base w-full sm:w-auto bg-white/50 backdrop-blur-sm">
              See how it works
            </Button>
          </div>
        </div>
      </section>"""

new_hero = """      {/* Hero */}
      <section className="pt-32 pb-24 px-6 overflow-hidden relative flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#E5E7EB_2px,transparent_2px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F7F2] pointer-events-none z-0"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center mt-10 md:mt-0">
          <div className="inline-flex items-center rounded-full border border-border/80 bg-white/80 backdrop-blur-md px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-10 shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-[#C8FF2C] mr-3 animate-pulse"></span>
            The client pipeline for freelancers
          </div>
          
          <h1 className="text-[3.5rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black tracking-tighter uppercase lg:leading-[0.85] mb-8 text-primary max-w-5xl mx-auto">
            STOP LOSING <br className="hidden sm:block" />
            CLIENTS <span className="inline-block relative whitespace-nowrap mt-2 sm:mt-0">
              <span className="relative z-10 px-2 sm:px-4 text-white">IN YOUR DMS</span>
              <div className="absolute inset-0 bg-accent -z-10 -rotate-2 rounded-2xl scale-110 sm:scale-105 origin-center shadow-lg"></div>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-12 leading-relaxed px-4">
            ClientLoop brings your leads, conversations, follow-ups and proposals into one <strong className="text-primary font-black uppercase tracking-widest text-[11px] sm:text-[13px] bg-white px-2 py-1 rounded-md border border-border mx-1 shadow-sm">simple workspace</strong> designed specifically for freelancers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Button size="lg" onClick={() => handleLogin()} className="rounded-full px-10 h-16 text-[13px] font-black uppercase tracking-widest bg-primary text-[#C8FF2C] hover:bg-primary/90 w-full sm:w-auto shadow-xl hover:-translate-y-1 transition-transform duration-200">
              Start for free
            </Button>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-[13px] font-black uppercase tracking-widest w-full bg-white hover:bg-muted/50 border-2 border-border shadow-sm hover:-translate-y-1 transition-transform duration-200">
                See how it works
              </Button>
            </a>
          </div>
          
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-black text-muted-foreground uppercase tracking-widest">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#F7F7F2] bg-gray-200 overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?img=33" alt="avatar" /></div>
              <div className="w-10 h-10 rounded-full border-2 border-[#F7F7F2] bg-gray-300 overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?img=47" alt="avatar" /></div>
              <div className="w-10 h-10 rounded-full border-2 border-[#F7F7F2] bg-gray-400 overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?img=12" alt="avatar" /></div>
              <div className="w-10 h-10 rounded-full border-2 border-[#F7F7F2] bg-primary text-white flex items-center justify-center text-[10px] shadow-sm z-10">+1k</div>
            </div>
            <p className="mt-2 sm:mt-0">Joined by 1,000+ freelancers</p>
          </div>
        </div>
      </section>"""

if old_hero in content:
    content = content.replace(old_hero, new_hero)
    with open('src/pages/LandingPage.tsx', 'w') as f:
        f.write(content)
    print("Successfully updated landing page hero")
else:
    print("Could not find the old hero snippet!")

