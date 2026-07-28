'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, FileText, CheckCircle2, ChevronRight, FileVideo, LayoutTemplate, PenTool, Youtube, Share2, Clapperboard, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Stepper, Step } from '@/components/ui/stepper';

const steps = [
  { id: 'source', label: 'Nguồn', icon: FileVideo, path: 'source' },
  { id: 'transcript', label: 'Transcript', icon: FileText, path: 'transcript' },
  { id: 'analysis', label: 'Phân tích', icon: LayoutTemplate, path: 'analysis' },
  { id: 'script', label: 'Kịch bản', icon: PenTool, path: 'script' },
  { id: 'storyboard', label: 'Storyboard', icon: Clapperboard, path: 'storyboard' },
  { id: 'editor', label: 'Biên tập', icon: Scissors, path: 'editor' },
  { id: 'export', label: 'Xuất video', icon: Youtube, path: 'export' },
  { id: 'publish', label: 'Đăng tải', icon: Share2, path: 'publish' },
];

export default function ProjectLayout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
  const pathname = usePathname();
  
  const currentStepIndex = steps.findIndex(step => pathname.includes(`/projects/${params.id}/${step.path}`));
  const activeStep = currentStepIndex === -1 ? 0 : currentStepIndex;

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#0F0B1A] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0F0B1A]/80 backdrop-blur-md">
        <div className="flex h-16 items-center px-4 gap-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Project {params.id}
            </h1>
            <span className="text-xs text-gray-500">Đang chỉnh sửa</span>
          </div>
          
          <div className="ml-auto flex items-center space-x-2 hidden md:flex">
             <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">Lưu nháp</Button>
          </div>
        </div>
        
        {/* Stepper */}
        <div className="w-full overflow-x-auto border-t border-white/5 bg-[#1A1533]/50 px-4 py-3 hide-scrollbar">
          <div className="flex items-center min-w-max mx-auto max-w-5xl justify-between">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const StepIcon = step.icon;
              
              return (
                <Link 
                  href={`/projects/${params.id}/${step.path}`} 
                  key={step.id}
                  className="flex items-center group"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                      isActive ? "border-purple-500 bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(124,58,237,0.3)]" : 
                      isPast ? "border-blue-500 bg-blue-500 text-white" : 
                      "border-white/10 bg-[#2D2545]/50 text-gray-400 group-hover:border-white/30"
                    )}>
                      {isPast ? <CheckCircle2 className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                    </div>
                    <span className={cn(
                      "text-xs font-medium transition-colors",
                      isActive ? "text-purple-400" : 
                      isPast ? "text-blue-400" : 
                      "text-gray-500 group-hover:text-gray-300"
                    )}>
                      {step.label}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "h-[2px] w-8 sm:w-12 md:w-16 mx-2 mb-5 rounded-full transition-colors",
                      isPast ? "bg-blue-500/50" : "bg-white/10"
                    )} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
