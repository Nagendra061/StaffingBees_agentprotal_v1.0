import React, { useState } from 'react';
import {
  Building,
  Plus,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  CheckCircle2,
  FileText,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { Client, Requirement } from '../types';

interface MyClientsViewProps {
  clients: Client[];
  requirements: Requirement[];
  onAddClient: (client: Client) => void;
  onAddRequirement: (req: Requirement) => void;
  onNavigateToRequirementDetail?: (req: Requirement) => void;
}

export const MyClientsView: React.FC<MyClientsViewProps> = ({
  clients,
  requirements,
  onAddClient,
  onAddRequirement,
  onNavigateToRequirementDetail,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'detail'>('list');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Add client form state
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [domain, setDomain] = useState('');
  const [techFocus, setTechFocus] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactTitle, setContactTitle] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState<'Customer in discussion' | 'Client – MSA signed'>('Client – MSA signed');
  const [contractType, setContractType] = useState<'Contract' | 'Direct Placement' | 'Both'>('Both');
  const [paymentTerms, setPaymentTerms] = useState('Net 30');
  const [billingNotes, setBillingNotes] = useState('');

  // Add requirement sub-form inside detail view
  const [showAddReqForm, setShowAddReqForm] = useState(false);
  const [reqTitle, setReqTitle] = useState('');
  const [reqDomain, setReqDomain] = useState('Engineering');
  const [reqType, setReqType] = useState<'Contract' | 'Direct Placement'>('Contract');
  const [reqRate, setReqRate] = useState(90);
  const [reqSkills, setReqSkills] = useState('React, TypeScript');
  const [reqPositions, setReqPositions] = useState(1);

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    const newClient: Client = {
      id: `cli-${Date.now()}`,
      name: companyName,
      location,
      website: website || 'https://example.com',
      domain: domain || 'Enterprise Software',
      technologyFocus: techFocus || 'Full Stack',
      primaryContact: {
        name: contactName,
        title: contactTitle,
        email: contactEmail,
        phone: contactPhone,
      },
      relationshipStatus,
      contractType,
      paymentTerms,
      documentsReference: 'MSA-EXECUTED-2026.pdf',
      billingNotes,
      owningAgentId: 'AGT-001',
      owningAgentName: 'Harika Reddy',
      createdAt: 'Just now',
    };

    onAddClient(newClient);
    setSelectedClient(newClient);
    setViewMode('detail');
  };

  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !reqTitle.trim()) return;

    const newReq: Requirement = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      jobTitle: reqTitle,
      domain: reqDomain,
      engagementType: reqType,
      positionsOpen: reqPositions,
      clientBillRate: reqType === 'Contract' ? reqRate : undefined,
      budgetedAnnualSalary: reqType === 'Direct Placement' ? reqRate * 1000 : undefined,
      skillsNeeded: reqSkills.split(',').map((s) => s.trim()),
      status: 'Open',
      owningAgentId: selectedClient.owningAgentId,
      owningAgentName: selectedClient.owningAgentName,
      postedDate: 'Today',
      location: selectedClient.location,
      workModel: 'Hybrid',
      description: `Requirement posted for ${selectedClient.name}`,
    };

    onAddRequirement(newReq);
    setShowAddReqForm(false);
    setReqTitle('');
  };

  // ================= VIEW: ADD CLIENT (FULL PAGE) =================
  if (viewMode === 'add') {
    return (
      <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb Header */}
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <button
              onClick={() => setViewMode('list')}
              className="hover:text-gray-900 flex items-center space-x-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clients</span>
            </button>
            <span>/</span>
            <span className="font-semibold text-gray-900">Add New Client Account</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/90 p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-xl font-bold text-gray-900">Add Client Account</h1>
              <p className="text-xs text-gray-500">
                Register a hiring company, specify MSA agreement status, and set payment engine terms.
              </p>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-6 text-xs">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                  1. Company Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Cloud Systems"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">HQ Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. San Jose, CA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Website URL</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Industry / Domain</label>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="e.g. FinTech / Enterprise SaaS"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Primary Contact */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                  2. Primary Hiring Manager / Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Contact Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Sarah Jenkins"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={contactTitle}
                      onChange={(e) => setContactTitle(e.target.value)}
                      placeholder="VP of Engineering"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="sjenkins@company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Direct Phone</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+1 (408) 555-0199"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Agreement & Billing */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px]">
                  3. Agreement & Billing Terms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Relationship Status</label>
                    <select
                      value={relationshipStatus}
                      onChange={(e) => setRelationshipStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="Client – MSA signed">Client – MSA signed</option>
                      <option value="Customer in discussion">Customer in discussion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Contract Type</label>
                    <select
                      value={contractType}
                      onChange={(e) => setContractType(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="Both">Both (Contract & Direct)</option>
                      <option value="Contract">Contract (Hourly Margin)</option>
                      <option value="Direct Placement">Direct Placement (One-time %)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Payment Terms</label>
                    <input
                      type="text"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      placeholder="Net 30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Billing Notes</label>
                  <textarea
                    rows={2}
                    value={billingNotes}
                    onChange={(e) => setBillingNotes(e.target.value)}
                    placeholder="Rate caps, invoicing procedures, or escrow terms..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg font-semibold shadow-xs"
                >
                  Save & View Client Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ================= VIEW: CLIENT DETAIL =================
  if (viewMode === 'detail' && selectedClient) {
    const clientReqs = requirements.filter((r) => r.clientId === selectedClient.id);

    return (
      <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Breadcrumb Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewMode('list')}
              className="hover:text-gray-900 flex items-center space-x-1.5 text-xs text-gray-600 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clients List</span>
            </button>

            <button
              onClick={() => setShowAddReqForm(true)}
              className="px-3.5 py-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Requirement</span>
            </button>
          </div>

          {/* Client Header Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">
                <Building className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-gray-900">{selectedClient.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {selectedClient.relationshipStatus}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{selectedClient.location}</span>
                  </span>
                  <span>•</span>
                  <span>{selectedClient.domain}</span>
                  <span>•</span>
                  <a
                    href={selectedClient.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center space-x-0.5"
                  >
                    <span>{selectedClient.website}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-right text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="text-[10px] text-gray-400 uppercase font-semibold">Owning Agent</div>
              <div className="font-bold text-gray-800">{selectedClient.owningAgentName}</div>
              <div className="text-[10px] text-gray-500">Terms: {selectedClient.paymentTerms}</div>
            </div>
          </div>

          {/* Add Requirement Form Modal */}
          {showAddReqForm && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <h3 className="text-sm font-bold text-blue-950">
                  Post New Requirement for {selectedClient.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddReqForm(false)}
                  className="text-xs text-blue-700 hover:text-blue-900 font-semibold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateRequirement} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={reqTitle}
                    onChange={(e) => setReqTitle(e.target.value)}
                    placeholder="e.g. Senior Full Stack Engineer"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Engagement Type</label>
                  <select
                    value={reqType}
                    onChange={(e) => setReqType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                  >
                    <option value="Contract">Contract (Hourly Bill Rate)</option>
                    <option value="Direct Placement">Direct Placement (Annual Salary)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    {reqType === 'Contract' ? 'Client Bill Rate ($/hr)' : 'Budgeted Annual Salary ($)'}
                  </label>
                  <input
                    type="number"
                    value={reqRate}
                    onChange={(e) => setReqRate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">Skills Needed (comma-separated)</label>
                  <input
                    type="text"
                    value={reqSkills}
                    onChange={(e) => setReqSkills(e.target.value)}
                    placeholder="React, TypeScript, AWS, Node.js"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-lg font-semibold shadow-xs"
                  >
                    Publish Requirement
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Client Requirements List */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Active Requirements ({clientReqs.length})
              </h3>
            </div>

            {clientReqs.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400">
                No active requirements posted yet for this client account. Click "Add Requirement" above.
              </div>
            ) : (
              <div className="space-y-3">
                {clientReqs.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl border border-gray-200 hover:border-blue-400 transition-all flex items-center justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900 text-sm">{req.jobTitle}</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">
                          {req.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px]">
                          {req.engagementType}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Skills: {req.skillsNeeded.join(' • ')}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Posted {req.postedDate} • {req.location} ({req.workModel})
                      </div>
                    </div>

                    <div className="text-right space-y-1.5">
                      <div className="font-extrabold text-sm text-emerald-700">
                        {req.engagementType === 'Contract'
                          ? `$${req.clientBillRate}/hr`
                          : `$${(req.budgetedAnnualSalary || 0).toLocaleString()}`}
                      </div>
                      {onNavigateToRequirementDetail && (
                        <button
                          onClick={() => onNavigateToRequirementDetail(req)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-semibold text-[11px] cursor-pointer"
                        >
                          Screen & Submit →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= VIEW: CLIENTS LIST =================
  return (
    <div className="flex-1 overflow-y-auto bg-[#ebedf0] p-4 sm:p-6 select-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Client Accounts</h1>
          <p className="text-xs text-gray-500">
            Hiring companies with signed Master Service Agreements (MSAs) and active requisitions
          </p>
        </div>
        <button
          onClick={() => setViewMode('add')}
          className="px-3.5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center space-x-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Client Account</span>
        </button>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clients.map((client) => {
          const clientReqsCount = requirements.filter((r) => r.clientId === client.id).length;
          return (
            <div
              key={client.id}
              onClick={() => {
                setSelectedClient(client);
                setViewMode('detail');
              }}
              className="bg-white rounded-2xl p-5 border border-gray-200/90 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    <Building className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                    {client.relationshipStatus}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base mt-3">{client.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{client.domain}</p>

                <div className="mt-3 p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs text-gray-600 border border-gray-100">
                  <div className="font-semibold text-gray-800">{client.primaryContact.name}</div>
                  <div className="text-[11px] text-gray-500">{client.primaryContact.title}</div>
                  <div className="text-[11px] text-gray-500 flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span>{client.primaryContact.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  <strong className="text-gray-900">{clientReqsCount}</strong> Open Requisitions
                </span>
                <span className="font-semibold text-[#1d4ed8]">View Profile →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
