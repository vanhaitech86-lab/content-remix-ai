export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0B1A] via-[#1A1533] to-[#0F0B1A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto glass p-8 rounded-2xl border border-white/5">
        <h1 className="text-3xl font-bold text-white mb-6">Điều khoản dịch vụ</h1>
        <div className="space-y-6 text-slate-300">
          <p>Cập nhật lần cuối: 28/07/2026</p>
          
          <h2 className="text-xl font-semibold text-slate-200 mt-8">1. Chấp nhận điều khoản</h2>
          <p>Bằng cách truy cập và sử dụng Content Remix AI, bạn đồng ý tuân thủ các điều khoản này.</p>
          
          <h2 className="text-xl font-semibold text-slate-200 mt-8">2. Trách nhiệm người dùng</h2>
          <p>Bạn chịu trách nhiệm về nội dung tạo ra và đăng tải thông qua nền tảng của chúng tôi. Không sử dụng dịch vụ để tạo nội dung vi phạm pháp luật hoặc bản quyền.</p>
          
          <h2 className="text-xl font-semibold text-slate-200 mt-8">3. Tín dụng (Credits)</h2>
          <p>Credits được sử dụng để xử lý AI. Gói subscription xác định số lượng credits hàng tháng. Credits không thể chuyển nhượng hoặc quy đổi thành tiền mặt.</p>
        </div>
      </div>
    </div>
  );
}
