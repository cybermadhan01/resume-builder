import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Introduction</h2>
            <p>
              At ATSResume, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our website and services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Create an account and use our services</li>
              <li>Fill out forms or surveys</li>
              <li>Send us communications</li>
              <li>Upload content to our platform</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name, email address, and contact details</li>
              <li>Professional information included in your resume</li>
              <li>Account login credentials</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>
            
            <h3>Automatically Collected Information</h3>
            <p>
              When you access our platform, we may automatically collect certain information about your device and usage,
              including:
            </p>
            <ul>
              <li>IP address and device type</li>
              <li>Browser type and operating system</li>
              <li>Usage data and browsing patterns</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send administrative information and service updates</li>
              <li>Respond to inquiries and offer support</li>
              <li>Understand user preferences to enhance user experience</li>
              <li>Develop new products, services, and features</li>
              <li>Prevent fraudulent activities and security breaches</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2>4. Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers who assist us in operating our platform</li>
              <li>Business partners with your consent</li>
              <li>Legal authorities when required by law</li>
              <li>Affiliated companies, as part of our regular business operations</li>
            </ul>
            <p>
              We will not sell or rent your personal information to third parties for marketing purposes without your
              explicit consent.
            </p>
            
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information.
              However, no method of transmission over the Internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security.
            </p>
            
            <h2>6. Your Privacy Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Objection to or restriction of certain processing activities</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
            
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and store certain
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our service is not directed to children under the age of 16. We do not knowingly collect personal
              information from children under 16. If we learn we have collected personal information from a child
              under 16, we will delete such information.
            </p>
            
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>10. Contact Information</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at privacy@atsresume.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;