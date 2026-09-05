import sys

with open('src/pages/LandingPage.tsx', 'r') as f:
    content = f.read()

old_h1 = """          <h1 className="text-[3.5rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black tracking-tighter uppercase lg:leading-[0.85] mb-8 text-primary max-w-5xl mx-auto">
            STOP LOSING <br className="hidden sm:block" />
            CLIENTS <span className="inline-block relative whitespace-nowrap mt-2 sm:mt-0">
              <span className="relative z-10 px-2 sm:px-4 text-white">IN YOUR DMS</span>
              <div className="absolute inset-0 bg-accent -z-10 -rotate-2 rounded-2xl scale-110 sm:scale-105 origin-center shadow-lg"></div>
            </span>
          </h1>"""

new_h1 = """          <h1 className="text-[3.5rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8rem] font-black tracking-tighter uppercase lg:leading-[0.85] mb-8 text-primary max-w-6xl mx-auto">
            STOP LOSING CLIENTS <br className="hidden sm:block" />
            <span className="inline-block relative whitespace-nowrap mt-4 sm:mt-2">
              <span className="relative z-10 px-4 sm:px-6 text-white">IN YOUR DMS.</span>
              <div className="absolute inset-0 bg-accent -z-10 -rotate-2 rounded-2xl scale-105 origin-center shadow-xl"></div>
            </span>
          </h1>"""

if old_h1 in content:
    content = content.replace(old_h1, new_h1)
    with open('src/pages/LandingPage.tsx', 'w') as f:
        f.write(content)
    print("Successfully updated landing page h1")
else:
    print("Could not find the old h1 snippet!")

