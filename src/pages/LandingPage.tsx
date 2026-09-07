import { useAuth } from "@/contexts/AuthContext";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowDown, ArrowRight, MessageSquare, Briefcase, Mail, Columns, Brain, Calendar, FileText, PieChart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/app');
    } catch (e: any) {
      if (e?.code === 'auth/popup-closed-by-user' || e?.code === 'auth/cancelled-popup-request') {
        // User intentionally closed the popup, no need to show an error
        return;
      }
      console.error(e);
      toast({
        title: "Login Interrupted",
        description: "If the popup was blocked or failed, please try opening the app in a new tab (top right corner).",
        type: "error"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#111111] font-sans selection:bg-[#C8FF2C] selection:text-black">
      {/* Navigation */}
      <nav className="border-b border-border bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 bg-[#C8FF2C] rounded-sm rotate-45"></div>
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">ClientLoop</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[13px] font-black tracking-widest text-muted-foreground uppercase">
            <a href="#product" className="hover:text-primary transition-colors">Product</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#founder" className="hover:text-primary transition-colors">About</a>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/app" className="text-[13px] font-black tracking-widest uppercase hover:text-primary hidden sm:block">Sign In</Link>
            <Button onClick={() => handleLogin()} className="rounded-full px-8 h-10">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 overflow-hidden relative flex flex-col items-center justify-center min-h-[90vh]">
        {/* Vibrant Ambient Orbs */}
        <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-[#FF3366]/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] bg-[#00E5FF]/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#C8FF2C]/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
        
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#E5E7EB_2px,transparent_2px)] [background-size:32px_32px] opacity-60 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none z-0"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center mt-10 md:mt-0">
          <div className="inline-flex items-center rounded-full border border-border/80 bg-white/80 backdrop-blur-md px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-10 shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-[#C8FF2C] mr-3 animate-pulse"></span>
            The client pipeline for freelancers
          </div>
          
          <h1 className="text-[3.5rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8rem] font-black tracking-tighter uppercase lg:leading-[0.85] mb-8 text-primary max-w-6xl mx-auto">
            STOP LOSING CLIENTS <br className="hidden sm:block" />
            <span className="inline-block relative whitespace-nowrap mt-4 sm:mt-2">
              <span className="relative z-10 px-4 sm:px-6 text-white">IN YOUR DMS.</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3F46FF] via-[#9D4EDD] to-[#FF3366] -z-10 -rotate-2 rounded-2xl scale-105 origin-center shadow-2xl"></div>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-12 leading-relaxed px-4">
            ClientLoop brings your leads, conversations, follow-ups and proposals into one <strong className="text-white font-black uppercase tracking-widest text-[11px] sm:text-[13px] bg-gradient-to-r from-[#00E5FF] to-[#3F46FF] px-3 py-1.5 rounded-lg mx-1 shadow-md">simple workspace</strong> designed specifically for freelancers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Button size="lg" onClick={() => handleLogin()} className="rounded-full px-10 h-14 text-base w-full sm:w-auto">
              Start for free
            </Button>
            <div className="w-full sm:w-auto">
              <Button size="lg" variant="outline" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full px-10 h-14 text-base w-full sm:w-auto">
                See how it works
              </Button>
            </div>
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
      </section>

      {/* Dashboard Preview / Mockup */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto relative">
          
          <div className="absolute -top-5 right-4 md:-right-8 z-20">
            <div className="bg-white px-5 py-3 rounded-full shadow-lg border border-border flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-accent-lime"></div>
              <span className="text-sm font-bold tracking-tight">Follow up with Rahul today</span>
            </div>
          </div>
          
          <div className="absolute top-1/4 -left-4 md:-left-12 z-20">
            <div className="bg-white px-5 py-3 rounded-full shadow-lg border border-border flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              <span className="text-sm font-bold tracking-tight">₹45,000 proposal waiting</span>
            </div>
          </div>

          <div className="rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-background relative z-10 aspect-[16/10] sm:aspect-[16/9] ring-1 ring-border">
            {/* Mock Header */}
            <div className="h-12 border-b flex items-center px-4 bg-muted/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            {/* Mock Body */}
            <div className="flex h-[calc(100%-3rem)] bg-[#FDFDFD]">
              {/* Sidebar */}
              <div className="w-56 border-r border-border bg-white p-6 hidden md:block">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">C</div>
                  <span className="font-bold text-sm tracking-tight">ClientLoop</span>
                </div>
                <div className="space-y-1">
                  <div className="px-3 py-2 bg-secondary/50 rounded-lg text-sm font-semibold flex items-center gap-2 text-primary">
                    <Columns className="w-4 h-4" /> Pipeline
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground flex items-center gap-2 hover:bg-muted/30 rounded-lg transition-colors cursor-pointer">
                    <FileText className="w-4 h-4" /> Proposals
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground flex items-center gap-2 hover:bg-muted/30 rounded-lg transition-colors cursor-pointer">
                    <Briefcase className="w-4 h-4" /> Clients
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground flex items-center gap-2 hover:bg-muted/30 rounded-lg transition-colors cursor-pointer">
                    <PieChart className="w-4 h-4" /> Analytics
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6 md:p-8 bg-[#F9FAFB] flex flex-col gap-6 overflow-hidden">
                <div className="flex gap-4 md:gap-6">
                  <div className="flex-1 bg-white border border-border rounded-2xl shadow-sm p-4 flex flex-col justify-between h-28">
                    <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Active Leads</div>
                    <div>
                      <div className="text-3xl font-black text-primary">12</div>
                      <div className="text-xs text-muted-foreground mt-1"><span className="text-green-500 font-medium">+2</span> this week</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-border rounded-2xl shadow-sm p-4 flex flex-col justify-between h-28 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-lime/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase relative z-10">Pipeline Value</div>
                    <div className="relative z-10">
                      <div className="text-3xl font-black text-primary drop-shadow-sm">₹1.2M</div>
                      <div className="text-xs text-muted-foreground mt-1">Across 4 prospects</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-border rounded-2xl shadow-sm p-4 hidden sm:flex flex-col justify-between h-28">
                    <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Win Rate</div>
                    <div>
                      <div className="text-3xl font-black text-primary">68%</div>
                      <div className="text-xs text-muted-foreground mt-1"><span className="text-green-500 font-medium">+5%</span> vs last month</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 bg-white border border-border rounded-2xl shadow-sm p-4 flex gap-5 overflow-hidden">
                  <div className="w-1/3 bg-[#F9FAFB] rounded-xl p-3 flex flex-col gap-3">
                    <div className="text-[10px] font-bold text-muted-foreground tracking-widest flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      NEW LEADS <span className="ml-auto bg-muted/50 text-[10px] px-1.5 rounded text-primary">2</span>
                    </div>
                    <div className="bg-white border border-border rounded-lg shadow-sm p-3 flex flex-col gap-2">
                      <div className="font-bold text-sm leading-none">Design System</div>
                      <div className="text-xs text-muted-foreground">TechStart Inc.</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                        <span className="text-[10px] font-bold bg-accent-lime/20 text-primary px-1.5 py-0.5 rounded">₹1.5L</span>
                        <div className="w-5 h-5 rounded-full bg-muted border border-border"></div>
                      </div>
                    </div>
                    <div className="bg-white border border-border rounded-lg shadow-sm p-3 flex flex-col gap-2">
                      <div className="font-bold text-sm leading-none">Web Revamp</div>
                      <div className="text-xs text-muted-foreground">Acme Corp</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                        <span className="text-[10px] font-bold bg-accent-lime/20 text-primary px-1.5 py-0.5 rounded">₹85K</span>
                        <div className="w-5 h-5 rounded-full bg-muted border border-border"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 bg-[#F9FAFB] rounded-xl p-3 flex flex-col gap-3">
                    <div className="text-[10px] font-bold text-muted-foreground tracking-widest flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                      IN PROGRESS <span className="ml-auto bg-muted/50 text-[10px] px-1.5 rounded text-primary">1</span>
                    </div>
                    <div className="bg-white border border-border rounded-lg shadow-sm p-3 flex flex-col gap-2 border-l-2 border-l-amber-400">
                      <div className="font-bold text-sm leading-none">Pitch Deck</div>
                      <div className="text-xs text-muted-foreground">Rahul Singh</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                        <span className="text-[10px] font-bold bg-accent-lime/20 text-primary px-1.5 py-0.5 rounded">₹45K</span>
                        <div className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Follow up</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 bg-[#F9FAFB] rounded-xl p-3 flex flex-col gap-3">
                    <div className="text-[10px] font-bold text-muted-foreground tracking-widest flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      WON <span className="ml-auto bg-muted/50 text-[10px] px-1.5 rounded text-primary">1</span>
                    </div>
                    <div className="bg-white border border-border rounded-lg shadow-sm p-3 flex flex-col gap-2">
                      <div className="font-bold text-sm leading-none">Consultation</div>
                      <div className="text-xs text-muted-foreground">Stripe</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                        <span className="text-[10px] font-bold bg-accent-lime/20 text-primary px-1.5 py-0.5 rounded">₹20K</span>
                        <div className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Closed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 border-y border-border bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
          <p className="text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase mb-16 text-center">Built for people who sell their skills.</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto items-center text-center">
            {['Designers', 'Developers', 'Video Editors', 'Copywriters', 'Marketers'].map(role => (
              <span key={role} className="text-2xl md:text-4xl font-black text-muted-foreground/40">{role}</span>
            ))}
            <span className="text-2xl md:text-4xl font-black text-muted-foreground/40 w-full text-center mt-2">Consultants</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="product" className="py-32 px-6 bg-[#111111] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-16 leading-tight uppercase tracking-tight">
            YOUR CLIENTS ARE EVERYWHERE.<br/>
            <span className="text-white/30">YOUR PIPELINE SHOULDN'T BE.</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-24">
            {['WhatsApp', 'LinkedIn', 'Email', 'Instagram', 'Referrals', 'Spreadsheets'].map(source => (
              <div key={source} className="px-6 py-3 rounded-full border border-white/10 bg-transparent text-white/70 font-medium text-sm md:text-base">
                {source}
              </div>
            ))}
          </div>
          
          <ArrowDown className="w-10 h-10 mx-auto text-[#C8FF2C] mb-24 stroke-[3]" />
          
          <div className="text-5xl md:text-6xl font-black tracking-tighter mb-12">CLIENTLOOP</div>
          <div className="grid sm:grid-cols-3 gap-8 text-xl font-medium text-white/90">
            <div>One pipeline.</div>
            <div>One follow-up system.</div>
            <div>One place to close.</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 px-6 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">How it works</h2>
              <p className="text-xl text-muted-foreground font-medium">Three simple steps to close more clients.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background rounded-3xl p-8 md:p-10 border border-border flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div className="mb-16">
                <span className="font-black text-7xl text-muted-foreground/20">01</span>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Capture</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  Bring every potential client into one pipeline, no matter where they messaged you from.
                </p>
              </div>
            </div>
            
            <div className="bg-[#3F46FF]/5 rounded-3xl p-8 md:p-10 border border-[#3F46FF]/20 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div className="mb-16">
                <span className="font-black text-7xl text-[#3F46FF]/20">02</span>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-[#3F46FF]">Follow Up</h3>
                <p className="text-[#3F46FF]/70 text-lg leading-relaxed font-medium">
                  Know exactly who needs your attention today with the daily smart task list.
                </p>
              </div>
            </div>
            
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 border border-primary flex flex-col justify-between shadow-2xl transition-transform duration-300 hover:-translate-y-1">
              <div className="mb-16">
                <span className="font-black text-7xl text-accent-lime">03</span>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-accent-lime">Close</h3>
                <p className="text-primary-foreground/80 text-lg leading-relaxed font-medium">
                  Turn conversations into proposals and convert them into paying clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder / Build in Public */}
      <section id="founder" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="p-10 md:p-16 flex-1">
              <Badge className="bg-white/10 text-white hover:bg-white/20 mb-8 border-none">Building in Public</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-snug">
                I'M BUILDING CLIENTLOOP BECAUSE I KNOW HOW EASY IT IS TO LOSE TRACK OF OPPORTUNITIES.
              </h2>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-16 h-16 bg-[#C8FF2C] rounded-full flex items-center justify-center text-black font-bold text-xl">NY</div>
                <div>
                  <div className="font-bold text-lg">Nitin Yadav</div>
                  <div className="text-white/60">Founder & Builder</div>
                </div>
              </div>
              <p className="mt-8 text-white/80 leading-relaxed">
                I'm an independent builder interested in AI, SaaS and product development. I'm building ClientLoop in public to solve a problem I kept seeing: freelancers have conversations everywhere, but no simple system that tells them what to do next.
              </p>
            </div>
            <div className="bg-white/5 border-l border-white/10 md:w-80 p-8 flex flex-col justify-center gap-4">
              <h4 className="font-bold text-white/50 tracking-widest uppercase text-sm mb-2">Follow the build</h4>
              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="font-medium">X / Twitter</span>
                <ArrowRight className="w-4 h-4 text-[#C8FF2C]" />
              </a>
              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="font-medium">LinkedIn</span>
                <ArrowRight className="w-4 h-4 text-[#C8FF2C]" />
              </a>
              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="font-medium">GitHub</span>
                <ArrowRight className="w-4 h-4 text-[#C8FF2C]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-white border-y">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              START FREE.<br/>
              <span className="text-muted-foreground">PAY WHEN IT PAYS YOU BACK.</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border shadow-sm flex flex-col">
              <h3 className="font-bold text-xl mb-2">FREE</h3>
              <div className="text-4xl font-black mb-6">₹0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-muted-foreground">25 leads</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-muted-foreground">Basic pipeline</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-muted-foreground">Manual reminders</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-muted-foreground">Basic dashboard</span></li>
              </ul>
              <Button className="w-full" variant="outline" onClick={() => handleLogin()}>Start Free</Button>
            </Card>
            
            <Card className="p-8 border-2 border-[#3F46FF] shadow-2xl shadow-[#3F46FF]/10 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#3F46FF] to-[#00E5FF] text-white px-4 py-1.5 text-[10px] font-black tracking-widest rounded-full uppercase shadow-md">
                Recommended
              </div>
              <h3 className="font-bold text-xl mb-2">PRO</h3>
              <div className="text-4xl font-black mb-6">₹299<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="font-medium">Unlimited leads</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-accent-blue shrink-0" /> <span className="font-medium">AI lead extraction</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-accent-blue shrink-0" /> <span className="font-medium">AI follow-up writer</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="font-medium">Proposal tracking</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="font-medium">Revenue analytics</span></li>
              </ul>
              <Button className="w-full" onClick={() => handleLogin()}>Start Pro</Button>
            </Card>
            
            <Card className="p-8 border shadow-sm flex flex-col">
              <h3 className="font-bold text-xl mb-2">BUSINESS</h3>
              <div className="text-4xl font-black mb-6">₹699<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-muted-foreground">Everything in Pro</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-muted-foreground">Automated follow-ups</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-muted-foreground">Client portal</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0" /> <span className="text-muted-foreground">Multiple pipelines</span></li>
              </ul>
              <Button className="w-full" variant="outline" onClick={() => handleLogin()}>Start Business</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-[#C8FF2C] text-black text-center">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
          YOUR NEXT CLIENT<br/>
          SHOULDN'T GET LOST.
        </h2>
        <p className="text-xl font-medium mb-12 max-w-2xl mx-auto">
          Capture the conversation. Follow up at the right time. Close the deal.
        </p>
        <Button size="lg" className="rounded-full px-12 h-14 text-base" onClick={() => handleLogin()}>
          Start Free Now
        </Button>
      </section>

      {/* Footer */}
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
      </footer>
    </div>
  );
}
