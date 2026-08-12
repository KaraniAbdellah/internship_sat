import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import image from '@/assets/optimic.png';

interface GoogleJwtPayload {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export default function Auth() {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      const decoded: GoogleJwtPayload = jwtDecode(token);

      console.log('--- Google User Profile ---', decoded);
      console.log('Gmail Address:', decoded.email);
      console.log('Full Name:', decoded.name);
      console.log('Avatar Picture:', decoded.picture);

      navigate('/optimic');
    } catch (error) {
      console.error('Failed to decode Google token', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <img src={image} alt="Optimic Logo" className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105" />
          <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-[#ff1d00] transition-colors">
            Optimic<span className="text-[#ff1d00]">.</span>
          </span>
        </Link>
        <Link
          to="/"
          className="text-sm font-semibold text-slate-600 hover:text-[#ff1d00] bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-full border border-slate-200 transition-all"
        >
          Back to Home
        </Link>
      </div>

      {/* Main Authentication Box - Simplified & Main Color Accent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full mx-auto my-auto text-center bg-white p-8 rounded-2xl "
      >

        <h1
          style={{ color: "#ff1d00" }}
          className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4 mb-2">
          Sign In to Optimic
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          Continue securely with your <span className="text-zinc-600 font-semibold">Google account.</span>
        </p>

        {/* Google Login Button */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.error('Google Login Failed');
            }}
            shape="pill"
            size="large"
            text="continue_with"
            width="100%"
          />
        </div>
      </motion.div>

      {/* Footer info */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-400">
        Made in Morocco, privacy-friendly multi-agent automation.
      </div>
    </div>
  );
}
