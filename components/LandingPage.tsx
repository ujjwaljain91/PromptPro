import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Aperture, Layers, ArrowRight, CheckCircle2, Linkedin, Github, Twitter, Heart } from 'lucide-react';
import { Logo } from './Logo';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 text-white p-1.5 rounded-lg">
              <Logo className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-tight">PromptPro</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-900 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
          </div>
          <button 
            onClick={onGetStarted}
            className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-70"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100 mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Powered by Gemini 3 Pro</span>
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              Transform Media into <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                Perfect Prompts
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop guessing. Upload any image or video and let our AI reverse-engineer the perfect prompt for Midjourney, Stable Diffusion, and Veo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto group relative px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Start Creating Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-600 border border-zinc-200 rounded-full font-medium text-lg hover:bg-zinc-50 transition-colors">
                View Demo
              </button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 md:mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-xl p-2 shadow-2xl shadow-blue-900/5">
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 aspect-[16/9] overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-violet-50/50"></div>
                {/* Abstract UI Representation */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full h-full p-4 md:p-8 opacity-60">
                   <div className="hidden md:block md:col-span-4 bg-white rounded-lg shadow-sm border border-zinc-100 h-full"></div>
                   <div className="col-span-1 md:col-span-8 bg-white rounded-lg shadow-sm border border-zinc-100 h-full flex flex-col gap-4 p-4">
                      <div className="h-8 w-1/3 bg-zinc-100 rounded"></div>
                      <div className="h-32 w-full bg-zinc-50 rounded border border-dashed border-zinc-200"></div>
                      <div className="flex-1 bg-zinc-50 rounded"></div>
                   </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-white/90 backdrop-blur shadow-xl border border-zinc-200 px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs md:text-sm font-medium text-zinc-600">Analyzing Scene Composition...</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to engineer prompts</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Built for professional creators who need precision and control over their generative workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Aperture className="w-6 h-6 text-blue-600" />,
                title: "Visual Analysis",
                desc: "Upload any image to extract lighting, camera angles, and style keywords instantly."
              },
              {
                icon: <Zap className="w-6 h-6 text-violet-600" />,
                title: "Instant Refinement",
                desc: "Tweak parameters like aspect ratio and realism with a single click."
              },
              {
                icon: <Layers className="w-6 h-6 text-indigo-600" />,
                title: "Multi-Model Ready",
                desc: "Optimized outputs for Midjourney v6, Stable Diffusion XL, and Google Veo."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-6 border border-zinc-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-16 md:py-24 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Designed for the modern <br/> creative workflow
              </h2>
              <div className="space-y-4">
                {[
                  "Export to JSON or Copy to Clipboard",
                  "History tracking for all your generations",
                  "Dark mode optimized for late night sessions",
                  "Enterprise-grade security and privacy"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-zinc-600">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={onGetStarted}
                className="mt-8 text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2"
              >
                Explore all features <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-violet-100 rounded-full blur-3xl opacity-30"></div>
              <div className="relative bg-zinc-900 rounded-2xl p-8 shadow-2xl text-white">
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500"></div>
                  <div>
                    <div className="font-medium">PromptPro AI</div>
                    <div className="text-xs text-zinc-400">Just now</div>
                  </div>
                </div>
                <div className="space-y-4 font-mono text-sm text-zinc-300">
                  <p>
                    <span className="text-blue-400">/imagine</span> prompt: cinematic shot of a futuristic city, 
                    <span className="text-violet-400"> neon lights</span>, rain-slicked streets, 
                    <span className="text-yellow-400"> 8k resolution</span>, 
                    <span className="text-green-400"> --ar 16:9</span>
                  </p>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Choose the plan that fits your creative workflow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">$0</span>
                  <span className="text-zinc-500">/mo</span>
                </div>
                <p className="text-zinc-500 text-sm mt-4">Perfect for hobbyists and exploring AI art.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "50 generations per day",
                  "Standard processing speed",
                  "Basic style presets",
                  "Public gallery access",
                  "Community support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full py-3 px-4 bg-zinc-50 text-zinc-900 font-medium rounded-xl border border-zinc-200 hover:bg-zinc-100 transition-colors"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-zinc-900 text-white p-8 rounded-2xl shadow-xl flex flex-col relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                POPULAR
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2 text-zinc-100">Pro Creator</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">$29</span>
                  <span className="text-zinc-400">/mo</span>
                </div>
                <p className="text-zinc-400 text-sm mt-4">For professional artists and designers.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Unlimited generations",
                  "Fast processing (Priority)",
                  "Access to Gemini 3 Pro & Veo",
                  "Private mode enabled",
                  "Commercial usage rights",
                  "Advanced parameter controls"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full py-3 px-4 bg-white text-zinc-900 font-medium rounded-xl hover:bg-blue-50 transition-colors"
              >
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Studio</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">$99</span>
                  <span className="text-zinc-500">/mo</span>
                </div>
                <p className="text-zinc-500 text-sm mt-4">For teams and high-volume production.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Everything in Pro",
                  "Team collaboration tools",
                  "Shared prompt libraries",
                  "API access",
                  "Dedicated support",
                  "Custom model fine-tuning"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full py-3 px-4 bg-zinc-50 text-zinc-900 font-medium rounded-xl border border-zinc-200 hover:bg-zinc-100 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 md:py-24 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
           <div className="absolute -top-[50%] -left-[20%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]"></div>
           <div className="absolute -bottom-[50%] -right-[20%] w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to start creating?</h2>
          <p className="text-zinc-400 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
            Join thousands of creators who are saving hours on prompt engineering every week.
          </p>
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 rounded-full font-bold text-lg hover:bg-zinc-100 transition-all hover:scale-105"
          >
            Get Started for Free
          </button>
          <p className="mt-6 text-sm text-zinc-500">No credit card required · Free tier available</p>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="bg-white border-t border-zinc-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:w-1/3 space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-zinc-900 text-white p-1.5 rounded-lg">
                  <Logo className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight">PromptPro</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Empowering creators with AI-driven prompt engineering tools for the next generation of digital art.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/ujjwalux/" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-50 rounded-full text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-zinc-50 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-zinc-50 rounded-full text-zinc-400 hover:text-blue-400 hover:bg-blue-50 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Product Column */}
              <div>
                <h3 className="font-semibold text-zinc-900 mb-4">Product</h3>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Showcase</a></li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <h3 className="font-semibold text-zinc-900 mb-4">Resources</h3>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Help Center</a></li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="font-semibold text-zinc-900 mb-4">Company</h3>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Legal</a></li>
                  <li><a href="#" className="hover:text-zinc-900 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-zinc-400">
              © 2026 PromptPro Inc. All rights reserved.
            </div>
            
            <div className="flex items-center gap-1.5 text-sm text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>by</span>
              <a href="https://www.linkedin.com/in/ujjwalux/" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 hover:text-blue-600 transition-colors">
                Ujjwal Jain
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
