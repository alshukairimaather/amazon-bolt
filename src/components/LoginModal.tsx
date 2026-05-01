import { X, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string) => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'password' | 'signup'>('email');
  const [error, setError] = useState('');
  const [signupName, setSignupName] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Enter your email or mobile phone number');
      return;
    }
    setError('');
    setStep('password');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Enter your password');
      return;
    }
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message === 'Invalid login credentials' ? 'Your email or password was incorrect' : authError.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    onLogin(email);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    onLogin(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-white/95 pt-8 md:pt-16 overflow-y-auto">
      <div className="w-full max-w-[350px] mx-4 pb-12">
        <div className="px-2">
          <div className="text-center mb-4">
            <a href="#">
              <span className="text-[#0f1111] font-bold text-[28px] tracking-tight">amazon</span>
              <span className="text-[#ff9900] text-[11px] font-bold ml-0.5">.com</span>
            </a>
          </div>

          {step === 'signup' ? (
            <div className="border border-[#ddd] rounded-lg px-6 pt-5 pb-6">
              <h1 className="text-[28px] font-normal text-[#0f1111] mb-3">Create account</h1>
              <form onSubmit={handleSignUp} className="space-y-3">
                <div>
                  <label className="block text-[13px] font-bold text-[#0f1111] mb-1">Your name</label>
                  <input
                    type="text"
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    className="w-full border border-[#a6a6a6] rounded px-2.5 py-[5px] text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,166,63,0.4)]"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0f1111] mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-[#a6a6a6] rounded px-2.5 py-[5px] text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,166,63,0.4)]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0f1111] mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full border border-[#a6a6a6] rounded px-2.5 py-[5px] text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,166,63,0.4)]"
                  />
                  <p className="text-[11px] text-[#565959] mt-1">Passwords must be at least 6 characters.</p>
                </div>
                {error && (
                  <div className="flex items-start gap-2 border border-[#cc0c39] bg-[#fff0f0] rounded px-3 py-2.5 text-[13px] text-[#cc0c39]">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] py-[7px] rounded-lg transition-colors border border-[#a88734] disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Create your Amazon account'}
                </button>
              </form>
            </div>
          ) : (
            <div className="border border-[#ddd] rounded-lg px-6 pt-5 pb-6">
              <h1 className="text-[28px] font-normal text-[#0f1111] mb-3">Sign in</h1>
              {step === 'email' ? (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0f1111] mb-1">
                      Email or mobile phone number
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full border border-[#a6a6a6] rounded px-2.5 py-[5px] text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,166,63,0.4)]"
                      autoFocus
                    />
                  </div>
                  {error && (
                    <div className="flex items-start gap-2 border border-[#cc0c39] bg-[#fff0f0] rounded px-3 py-2.5 text-[13px] text-[#cc0c39]">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}
                  <button type="submit" className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] py-[7px] rounded-lg transition-colors border border-[#a88734]">
                    Continue
                  </button>
                  <p className="text-[12px] text-[#565959] leading-[16px]">
                    By continuing, you agree to Amazon's{' '}
                    <a href="#" className="text-[#0066c0] hover:underline">Conditions of Use</a> and{' '}
                    <a href="#" className="text-[#0066c0] hover:underline">Privacy Notice</a>.
                  </p>
                  <details className="text-[13px]">
                    <summary className="text-[#0066c0] cursor-pointer hover:underline flex items-center gap-1">
                      <span className="text-[#565959]">-</span> Need help?
                    </summary>
                    <div className="ml-4 mt-2 space-y-1.5">
                      <a href="#" className="block text-[#0066c0] hover:underline">Forgot your password?</a>
                      <a href="#" className="block text-[#0066c0] hover:underline">Other issues with Sign-In</a>
                    </div>
                  </details>
                </form>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-3">
                  <div className="text-[13px] mb-2">
                    <span className="text-[#0f1111]">{email}</span>
                    <button type="button" onClick={() => { setStep('email'); setError(''); }} className="ml-2 text-[#0066c0] hover:underline text-[12px]">
                      Change
                    </button>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0f1111] mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border border-[#a6a6a6] rounded px-2.5 py-[5px] pr-16 text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,166,63,0.4)]"
                        autoFocus
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#0066c0] text-[12px] hover:underline">
                        {showPass ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <div className="flex items-start gap-2 border border-[#cc0c39] bg-[#fff0f0] rounded px-3 py-2.5 text-[13px] text-[#cc0c39]">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}
                  <button type="submit" disabled={loading} className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] py-[7px] rounded-lg transition-colors border border-[#a88734] disabled:opacity-50">
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="keep-signed-in" className="w-3.5 h-3.5 accent-[#007185]" defaultChecked />
                    <label htmlFor="keep-signed-in" className="text-[13px] text-[#0f1111]">Keep me signed in.</label>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 my-4 text-[12px] text-[#767676]">
            <div className="flex-1 border-t border-[#e7e7e7]" />
            <span className="px-1">{step === 'signup' ? 'Already have an account?' : 'New to Amazon?'}</span>
            <div className="flex-1 border-t border-[#e7e7e7]" />
          </div>

          {step === 'signup' ? (
            <button onClick={() => setStep('email')} className="w-full border border-[#adb1b8] bg-[#f7f7f7] hover:bg-[#e7e9ec] text-[13px] text-[#0f1111] py-[7px] rounded-lg transition-colors">
              Sign in to your account
            </button>
          ) : (
            <button onClick={() => setStep('signup')} className="w-full border border-[#adb1b8] bg-[#f7f7f7] hover:bg-[#e7e9ec] text-[13px] text-[#0f1111] py-[7px] rounded-lg transition-colors">
              Create your Amazon account
            </button>
          )}
        </div>
      </div>

      <button onClick={onClose} className="fixed top-4 right-4 w-8 h-8 flex items-center justify-center text-[#565959] hover:text-[#0f1111] hover:bg-gray-100 rounded-full transition-colors z-50">
        <X size={18} />
      </button>
    </div>
  );
}
