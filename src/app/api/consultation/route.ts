import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;
    const message = formData.get('message') as string;
    const tattooImages = formData.getAll('tattooImages') as File[];

    const consultationData = {
      name,
      email,
      phone,
      location,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('consultations')
      .insert([consultationData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    const imageAttachments = await Promise.all(
      tattooImages.map(async (file, index) => {
        const buffer = await file.arrayBuffer();
        return {
          filename: `tattoo_${index + 1}_${file.name}`,
          content: Buffer.from(buffer),
          contentType: file.type
        };
      })
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL || 'consultation@saesal.com',
      subject: `새로운 상담 신청 - ${name}`,
      html: `
        <h2>새로운 타투 제거 상담 신청</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>전화번호:</strong> ${phone}</p>
        <p><strong>위치:</strong> ${location}</p>
        <p><strong>상담 내용:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${message}</p>
        <p><strong>첨부된 타투 이미지:</strong> ${tattooImages.length}장</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          이 이메일은 SæsaL 웹사이트의 상담 신청 폼을 통해 자동으로 전송되었습니다.<br>
          신청 시간: ${new Date().toLocaleString('ko-KR')}
        </p>
      `,
      attachments: imageAttachments
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Consultation request sent successfully'
    });

  } catch (error) {
    console.error('API Route error:', error);
    return NextResponse.json(
      { error: 'Failed to send consultation request' },
      { status: 500 }
    );
  }
}