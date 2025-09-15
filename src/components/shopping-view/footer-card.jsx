import React, { useState } from 'react';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 1500);
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="min-h-[400px] bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-black text-white shadow-2xl max-w-7xl w-full p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
          Subscribe to our emails
        </h1>

        <p className="text-gray-300 text-base mb-8 max-w-lg mx-auto leading-relaxed">
          Be the first to know about new collections and exclusive offers.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-full flex items-center justify-center">
          <div className="relative">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-80 bg-transparent border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || isSubmitted}
                className="bg-transparent border border-gray-600 border-l-0 px-6 py-3 hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path  strokeLinecap="round"  strokeLinejoin="round"  strokeWidth={2}  d="M17 8l4 4m0 0l-4 4m4-4H3"  />
                  </svg>
                )}
              </button>
            </div>
            
            {error && (
              <div className="text-red-400 text-sm mt-2 text-left">{error}</div>
            )}
          </div>
        </form>
        
        {isSubmitted && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-green-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-sm">Thanks for subscribing</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSubscription;