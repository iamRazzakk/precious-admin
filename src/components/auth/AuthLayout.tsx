import { ReactNode } from 'react'
import Logo from '@/components/common/Logo'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex font-sans">
      {/* Left: hero image */}
      <div
        className="flex-1 relative bg-cover bg-center text-white px-[60px] py-10 hidden lg:block"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(27, 58, 92,0.85) 0%, rgba(27, 58, 92,0.75) 100%), url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80)',
        }}
      >
        
        <div className="absolute bottom-[60px] left-[60px] right-[60px]">
          <h2 className="text-[36px] font-extrabold leading-[1.2] mt-0 mb-4">
            Staffing made simple, shifts made smarter.
          </h2>
          <p className="text-base leading-[1.6] opacity-90 m-0">
            Manage staff, schedule shifts, and run payroll — all from one workspace built for modern workforce teams.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 bg-bg-card flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="logo"
              className=" w-[300px] h-[300px] rounded-full object-cover border-2 border-border-light"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
