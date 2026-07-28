'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Video, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#0F0B1A] via-[#1A1533] to-[#0F0B1A]">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />

      <Card className="w-full max-w-md glass border-white/10 p-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-purple/20">
            <Video className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Tạo tài khoản mới</h1>
          <p className="text-sm text-slate-400">Bắt đầu hành trình sáng tạo nội dung AI</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Họ và tên</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <Input 
                type="text" 
                placeholder="Nguyễn Văn A" 
                className="pl-9 bg-black/20 border-white/10 focus:border-brand-purple" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <Input 
                type="email" 
                placeholder="name@example.com" 
                className="pl-9 bg-black/20 border-white/10 focus:border-brand-purple" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Mật khẩu</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="pl-9 bg-black/20 border-white/10 focus:border-brand-purple" 
                required 
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" id="terms" className="mt-1 rounded border-white/20 bg-black/20 text-brand-purple focus:ring-brand-purple/20" required />
            <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
              Tôi đồng ý với các <Link href="/terms" className="text-brand-blue hover:underline">Điều khoản dịch vụ</Link> và <Link href="/privacy" className="text-brand-blue hover:underline">Chính sách bảo mật</Link> của Content Remix AI.
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 text-white mt-6"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : (
              <span className="flex items-center gap-2">
                Đăng ký ngay
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-brand-purple hover:text-brand-purple/80 font-medium">
              Đăng nhập
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
