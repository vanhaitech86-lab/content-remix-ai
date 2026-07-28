export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0B1A] via-[#1A1533] to-[#0F0B1A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto glass p-8 rounded-2xl border border-white/5">
        <h1 className="text-3xl font-bold text-white mb-6">Chính sách bảo mật</h1>
        <div className="space-y-6 text-slate-300">
          <p>Cập nhật lần cuối: 28/07/2026</p>
          
          <h2 className="text-xl font-semibold text-slate-200 mt-8">1. Thu thập thông tin</h2>
          <p>Chúng tôi thu thập thông tin khi bạn đăng ký tài khoản, kết nối các nền tảng mạng xã hội và sử dụng dịch vụ của chúng tôi.</p>
          
          <h2 className="text-xl font-semibold text-slate-200 mt-8">2. Sử dụng thông tin</h2>
          <p>Thông tin của bạn được sử dụng để cung cấp, duy trì và cải thiện dịch vụ, cũng như xử lý các video và đăng tải theo yêu cầu của bạn.</p>

          <h2 className="text-xl font-semibold text-slate-200 mt-8">3. API keys và Chứng chỉ</h2>
          <p>Các API key (như OpenAI, ElevenLabs) và token xác thực mạng xã hội được mã hóa và lưu trữ an toàn. Chúng tôi không sử dụng API key của bạn cho mục đích nào khác ngoài việc thực hiện các tính năng bạn yêu cầu.</p>
        </div>
      </div>
    </div>
  );
}
