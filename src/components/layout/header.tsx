'use client';

import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  const { toggleSidebar, theme, toggleTheme } = useAppStore();

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-slate-400 hover:text-white"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        {/* Breadcrumb / Title placeholder */}
        <div className="hidden sm:block">
          <h2 className="text-lg font-semibold text-slate-200">Dashboard</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input 
            placeholder="Tìm kiếm..." 
            className="pl-9 bg-black/20 border-white/10 focus:border-brand-purple focus:ring-brand-purple/20 text-sm h-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-400 hover:text-white"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-purple"></span>
          </Button>
        </div>
      </div>
    </header>
  );
}
