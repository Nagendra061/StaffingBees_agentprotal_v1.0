import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  GraduationCap,
  Award,
  Zap,
  Building,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { PLATFORM_SERVICES } from '../data/platformData';
import { PlatformService } from '../types';

interface AllServicesViewProps {
  onNavigateToCourseCatalog?: () => void;
}

export const AllServicesView: React.FC<AllServicesViewProps> = ({
  onNavigateToCourseCatalog,
}) => {
  const [selectedService, setSelectedService] = useState<PlatformService | null>(null);
  const [simulatedSSOUrl, setSimulatedSSOUrl] = useState<string | null>(null);

  const handleLaunchSSO = (srv: PlatformService) => {
    setSimulatedSSOUrl(`https://${srv.shortCode.toLowerCase()}.staffingbees.internal/sso?agent_token=agt_demo_token`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Platform Services & Pricing Directory</h1>
        <p className="text-xs text-gray-500">
          Integrated tools, sourcing automation, SB-CSP Academy, and transparent Free vs. Paid service tiers
        </p>
      </div>

      {/* First Call Free Rule Banner (PRD Section 10 & 12 US-12) */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl">
            🎁
          </div>
          <div>
            <h3 className="text-sm font-bold">StaffingBees First-Call-Free Guarantee</h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              Every discovery call for any candidate or client requisition is 100% free across all service tiers with zero credit deduction.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-white text-emerald-800 rounded-full font-bold text-[11px] shrink-0">
          Always Free Discovery
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORM_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
                  {srv.id === 'srv-rcats' && <Sparkles className="w-6 h-6 text-amber-600" />}
                  {srv.id === 'srv-training' && <GraduationCap className="w-6 h-6 text-blue-600" />}
                  {srv.id === 'srv-cert' && <Award className="w-6 h-6 text-purple-600" />}
                  {srv.id === 'srv-leads' && <Zap className="w-6 h-6 text-orange-500" />}
                  {srv.id === 'srv-portal' && <Building className="w-6 h-6 text-emerald-600" />}
                  {srv.id === 'srv-pricing' && <DollarSign className="w-6 h-6 text-indigo-600" />}
                </div>

                {srv.isSimulatedSSO && (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                    Simulated SSO
                  </span>
                )}
              </div>

              <h3 className="font-bold text-gray-900 text-base mt-3">{srv.name}</h3>
              <div className="text-[11px] font-medium text-amber-700 mb-1">{srv.summary}</div>
              <p className="text-xs text-gray-500 leading-relaxed">{srv.description}</p>

              {/* Free vs Paid Tier Comparison Box (PRD Section 10 & 16) */}
              <div className="mt-4 pt-3 border-t border-gray-100 space-y-3 text-xs">
                {/* Free Tier */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="font-bold text-gray-800 text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>{srv.freeTier.title}</span>
                    <span className="text-emerald-700 font-extrabold lowercase">free</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-gray-600">
                    {srv.freeTier.features.map((f) => (
                      <li key={f} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Paid Tier */}
                <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/80">
                  <div className="font-bold text-amber-950 text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>{srv.paidTier.title}</span>
                    <span className="text-amber-800 font-extrabold">{srv.paidTier.price}</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-gray-700">
                    {srv.paidTier.features.map((f) => (
                      <li key={f} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* First call free rule */}
                <div className="text-[10px] text-gray-400 italic">
                  Rule: {srv.firstCallRule}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 border-t border-gray-100">
              {srv.isSimulatedSSO ? (
                <button
                  onClick={() => handleLaunchSSO(srv)}
                  className="w-full py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Launch {srv.shortCode} Portal (SSO)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ) : srv.id === 'srv-training' && onNavigateToCourseCatalog ? (
                <button
                  onClick={onNavigateToCourseCatalog}
                  className="w-full py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Open SB-CSP Course Track</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  onClick={() => alert(`Opening ${srv.name} documentation & pricing terms.`)}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  View Service Terms
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Simulated SSO Modal (PRD Section 4 & 17) */}
      {simulatedSSOUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center space-x-3 text-blue-600">
              <ExternalLink className="w-6 h-6" />
              <h3 className="text-base font-bold text-gray-900">
                Simulated Single-Sign-On (SSO)
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Per PRD Section 4 & 17: RCATs, Leads Access, and Client Portal are simulated single-sign-on hand-offs in this prototype phase.
            </p>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono text-gray-700 break-all">
              {simulatedSSOUrl}
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setSimulatedSSOUrl(null)}
                className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg text-xs font-semibold"
              >
                Close Hand-off Dialog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
