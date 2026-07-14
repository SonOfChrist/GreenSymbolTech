interface InquiryNotificationData {
  id: string;
  fullNameTitle: string;
  companyName: string;
  country: string;
  phone: string;
  email: string;
  solutionCategory: string;
  partnerProduct: string;
  projectScope: string;
  inquiryType: string;
  source?: string;
}

export async function sendInquiryNotifications(inquiry: InquiryNotificationData) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const notificationTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const thankYouTemplateId = import.meta.env.VITE_EMAILJS_THANKYOU_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const recipientEmail = import.meta.env.VITE_INQUIRY_RECIPIENT || 'support@greensymboltechnology.com';

  if (!serviceId || !notificationTemplateId || !publicKey) {
    console.info('EmailJS notification settings are not configured. Skipping email delivery.');
    return { ok: false, reason: 'missing-config' };
  }

  try {
    if (typeof window === 'undefined') {
      return { ok: false, reason: 'server-side' };
    }

    const emailjsModule = await import('emailjs-com').catch(() => null);

    if (!emailjsModule) {
      console.info('EmailJS package is not installed. Skipping notification email delivery.');
      return { ok: false, reason: 'package-missing' };
    }

    const emailjs = emailjsModule as { send: (serviceId: string, templateId: string, templateParams: Record<string, unknown>, options?: { publicKey?: string }) => Promise<unknown> };

    const adminTemplateData = {
      to_email: recipientEmail,
      inquiry_id: inquiry.id,
      full_name: inquiry.fullNameTitle,
      company_name: inquiry.companyName,
      country: inquiry.country,
      phone: inquiry.phone,
      email: inquiry.email,
      solution_category: inquiry.solutionCategory,
      partner_product: inquiry.partnerProduct,
      project_scope: inquiry.projectScope,
      inquiry_type: inquiry.inquiryType,
      source: inquiry.source || 'website',
    };

    await emailjs.send(serviceId, notificationTemplateId, adminTemplateData, { publicKey });

    if (thankYouTemplateId && inquiry.email) {
      await emailjs.send(
        serviceId,
        thankYouTemplateId,
        {
          to_name: inquiry.fullNameTitle || inquiry.companyName || 'there',
          to_email: inquiry.email,
          company_name: inquiry.companyName,
        },
        { publicKey }
      );
    }

    return { ok: true };
  } catch (error) {
    console.error('Failed to send inquiry notifications:', error);
    return { ok: false, reason: 'send-error', error };
  }
}
