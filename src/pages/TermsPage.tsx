import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Terms and Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to ATSResume. These Terms and Conditions govern your use of our website and services.
              By accessing or using our website, you agree to be bound by these Terms and Conditions.
            </p>
            
            <h2>2. Definitions</h2>
            <ul>
              <li>"Service" refers to the ATSResume platform.</li>
              <li>"User" refers to any individual who accesses or uses the Service.</li>
              <li>"Content" refers to all information and materials uploaded or created through the Service.</li>
            </ul>
            
            <h2>3. User Accounts</h2>
            <p>
              When you create an account, you must provide accurate and complete information. You are responsible
              for maintaining the security of your account and password. You agree to notify us immediately of any
              unauthorized access to your account.
            </p>
            
            <h2>4. Intellectual Property Rights</h2>
            <p>
              The Service and its original content, features, and functionality are owned by ATSResume and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual property
              laws.
            </p>
            
            <h2>5. User Content</h2>
            <p>
              You retain all rights to your content. By uploading content to our platform, you grant us a
              non-exclusive, royalty-free license to use, modify, and display that content solely for the purpose
              of providing our services to you.
            </p>
            
            <h2>6. Prohibited Uses</h2>
            <p>
              You agree not to use the Service for any purpose that is unlawful or prohibited by these Terms.
              This includes but is not limited to:
            </p>
            <ul>
              <li>Using the Service in any manner that could damage, disable, overburden, or impair the site</li>
              <li>Attempting to gain unauthorized access to secure systems or other users' accounts</li>
              <li>Engaging in any fraudulent activity or impersonating another person</li>
            </ul>
            
            <h2>7. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, either express or implied.
              We do not guarantee that the Service will be uninterrupted, secure, or error-free.
            </p>
            
            <h2>8. Limitation of Liability</h2>
            <p>
              In no event shall ATSResume, its directors, employees, partners, agents, suppliers, or affiliates be liable
              for any indirect, incidental, special, consequential, or punitive damages resulting from your use or
              inability to use the Service.
            </p>
            
            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes
              by posting the new Terms on this page. Your continued use of the Service after such modifications
              constitutes your acceptance of the revised Terms.
            </p>
            
            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
              ATSResume is established, without regard to its conflict of law provisions.
            </p>
            
            <h2>11. Contact Information</h2>
            <p>
              If you have any questions or concerns about these Terms, please contact us at support@atsresume.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default TermsPage;