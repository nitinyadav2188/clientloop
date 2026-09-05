import { useAuth } from "@/contexts/AuthContext";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, MessageSquare, Briefcase, Mail, Columns, Brain, Calendar, FileText, PieChart } from 'lucide-react';
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
      <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-accent-lime rounded-sm rotate-45"></div>
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">ClientLoop</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#product" className="hover:text-primary transition-colors">Product</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#founder" className="hover:text-primary transition-colors">About</a>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/app" className="text-sm font-medium hover:text-muted-foreground hidden sm:block">Sign In</Link>
            <Button onClick={() => handleLogin()} className="bg-primary text-white hover:bg-primary/90 rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
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
      <section className="py-16 border-y bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-8">Built for people who sell their skills.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {['Designers', 'Developers', 'Video Editors', 'Copywriters', 'Marketers', 'Consultants'].map(role => (
              <span key={role} className="text-xl md:text-2xl font-bold text-primary/30">{role}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="product" className="py-32 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 leading-tight">
            YOUR CLIENTS ARE EVERYWHERE.<br/>
            <span className="text-muted-foreground">YOUR PIPELINE SHOULDN'T BE.</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {['WhatsApp', 'LinkedIn', 'Email', 'Instagram', 'Referrals', 'Spreadsheets'].map(source => (
              <div key={source} className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white/60 font-medium">
                {source}
              </div>
            ))}
          </div>
          
          <ArrowRight className="w-12 h-12 mx-auto text-accent-lime mb-20 rotate-90" />
          
          <div className="text-5xl font-black tracking-tight mb-8">CLIENTLOOP</div>
          <div className="grid sm:grid-cols-3 gap-8 text-xl font-medium text-white/80">
            <div>One pipeline.</div>
            <div>One follow-up system.</div>
            <div>One place to close.</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <div className="w-12 h-12 bg-accent-blue/10 text-accent-blue rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-4">AI Lead Extraction</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Just paste a client's message from anywhere. Our AI instantly extracts the project details, budget, requirements, and creates a lead profile for you.
              </p>
              <ul className="space-y-3 font-medium">
                <li className="flex items-center gap-3"><Check className="text-accent-lime" /> Zero manual data entry</li>
                <li className="flex items-center gap-3"><Check className="text-accent-lime" /> Understands lead temperature</li>
                <li className="flex items-center gap-3"><Check className="text-accent-lime" /> Recommends next actions</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border">
              <div className="bg-muted/30 rounded-xl p-4 text-sm mb-6 border">
                "Hey, I need someone to redesign our SaaS landing page. Budget around 50k. Can you send your portfolio?"
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg bg-background">
                  <span className="text-muted-foreground text-sm">Project</span>
                  <span className="font-medium">SaaS Landing Page</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg bg-background">
                  <span className="text-muted-foreground text-sm">Value</span>
                  <span className="font-medium">₹50,000</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg bg-background">
                  <span className="text-muted-foreground text-sm">Action</span>
                  <span className="font-medium text-accent-blue">Send Portfolio</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center mb-32 md:flex-row-reverse">
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 bg-[#C8FF2C]/20 text-[#111111] rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Never Forget a Follow-up</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Know exactly who needs your attention today. ClientLoop organizes your follow-ups so you never let a warm lead go cold.
              </p>
              <Button variant="outline" className="rounded-full">See follow-up features</Button>
            </div>
            <div className="order-2 md:order-1 bg-primary text-white p-8 rounded-3xl shadow-xl">
              <h4 className="font-semibold mb-6 text-white/80">Today's Tasks</h4>
              <div className="space-y-4">
                <div className="bg-white/10 border border-white/20 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <div className="font-medium">Rahul Sharma</div>
                    <div className="text-sm text-white/60">Proposal sent 3 days ago</div>
                  </div>
                  <Button size="sm" className="bg-[#C8FF2C] text-black hover:bg-[#C8FF2C]/90">Follow Up</Button>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white/60">Priya Patel</div>
                    <div className="text-sm text-white/40">Initial contact</div>
                  </div>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">Snooze</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            <Card className="p-6 border-none shadow-md bg-white">
              <Columns className="w-8 h-8 text-accent-blue mb-4" />
              <h4 className="font-bold text-lg mb-2">Visual Pipeline</h4>
              <p className="text-muted-foreground text-sm">Drag and drop leads through your sales stages. Always know where your money is.</p>
            </Card>
            <Card className="p-6 border-none shadow-md bg-white">
              <FileText className="w-8 h-8 text-accent-blue mb-4" />
              <h4 className="font-bold text-lg mb-2">Track Proposals</h4>
              <p className="text-muted-foreground text-sm">Log your sent proposals, track their status, and get reminded before they expire.</p>
            </Card>
            <Card className="p-6 border-none shadow-md bg-white">
              <PieChart className="w-8 h-8 text-accent-blue mb-4" />
              <h4 className="font-bold text-lg mb-2">Revenue Visibility</h4>
              <p className="text-muted-foreground text-sm">See exactly how much you've won, and what's currently sitting in your pipeline.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6 bg-white border-y border-border">
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
            
            <Card className="p-8 border-2 border-primary shadow-xl flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 text-xs font-bold tracking-wider rounded-full uppercase">
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
              <Button className="w-full bg-primary text-white" onClick={() => handleLogin()}>Start Pro</Button>
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
        <Button size="lg" className="rounded-full px-12 h-16 text-lg bg-primary text-white hover:bg-primary/90" onClick={() => handleLogin()}>
          Start Free Now
        </Button>
      </section>

      {/* Footer */}
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
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
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
      </footer>
    </div>
  );
}
