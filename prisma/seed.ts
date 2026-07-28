import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const passwordHash = await hash('demo123456', 12);
  const user = await prisma.user.upsert({
    where: { email: 'vanhaitech.86@gmail.com' },
    update: {},
    create: {
      id: uuid(),
      email: 'vanhaitech.86@gmail.com',
      name: 'Demo User',
      passwordHash,
      role: 'user',
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // Create admin user
  const adminHash = await hash('admin123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@contentremix.ai' },
    update: {},
    create: {
      id: uuid(),
      email: 'admin@contentremix.ai',
      name: 'Admin',
      passwordHash: adminHash,
      role: 'admin',
    },
  });

  console.log(`✅ Created admin: ${admin.email}`);

  // Create sample project
  const project = await prisma.project.create({
    data: {
      id: uuid(),
      userId: user.id,
      title: 'Video Review Sản Phẩm Mới',
      description: 'Tạo video review sản phẩm từ nội dung gốc',
      status: 'in_progress',
      platform: 'tiktok',
    },
  });

  console.log(`✅ Created project: ${project.title}`);

  // Create source media
  await prisma.sourceMedia.create({
    data: {
      id: uuid(),
      projectId: project.id,
      sourceType: 'url',
      sourceUrl: 'https://www.youtube.com/watch?v=example123',
      platform: 'youtube',
      videoId: 'example123',
      title: 'Video Gốc - Hướng Dẫn Marketing',
      duration: 300,
      language: 'vi',
      isPublic: true,
      consentGiven: true,
    },
  });

  // Create transcript
  const transcript = await prisma.transcript.create({
    data: {
      id: uuid(),
      projectId: project.id,
      fullText: 'Xin chào các bạn! Hôm nay mình sẽ chia sẻ với các bạn 5 bí quyết marketing hiệu quả nhất trong năm 2024. Bí quyết đầu tiên là tập trung vào nội dung chất lượng. Thay vì đăng nhiều bài viết chung chung, hãy tạo ra những nội dung thực sự giá trị cho khán giả. Bí quyết thứ hai là xây dựng cộng đồng. Đừng chỉ bán hàng, hãy tạo mối quan hệ với khách hàng. Bí quyết thứ ba là sử dụng video ngắn. TikTok và YouTube Shorts đang là xu hướng. Bí quyết thứ tư là cá nhân hóa nội dung cho từng phân khúc khách hàng. Và cuối cùng, bí quyết thứ năm là đo lường và tối ưu liên tục.',
      language: 'vi',
      source: 'manual',
      confidence: 0.95,
      status: 'completed',
    },
  });

  // Create transcript segments
  const segments = [
    { start: 0, end: 5, text: 'Xin chào các bạn!', speaker: 'Host' },
    { start: 5, end: 15, text: 'Hôm nay mình sẽ chia sẻ với các bạn 5 bí quyết marketing hiệu quả nhất trong năm 2024.', speaker: 'Host' },
    { start: 15, end: 30, text: 'Bí quyết đầu tiên là tập trung vào nội dung chất lượng. Thay vì đăng nhiều bài viết chung chung, hãy tạo ra những nội dung thực sự giá trị cho khán giả.', speaker: 'Host' },
    { start: 30, end: 45, text: 'Bí quyết thứ hai là xây dựng cộng đồng. Đừng chỉ bán hàng, hãy tạo mối quan hệ với khách hàng.', speaker: 'Host' },
    { start: 45, end: 55, text: 'Bí quyết thứ ba là sử dụng video ngắn. TikTok và YouTube Shorts đang là xu hướng.', speaker: 'Host' },
    { start: 55, end: 70, text: 'Bí quyết thứ tư là cá nhân hóa nội dung cho từng phân khúc khách hàng.', speaker: 'Host' },
    { start: 70, end: 85, text: 'Và cuối cùng, bí quyết thứ năm là đo lường và tối ưu liên tục.', speaker: 'Host' },
  ];

  for (let i = 0; i < segments.length; i++) {
    await prisma.transcriptSegment.create({
      data: {
        id: uuid(),
        transcriptId: transcript.id,
        segmentIndex: i,
        startTime: segments[i].start,
        endTime: segments[i].end,
        text: segments[i].text,
        speaker: segments[i].speaker,
        confidence: 0.95,
      },
    });
  }

  console.log(`✅ Created transcript with ${segments.length} segments`);

  // Create content analysis
  await prisma.contentAnalysis.create({
    data: {
      id: uuid(),
      projectId: project.id,
      mainTopic: 'Marketing hiệu quả 2024',
      targetAudience: 'Nhà sáng tạo nội dung, nhân viên marketing, chủ doanh nghiệp nhỏ',
      videoGoal: 'Giáo dục và chia sẻ kiến thức marketing',
      hookOpening: 'Câu hỏi trực tiếp về vấn đề marketing',
      painPoints: JSON.stringify(['Không biết cách marketing hiệu quả', 'Tốn thời gian tạo nội dung', 'Không có chiến lược rõ ràng']),
      viewerInsights: JSON.stringify(['Muốn tăng doanh thu', 'Cần hướng dẫn cụ thể', 'Thích nội dung ngắn gọn']),
      mainPromise: '5 bí quyết marketing hiệu quả giúp tăng trưởng',
      arguments: JSON.stringify(['Nội dung chất lượng', 'Xây dựng cộng đồng', 'Video ngắn', 'Cá nhân hóa', 'Đo lường liên tục']),
      evidence: JSON.stringify(['Xu hướng TikTok/Shorts', 'Tâm lý khách hàng', 'Dữ liệu marketing']),
      narrativeRhythm: 'Listicle - đánh số từng bí quyết',
      contentStructure: JSON.stringify({ intro: '0-15s', body: '15-70s', outro: '70-85s' }),
      dominantEmotion: 'Tích cực, động lực',
      callToAction: 'Follow để xem thêm nội dung marketing',
      sectionTimings: JSON.stringify([
        { section: 'Mở đầu', start: 0, end: 15 },
        { section: 'Bí quyết 1-2', start: 15, end: 45 },
        { section: 'Bí quyết 3-5', start: 45, end: 70 },
        { section: 'Kết luận', start: 70, end: 85 },
      ]),
      status: 'completed',
    },
  });

  console.log('✅ Created content analysis');

  // Create subscription for demo user
  await prisma.subscription.create({
    data: {
      id: uuid(),
      userId: user.id,
      plan: 'starter',
      status: 'active',
      credits: 100,
      creditsUsed: 12,
    },
  });

  console.log('✅ Created subscription');

  // Create audit log
  await prisma.auditLog.create({
    data: {
      id: uuid(),
      userId: user.id,
      action: 'project.create',
      resource: 'project',
      resourceId: project.id,
      details: JSON.stringify({ title: project.title }),
    },
  });

  console.log('✅ Created audit log');

  // Create consent record
  await prisma.consentRecord.create({
    data: {
      id: uuid(),
      userId: user.id,
      projectId: project.id,
      consentType: 'content_usage',
      granted: true,
      details: 'Người dùng xác nhận sở hữu hoặc có quyền sử dụng nội dung',
    },
  });

  console.log('✅ Created consent record');

  console.log('\n🎉 Seeding complete!');
  console.log('\n📋 Demo credentials:');
  console.log('   Email: vanhaitech.86@gmail.com');
  console.log('   Password: demo123456');
  console.log('\n📋 Admin credentials:');
  console.log('   Email: admin@contentremix.ai');
  console.log('   Password: admin123456');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
