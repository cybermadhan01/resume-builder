import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const GDPRCompliancePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6">GDPR Compliance</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p>
                The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area. 
                At Resume Builder, we are committed to ensuring the security and protection of the personal information that we process, and to providing a compliant and consistent approach to data protection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Your Rights Under GDPR</h2>
              <p>Under the GDPR, you have the following rights:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Right to be informed</strong> - about the collection and use of your personal data</li>
                <li><strong>Right of access</strong> - to your personal data and supplementary information</li>
                <li><strong>Right to rectification</strong> - of inaccurate personal data</li>
                <li><strong>Right to erasure</strong> - of your personal data in certain circumstances</li>
                <li><strong>Right to restrict processing</strong> - of your personal data</li>
                <li><strong>Right to data portability</strong> - allowing you to obtain and reuse your personal data</li>
                <li><strong>Right to object</strong> - to processing based on legitimate interests, direct marketing, and research</li>
                <li><strong>Rights relating to automated decision making and profiling</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Data We Collect</h2>
              <p>
                We collect personal information that you provide to us, including:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Resume content and information</li>
                <li>Job descriptions for ATS checking</li>
                <li>Usage data and analytics</li>
              </ul>
              <p className="mt-3">
                We use this information to provide our resume building and ATS checking services, improve our platform, and communicate with you about your account and our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Data Protection Measures</h2>
              <p>We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Encryption of personal data</li>
                <li>Regular testing of security measures</li>
                <li>Access controls and authentication procedures</li>
                <li>Regular backups and data recovery procedures</li>
                <li>Staff training on data protection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Data Retention</h2>
              <p>
                We store your personal data for as long as your account is active or as needed to provide you with our services. 
                We may retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">International Data Transfers</h2>
              <p>
                Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ.
                We ensure that appropriate safeguards are in place to protect your personal data in accordance with GDPR requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have any questions about our GDPR compliance or wish to exercise any of your rights under GDPR, please contact our Data Protection Officer at dpo@resumebuilder.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Changes to This Policy</h2>
              <p>
                We may update our GDPR Compliance Policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
              <p className="mt-3">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default GDPRCompliancePage;