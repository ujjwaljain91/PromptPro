import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Zap, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'subscription' | 'tokens'>('subscription');
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handlePurchase = async (priceId: string, type: 'subscription' | 'tokens') => {
    setLoadingPriceId(priceId);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success redirect
      const successUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?success=true&session_id=mock_session_id`;
      window.location.href = successUrl;
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50/50 shrink-0">
                <div className="flex items-center gap-2 text-zinc-900">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Upgrade to Continue</h2>
                    <p className="text-xs text-zinc-500">Choose a plan or top up your tokens.</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-zinc-100 px-6 pt-2">
                <button
                  onClick={() => setActiveTab('subscription')}
                  className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'subscription' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
                >
                  Monthly Plans
                </button>
                <button
                  onClick={() => setActiveTab('tokens')}
                  className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'tokens' ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
                >
                  Token Packs
                </button>
              </div>
              
              <div className="overflow-y-auto p-6 md:p-8 bg-zinc-50 flex-1">
                {activeTab === 'subscription' ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Free Tier (Current) */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col opacity-60 grayscale">
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-1">Starter</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tracking-tight">$0</span>
                          <span className="text-zinc-500">/mo</span>
                        </div>
                        <p className="text-zinc-500 text-xs mt-2">Current Plan (Exhausted)</p>
                      </div>
                      <ul className="space-y-3 mb-6 flex-1">
                        {[
                          "5 free tokens",
                          "Standard processing",
                          "Basic style presets",
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button 
                        disabled
                        className="w-full py-2.5 px-4 bg-zinc-100 text-zinc-400 font-medium rounded-xl border border-zinc-200 cursor-not-allowed"
                      >
                        Current Plan
                      </button>
                    </div>

                    {/* Pro Tier */}
                    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl flex flex-col relative overflow-hidden transform md:-translate-y-2 ring-4 ring-blue-500/20">
                      <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500 to-violet-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                        RECOMMENDED
                      </div>
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-1 text-zinc-100">Pro Creator</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tracking-tight">$29</span>
                          <span className="text-zinc-400">/mo</span>
                        </div>
                        <p className="text-zinc-400 text-xs mt-2">Unlimited power for pros.</p>
                      </div>
                      <ul className="space-y-3 mb-6 flex-1">
                        {[
                          "Unlimited generations",
                          "Fast processing (Priority)",
                          "Access to Gemini 3 Pro & Veo",
                          "Private mode enabled",
                          "Commercial usage rights",
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button 
                        onClick={() => handlePurchase('price_pro_monthly', 'subscription')}
                        disabled={!!loadingPriceId}
                        className="w-full py-2.5 px-4 bg-white text-zinc-900 font-medium rounded-xl hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
                      >
                         {loadingPriceId === 'price_pro_monthly' && <Loader2 className="w-4 h-4 animate-spin" />}
                         Upgrade Now
                      </button>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col">
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-1">Studio</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tracking-tight">$99</span>
                          <span className="text-zinc-500">/mo</span>
                        </div>
                        <p className="text-zinc-500 text-xs mt-2">For high-volume teams.</p>
                      </div>
                      <ul className="space-y-3 mb-6 flex-1">
                        {[
                          "Everything in Pro",
                          "Team collaboration",
                          "API access",
                          "Dedicated support",
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button 
                        onClick={() => handlePurchase('price_studio_monthly', 'subscription')}
                        disabled={!!loadingPriceId}
                        className="w-full py-2.5 px-4 bg-zinc-50 text-zinc-900 font-medium rounded-xl border border-zinc-200 hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                      >
                        {loadingPriceId === 'price_studio_monthly' && <Loader2 className="w-4 h-4 animate-spin" />}
                        Contact Sales
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Token Pack 1 */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
                      <div className="mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-blue-600">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Starter Pack</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tracking-tight">$5</span>
                        </div>
                        <p className="text-zinc-500 text-xs mt-2">50 Tokens ($0.10/token)</p>
                      </div>
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-start gap-2 text-xs text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>Instant delivery</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>Never expires</span>
                        </li>
                      </ul>
                      <button 
                        onClick={() => handlePurchase('price_tokens_50', 'tokens')}
                        disabled={!!loadingPriceId}
                        className="w-full py-2.5 px-4 bg-zinc-50 text-zinc-900 font-medium rounded-xl border border-zinc-200 hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                      >
                        {loadingPriceId === 'price_tokens_50' && <Loader2 className="w-4 h-4 animate-spin" />}
                        Buy Now
                      </button>
                    </div>

                    {/* Token Pack 2 */}
                    <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                        BEST VALUE
                      </div>
                      <div className="mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-blue-700">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Creator Pack</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tracking-tight">$20</span>
                        </div>
                        <p className="text-zinc-500 text-xs mt-2">250 Tokens ($0.08/token)</p>
                      </div>
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-start gap-2 text-xs text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>20% Savings</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                      <button 
                        onClick={() => handlePurchase('price_tokens_250', 'tokens')}
                        disabled={!!loadingPriceId}
                        className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        {loadingPriceId === 'price_tokens_250' && <Loader2 className="w-4 h-4 animate-spin" />}
                        Buy Now
                      </button>
                    </div>

                    {/* Token Pack 3 */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col hover:border-blue-200 transition-colors">
                      <div className="mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3 text-purple-600">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Studio Pack</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold tracking-tight">$50</span>
                        </div>
                        <p className="text-zinc-500 text-xs mt-2">750 Tokens ($0.06/token)</p>
                      </div>
                      <ul className="space-y-3 mb-6 flex-1">
                        <li className="flex items-start gap-2 text-xs text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>40% Savings</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-zinc-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>Bulk discount</span>
                        </li>
                      </ul>
                      <button 
                        onClick={() => handlePurchase('price_tokens_750', 'tokens')}
                        disabled={!!loadingPriceId}
                        className="w-full py-2.5 px-4 bg-zinc-50 text-zinc-900 font-medium rounded-xl border border-zinc-200 hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                      >
                        {loadingPriceId === 'price_tokens_750' && <Loader2 className="w-4 h-4 animate-spin" />}
                        Buy Now
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Secure payment processing via Stripe</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
