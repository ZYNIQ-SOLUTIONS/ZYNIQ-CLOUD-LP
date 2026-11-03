'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react'

interface ConsultationFormProps {
  variant?: 'light' | 'dark'
}

const SERVICES = [
  'AI Strategy & Consulting',
  'Custom Software Development',
  'Autonomous AI Agents',
  'Cloud Infrastructure',
  'Security & Compliance',
  'Web3 & Blockchain',
  'Data & Analytics',
  'UI/UX Design',
]

const BUDGETS = [
  'Under $10K',
  '$10K – $25K',
  '$25K – $50K',
  '$50K – $100K',
  '$100K – $250K',
  '$250K+',
]

export default function ConsultationForm({ variant = 'dark' }: ConsultationFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [leadId, setLeadId] = useState('')
  const [utm, setUtm] = useState({ utm_source: '', utm_medium: '', utm_campaign: '' })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setUtm({
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...utm }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setLeadId(data.lead_id || '')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const isLight = variant === 'light'
  const inputClass = isLight
    ? 'w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-zyniq-red/30 focus:border-zyniq-red/50 text-sm font-space transition-all'
    : 'w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-zyniq-red/30 focus:border-zyniq-red/30 text-sm font-space transition-all'
  const selectClass = inputClass + ' appearance-none'
  const labelClass = isLight
    ? 'block text-sm font-space font-medium text-slate-600 mb-1.5'
    : 'block text-sm font-space font-medium text-white/50 mb-1.5'

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center p-8 rounded-xl border ${isLight ? 'bg-green-50 border-green-200' : 'bg-green-500/10 border-green-500/20'}`}
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className={`text-xl font-orbitron font-bold mb-2 ${isLight ? 'text-slate-800' : 'text-white'}`}>
          Request Received!
        </h3>
        <p className={`text-sm font-space mb-3 ${isLight ? 'text-slate-500' : 'text-white/50'}`}>
          Our team will reach out within 24 hours.
        </p>
        {leadId && (
          <p className="text-xs font-jetbrains text-zyniq-red/60">
            Reference: {leadId}
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Work Email *</label>
          <input
            type="email"
            required
            placeholder="john@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Company</label>
          <input
            type="text"
            placeholder="Acme Corp"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <label className={labelClass}>Service Needed</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className={selectClass}
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className={`absolute right-3 top-[38px] w-4 h-4 pointer-events-none ${isLight ? 'text-slate-400' : 'text-white/30'}`} />
        </div>
        <div className="relative">
          <label className={labelClass}>Budget Range</label>
          <select
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className={selectClass}
          >
            <option value="">Select budget</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <ChevronDown className={`absolute right-3 top-[38px] w-4 h-4 pointer-events-none ${isLight ? 'text-slate-400' : 'text-white/30'}`} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Project Details</label>
        <textarea
          rows={4}
          placeholder="Tell us about your project goals, challenges, and timeline..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass + ' resize-none'}
        />
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`flex items-center gap-2 p-3 rounded-lg ${isLight ? 'bg-red-50 text-red-600' : 'bg-red-500/10 text-red-400'}`}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-space">Something went wrong. Please try again.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-3.5 px-6 rounded-lg font-orbitron font-bold text-sm tracking-wider transition-all cursor-none-target flex items-center justify-center gap-2 ${
          isLight
            ? 'bg-zyniq-red text-white hover:bg-red-600 disabled:bg-red-300'
            : 'bg-zyniq-red text-white hover:bg-red-600 disabled:bg-red-900'
        }`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            SUBMITTING...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            GET FREE CONSULTATION
          </>
        )}
      </button>
    </form>
  )
}
