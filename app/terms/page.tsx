import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | AT Smart Living',
  description: 'Terms and conditions for AT Smart Living services and products.',
};

export default function TermsPage() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-background pt-32 pb-24 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto w-full">

        <header className="mb-12">
          <h1 className="text-foreground text-balance">
            Terms and Conditions
          </h1>
          <div className="w-full h-px bg-foreground/10 mt-12" />
        </header>

        <article className="text-base md:text-lg font-light leading-relaxed text-foreground/80">

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">1. Defect Liability Period</h3>
            <p>A Defect Liability Period (DLP) of 12 months from the date of handover or 18 months from the date of invoice, whichever is earlier, shall apply. During this period, any defective product will be replaced, and free on-site service will be provided.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">2. Product Warranty</h3>
            <p>Warranty on the product shall be applicable as per the respective OEM's (Original Equipment Manufacturer) warranty statement. In general, this would be 12 months from handover or 18 months from invoicing whichever is earlier. Please note that the OEM Product warranty covers replacement of product as per OEM terms. This does not Cover cost of service, on site support etc.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">3. Payment for Material</h3>
            <p>Payment for material will be through RTGS/Cheque.</p>
            <ul className="list-[lower-alpha] pl-6 space-y-2 mt-1">
              <li>50% Advance.</li>
              <li>50% against Pro-Forma Invoice before dispatch the material.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">4. Commissioning & Programming Charges</h3>
            <p>For Local Commissioning and Programming charges (in INR) to be paid on prorata basis.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">5. Quote Validity</h3>
            <p>Quote is valid till one month.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">6. Taxes on Supply of Material</h3>
            <p>Taxes on Supply of Material Amount will be extra as per actual.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">7. Taxes on Installation</h3>
            <p>Taxes on Installation, Testing, Commissioning and programming will be extra as per actual.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">8. Delivery</h3>
            <p>Delivery will be 20-24 weeks after receipt of confirmed order and advance.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">9. Installation Wiring</h3>
            <p>Your electrical contractor using the wiring diagram provided by us will do installation wiring, Conduiting, Panel Mounting on wall etc. After that we will do the programming and commissioning.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">10. Commissioning Visits</h3>
            <p>Please note that as part of commissioning, 3 free visits including pre-commissioning visit, commissioning visit and final scene setting visit are included. However, any extra visits for phase wise commissioning (if site is not ready for. E.g.), or for extra scene setting visits, will be charged at Rs. 7500/- Per visit.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">11. BOM Exchange Rate</h3>
            <p>The BOM is based upon current US/INR exchange rate. The price of BOM would vary dependent upon the INR/USD exchange rate at the time of finalization of order.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">12. Timely Settlement</h3>
            <p>Please ensure timely settlement of the proforma invoice upon receipt of our intimation, within 1 week. Failure to comply will result in additional charges, that is a weekly inventory cost of 0.5% to the total material cost after 1 week of intimation.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">13. Dispatch</h3>
            <p>Following payment clearance, the material will be dispatched within 1 week of receiving the payment.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">14. Advances</h3>
            <p>Any advances given will be non-refundable.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">15. Delays in Installation</h3>
            <p>In case of delays in installation and commissioning due to site not being ready, charges over and above agreed upon would be applicable. These charges after 12 months of material supplied ( in case site not being ready) would amount to 3% escalation cost per month on installation charges - starting 1 year from the date of delivery.</p>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <h3 className="text-foreground">16. Material Return Policy</h3>

            <div className="flex flex-col gap-2 mb-5 pl-5 md:pl-6 border-l border-foreground/10">
              <div className="flex flex-col gap-2 md:gap-3">
                <h4 className="text-foreground font-medium">1. Customised/Bespoke Materials:</h4>
                <p>As customized or bespoke materials are crafted/procured to your exact specifications, they are not eligible for return.</p>
              </div>

              <div className="flex flex-col gap-2 md:gap-3">
                <h4 className="text-foreground font-medium">2. Non-Customised Materials:</h4>
                <p>We aim to accommodate changes wherever possible. Returns for non-customised materials will be accepted under the following conditions:</p>
                <ul className="list-[lower-alpha] pl-6 space-y-2">
                  <li>A 25% restocking charge will apply.</li>
                  <li>The material must be in pristine condition, free from any damage, and returned in its original packaging.</li>
                </ul>
                <p className="mt-1">We kindly request you to submit a credit note request (if any) within the same financial year in which the invoice was generated to enable a refund of the GST charged on the invoice.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 md:pt-12">
            <div className="bg-foreground/[0.02] border border-foreground/5 p-6 md:p-8 rounded-2xl">
              <p className="font-medium text-foreground text-center leading-relaxed text-balance">
                Warranty is applicable only for systems commissioned by Anusha Technovision's factory-trained team. Systems commissioned by others will not be covered under warranty.
              </p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
