import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CookiesPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3">What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you browse websites. 
                They are widely used to make websites work more efficiently and provide information to the owners of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">How We Use Cookies</h2>
              <p>
                We use cookies for several reasons. Some cookies are necessary for technical reasons for our website to operate,
                and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target
                the interests of our users to enhance the experience on our website.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off. They are usually set in response to actions made by you such as logging in or filling in forms.</li>
                <li><strong>Analytics Cookies:</strong> These help us improve our website by collecting and reporting information on how you use it.</li>
                <li><strong>Functional Cookies:</strong> These enable enhanced functionality such as remembering your preferences.</li>
                <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser. You can also use your browser settings to delete cookies that have already been set.
              </p>
              <p className="mt-3">
                Please note that by deleting or disabling future cookies, you may not be able to access certain areas or features of our site, and it may reduce the functionality of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at support@resumebuilder.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Changes to Our Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
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

export default CookiesPolicyPage;