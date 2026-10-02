import nodemailer from 'nodemailer';
import { env } from '../config/env';

type MailTransporter = ReturnType<typeof nodemailer.createTransport>;
let transporter: MailTransporter | null = null;

const getTransporter = () => {
  if (!transporter) {
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
      return null;
    }
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

export const sendLeadEmail = async (leadData: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  inquiryType?: string;
}) => {
  const mailClient = getTransporter();
  if (!mailClient || !env.ADMIN_EMAIL) {
    console.warn('[EmailService] SMTP not fully configured. Skipping email notification.');
    return false;
  }

  try {
    const info = await mailClient.sendMail({
      from: `"AT Smart Living Portal" <${env.SMTP_USER}>`,
      to: env.ADMIN_EMAIL,
      subject: `[New Lead] ${leadData.inquiryType || 'General'} - ${leadData.name}`,
      text: `New Lead Details:
Name: ${leadData.name}
Email: ${leadData.email}
Phone: ${leadData.phone || 'N/A'}
Inquiry Type: ${leadData.inquiryType || 'General'}

Message:
${leadData.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #333;">
          <h2 style="color: #8c1817; border-bottom: 2px solid #8c1817; padding-bottom: 8px;">New Customer Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Inquiry Type:</td><td style="padding: 8px;">${leadData.inquiryType || 'General'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${leadData.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${leadData.email}">${leadData.email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${leadData.phone || 'N/A'}</td></tr>
          </table>
          <div style="margin-top: 20px; background: #f9f9f9; padding: 15px; border-left: 4px solid #8c1817;">
            <strong style="display: block; margin-bottom: 8px;">Message:</strong>
            <p style="white-space: pre-wrap; margin: 0;">${leadData.message}</p>
          </div>
        </div>
      `,
    });

    console.log('[EmailService] Notification sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('[EmailService] Error sending lead email:', error);
    return false;
  }
};

export const sendCareerEmail = async (appData: {
  name: string;
  email: string;
  phone?: string | null;
  experience: string;
  position: string;
  message?: string | null;
  resumeUrl?: string | null;
}) => {
  const mailClient = getTransporter();
  if (!mailClient || !env.ADMIN_EMAIL) {
    return false;
  }

  try {
    const info = await mailClient.sendMail({
      from: `"AT Smart Living Portal" <${env.SMTP_USER}>`,
      to: env.ADMIN_EMAIL,
      subject: `[Job Application] ${appData.position} - ${appData.name}`,
      text: `New Career Application:
Candidate: ${appData.name}
Position: ${appData.position}
Experience: ${appData.experience}
Email: ${appData.email}
Phone: ${appData.phone || 'N/A'}
Resume: ${appData.resumeUrl || 'N/A'}

Message:
${appData.message || 'N/A'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #333;">
          <h2 style="color: #8c1817; border-bottom: 2px solid #8c1817; padding-bottom: 8px;">New Career Application</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px; font-weight: bold; width: 140px;">Position:</td><td style="padding: 8px;">${appData.position}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Experience:</td><td style="padding: 8px;">${appData.experience}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Candidate:</td><td style="padding: 8px;">${appData.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${appData.email}">${appData.email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${appData.phone || 'N/A'}</td></tr>
            ${appData.resumeUrl ? `<tr><td style="padding: 8px; font-weight: bold;">Resume Link:</td><td style="padding: 8px;"><a href="${appData.resumeUrl}">View Resume</a></td></tr>` : ''}
          </table>
          ${appData.message ? `
          <div style="margin-top: 20px; background: #f9f9f9; padding: 15px; border-left: 4px solid #8c1817;">
            <strong style="display: block; margin-bottom: 8px;">Cover Note:</strong>
            <p style="white-space: pre-wrap; margin: 0;">${appData.message}</p>
          </div>` : ''}
        </div>
      `,
    });

    console.log('[EmailService] Career notification sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('[EmailService] Error sending career email:', error);
    return false;
  }
};
