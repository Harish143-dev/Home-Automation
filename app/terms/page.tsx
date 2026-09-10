import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | AT Smart Living',
  description: 'Terms and conditions for AT Smart Living services and products.',
};

export default function TermsPage() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-background pt-32 pb-24 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto w-full">
        
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground text-balance">
            Terms and Conditions
          </h1>
          <div className="w-full h-px bg-black/10 mt-12" />
        </div>
        
        <div className="space-y-10 md:space-y-12 text-base md:text-lg font-light leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">1. Defect Liability Period</h2>
            <p>A Defect Liability Period (DLP) of 12 months from the date of handover or 18 months from the date of invoice, whichever is earlier, shall apply. During this period, any defective product will be replaced, and free on-site service will be provided.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">2. Product Warranty</h2>
            <p>Warranty on the product shall be applicable as per the respective OEM's (Original Equipment Manufacturer) warranty statement. In general, this would be 12 months from handover or 18 months from invoicing whichever is earlier. Please note that the OEM Product warranty covers replacement of product as per OEM terms. This does not Cover cost of service, on site support etc.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">3. Payment for Material</h2>
            <p className="mb-3">Payment for material will be through RTGS/Cheque.</p>
            <ul className="list-[lower-alpha] pl-6 space-y-2">
              <li>50% Advance.</li>
              <li>50% against Pro-Forma Invoice before dispatch the material.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">4. Commissioning & Programming Charges</h2>
            <p>For Local Commissioning and Programming charges (in INR) to be paid on prorata basis.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">5. Quote Validity</h2>
            <p>Quote is valid till one month.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">6. Taxes on Supply of Material</h2>
            <p>Taxes on Supply of Material Amount will be extra as per actual.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">7. Taxes on Installation</h2>
            <p>Taxes on Installation, Testing, Commissioning and programming will be extra as per actual.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">8. Delivery</h2>
            <p>Delivery will be 20-24 weeks after receipt of confirmed order and advance.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">9. Installation Wiring</h2>
            <p>Your electrical contractor using the wiring diagram provided by us will do installation wiring, Conduiting, Panel Mounting on wall etc. After that we will do the programming and commissioning.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">10. Commissioning Visits</h2>
            <p>Please note that as part of commissioning, 3 free visits including pre-commissioning visit, commissioning visit and final scene setting visit are included. However, any extra visits for phase wise commissioning (if site is not ready for. E.g.), or for extra scene setting visits, will be charged at Rs. 7500/- Per visit.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">11. BOM Exchange Rate</h2>
            <p>The BOM is based upon current US/INR exchange rate. The price of BOM would vary dependent upon the INR/USD exchange rate at the time of finalization of order.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">12. Timely Settlement</h2>
            <p>Please ensure timely settlement of the proforma invoice upon receipt of our intimation, within 1 week. Failure to comply will result in additional charges, that is a weekly inventory cost of 0.5% to the total material cost after 1 week of intimation.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">13. Dispatch</h2>
            <p>Following payment clearance, the material will be dispatched within 1 week of receiving the payment.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">14. Advances</h2>
            <p>Any advances given will be non-refundable.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-4">15. Delays in Installation</h2>
            <p>In case of delays in installation and commissioning due to site not being ready, charges over and above agreed upon would be applicable. These charges after 12 months of material supplied ( in case site not being ready) would amount to 3% escalation cost per month on installation charges - starting 1 year from the date of delivery.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl text-foreground mb-6">16. Material Return Policy</h2>
            
            <div className="space-y-8 pl-4 border-l-2 border-black/5">
              <div>
                <h3 className="font-medium text-foreground mb-2">1. Customised/Bespoke Materials:</h3>
                <p>As customized or bespoke materials are crafted/procured to your exact specifications, they are not eligible for return.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">2. Non-Customised Materials:</h3>
                <p className="mb-4">We aim to accommodate changes wherever possible. Returns for non-customised materials will be accepted under the following conditions:</p>
                <ul className="list-[lower-alpha] pl-6 space-y-2 mb-6">
                  <li>A 25% restocking charge will apply.</li>
                  <li>The material must be in pristine condition, free from any damage, and returned in its original packaging.</li>
                </ul>
                <p>We kindly request you to submit a credit note request (if any) within the same financial year in which the invoice was generated to enable a refund of the GST charged on the invoice.</p>
              </div>
            </div>
          </section>

          <section>
            <p className="font-medium text-foreground bg-black/5 p-6 rounded-xl">
              Warranty is applicable only for systems commissioned by Anusha Technovision's factory-trained team. Systems commissioned by others will not be covered under warranty.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
