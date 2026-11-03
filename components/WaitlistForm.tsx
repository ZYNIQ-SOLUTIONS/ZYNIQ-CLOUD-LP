'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, Check, AlertCircle } from 'lucide-react';

interface WaitlistFormProps { label?: string;
  variant?: 'dark' | 'light';
  source?: 'core' | 'solutions' | 'studio' | 'cloud';
  className?: string;
}

export default function WaitlistForm({ 
  variant = 'dark', 
  source = 'core',
  className = '' 
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [commandId, setCommandId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setCommandId(data.commandId);
        setMessage(data.message || 'You\'ve been added to the waitlist!');
        setEmail('');
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
          setCommandId('');
        }, 8000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
      console.error('Waitlist submission error:', error);
    }
  };

  const isDark = variant === 'dark';
  const bgColor = isDark ? 'bg-black/50' : 'bg-white';
  const borderColor = isDark ? 'border-red-500/30' : 'border-gray-300';
  const textColor = isDark ? 'text-white' : 'text-black';
  const placeholderColor = isDark ? 'placeholder-gray-500' : 'placeholder-gray-400';
  const inputBg = isDark ? 'bg-black/30' : 'bg-gray-50';

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className={`flex items-center gap-2 border ${borderColor} ${bgColor} backdrop-blur-sm overflow-hidden transition-all duration-300 ${
            status === 'success' ? 'border-green-500' : status === 'error' ? 'border-red-500' : ''
          }`}>
            <Mail 
              className={`ml-4 ${isDark ? 'text-red-500' : 'text-gray-600'}`} 
              size={20} 
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@domain.com"
              disabled={status === 'loading' || status === 'success'}
              className={`flex-1 px-4 py-4 ${inputBg} ${textColor} ${placeholderColor} font-mono text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
              required
            />
            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-6 py-4 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              whileHover={{ scale: status === 'idle' || status === 'error' ? 1.05 : 1 }}
              whileTap={{ scale: status === 'idle' || status === 'error' ? 0.95 : 1 }}
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : status === 'success' ? (
                <Check size={20} />
              ) : (
                'JOIN'
              )}
            </motion.button>
          </div>
        </div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {(message || commandId) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`p-4 border ${
                status === 'success' 
                  ? 'border-green-500/30 bg-green-500/10' 
                  : 'border-red-500/30 bg-red-500/10'
              }`}
            >
              <div className="flex items-start gap-3">
                {status === 'success' ? (
                  <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                ) : (
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                )}
                <div className="flex-1">
                  <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'} mb-2`}>
                    {message}
                  </p>
                  {commandId && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className={`mt-3 p-3 border ${
                        isDark ? 'border-green-500/30 bg-black/50' : 'border-green-500/30 bg-green-50'
                      }`}
                    >
                      <div className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'} mb-1 font-mono`}>
                        YOUR GOLDEN TICKET (COMMAND ID)
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <code className={`text-lg font-bold font-mono ${
                          isDark ? 'text-green-500' : 'text-green-700'
                        }`}>
                          {commandId}
                        </code>
                        <motion.button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(commandId);
                            // Optional: Show copied feedback
                          }}
                          className={`text-xs px-3 py-1 border ${
                            isDark 
                              ? 'border-green-500/50 text-green-400 hover:bg-green-500/10' 
                              : 'border-green-600 text-green-600 hover:bg-green-50'
                          } font-mono transition-colors`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          COPY
                        </motion.button>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                        Save this ID – it&apos;s your priority access key when ZYNIQ launches.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Text */}
        {status === 'idle' && (
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} font-mono`}>
            Join the waitlist to receive your Command ID and priority access when we launch.
          </p>
        )}
      </form>
    </div>
  );
}
