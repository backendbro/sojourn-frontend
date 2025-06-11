import { EMMERGENCY_CONTACTS } from "@/constants";
import Image from "next/image";
import PhoneIcon from "../svgs/PhoneIcon";

export default () => {
  return (
    <div className="w-full">
      <div className="space-y-6">
        <h1 className="text-[45px] font-[700]">Safety tips for travellers</h1>
        <p className="text-[24px] text-[#000000]">
          We are constantly evaluating online threats and strengthening our
          security in order to stay ahead. We use established security
          procedures to protect your Sojourn account.
        </p>
      </div>
      <div className="w-full grid gap-8 my-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              How to stay safe online
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              As a user of our platform, you can keep your accounts and identity
              protected by looking out for emails that contain links and/or
              attachments, emails that ask you to sign in, or emails that ask
              you to enter personal or financial information. Fraudsters might
              also try to access your personal or financial information by
              calling you, which is a technique called social engineering.
            </p>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Report to Sojourn.ng
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Enable 2FA on your account
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              2FA (2-factor authentication) adds an additional layer of security
              to your account. In the event that your username and password are
              compromised, Sojourn will send a unique verification code to your
              mobile device which must be submitted prior to granting access to
              your account.
            </p>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Go to Account Settings
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Customer Service
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              Please keep in mind that our Customer Service representatives will
              only ever ask you to share your reservation ID and/or reservation
              PIN code. You should not be asked to provide any sensitive
              financial information, such as your credit card number.
            </p>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Contact Customer Service
            </button>
          </div>
        </div>
      </div>
      <section className="space-y-10 py-10">
        <h3 className="text-[#000000] text-[35px] font-[600]">
          Choosing a safe destination
        </h3>
        <div className="w-full min-h-[500px] grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="w-full h-[300px] relative md:h-[500px] lg:h-full">
            <Image
              src="/assets/imgs/safety-1.png"
              alt="real estate project"
              fill
            />
          </div>
          <div className="w-full h-full flex flex-col space-y-6">
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Check the local requirements
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                In some countries, your host may request either to keep a copy
                of your ID or to collect the original document as a deposit, due
                to tax purposes or local regulations. In some countries, you may
                be asked to show a marriage certificate in order to stay in the
                same room as your spouse.
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700]  mb-4">
                Check safety laws and regulations
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                It’s always a good idea to research government travel advisory
                information ahead of time or to check with your embassy for any
                travel warnings or special visa requirements. Be aware of the
                emergency services telephone number for your destination. Check
                the food and water regulations – before you drink tap water,
                make sure that it is safe
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700]  mb-4">
                Check restrictions due to Coronavirus (COVID-19)
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                As the world of travel continues to change, considerations about
                health and cleanliness are now front of mind more than ever
                before. The health and safety of our guests and the partners
                they stay with is a priority for us. That’s why we’ve put
                together some useful tips and helpful resources to give you
                peace of mind as you prepare for future trips.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-10 py-10">
        <h3 className="text-[#000000] text-[35px] font-[600]">
          Finding the right property
        </h3>
        <div className="w-full min-h-[500px] grid gap-10 md:grid-cols-1  lg:grid-cols-2">
          <div className="w-full h-full flex flex-col space-y-6">
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Check the property policies
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                Check the policy details of the property carefully before you
                book, including the payment and damage deposit policies and
                additional fees section. If a host asks you for a payment that
                is not outlined in the policy, don’t send it. No legitimate
                transaction (eg. payments and/or reservation changes) will ever
                require you to specifically pay with gift cards or require you
                to give your credit card details by phone, text message or
                email. You can find all the policies in the 'House Rules'
                section of the property you're considering (found above their
                photos on their property page).
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700]  mb-4">
                Read the reviews
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                Look at feedback from past travellers, including detailed
                reviews and ratings for things like cleanliness and facilities.
                Travellers can only leave a review after they’ve completed their
                stay, so you can feel confident that feedback is based on real
                experiences.
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Refine your search
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                Take advantage of multiple search filters – from price and
                property type, to facilities – to find the right fit for you.
                Pay special attention to the amenities, house rules, payment and
                cancellation policies when you read the property details. If
                you’re travelling with young children, make sure that there is
                sufficient childproofing at the property you’re booking.
              </p>
            </div>
          </div>
          <div className="w-full h-[300px] relative md:h-[500px] lg:h-full">
            <Image
              src="/assets/imgs/safety-1.png"
              alt="real estate project"
              fill
            />
          </div>
        </div>
      </section>
      <section className="space-y-10 py-10">
        <h3 className="text-[#000000] text-[35px] font-[600]">
          Preparing for your trip
        </h3>
        <div className="w-full min-h-[500px] grid gap-10 md:grid-cols-1  lg:grid-cols-2">
          <div className="w-full h-[300px] relative md:h-[500px] lg:h-full">
            <Image
              src="/assets/imgs/safety-1.png"
              alt="real estate project"
              fill
            />
          </div>
          <div className="w-full h-full flex flex-col space-y-6">
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Check your confirmation email
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                Find the correct information about prepayments, damage deposits
                and more in your Sojourn confirmation email. If you receive
                payment requests with a sense of urgency (eg. transfer the money
                to a bank account within 24 hours or the booking will be
                cancelled), or a property insists on communicating outside of
                the Sojourn platform, reach out to our Customer Service team for
                further support.
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Get to know your host
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                Get your questions answered before you book or stay. For certain
                properties, you can reach out through our 'Contact the host'
                option. Alternatively, you can leave the property a special
                request when you book. Always make sure to use our platform
                messaging system to make everything clearer for all involved.
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Note the available services
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                We have different property types (eg. apartments, bed and
                breakfasts and hotels) on our website. If you book a shared
                accommodation, you can expect other travellers to be present. If
                you book an apartment, please be aware that there may not be a
                24/7 reception.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-10 py-10">
        <h3 className="text-[#000000] text-[35px] font-[600]">
          Having an amazing trip
        </h3>
        <div className="w-full min-h-[500px] grid  gap-10 md:grid-cols-1  lg:grid-cols-2">
          <div className="w-full h-full flex flex-col space-y-6">
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Inspect the property on arrival
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                Check the policy details of the property carefully before you
                book, including the payment and damage deposit policies and
                additional fees section. If a host asks you for a payment that
                is not outlined in the policy, don’t send it. No legitimate
                transaction (eg. payments and/or reservation changes) will ever
                require you to specifically pay with gift cards or require you
                to give your credit card details by phone, text message or
                email. You can find all the policies in the 'House Rules'
                section of the pOnce you’ve arrived at your property, check
                where all relevant emergency equipment and safety information is
                located. If you’re not sure where something like the first aid
                kit or fire extinguisher is, don’t hesitate to ask your host.
                It’s always better to be prepared.roperty you're considering
                (found above their photos on their property page).
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Be considerate of the local community
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                While staying at the property or using other services with
                Sojourn, be considerate of the local community. Try to limit or
                minimise any noise that might disturb the neighbours, respect
                local laws or traditions and be mindful of your impact on the
                environment.
              </p>
            </div>
          </div>
          <div className="w-full h-[300px] relative md:h-[500px] lg:h-full">
            <Image
              src="/assets/imgs/safety-1.png"
              alt="real estate project"
              fill
            />
          </div>
        </div>
      </section>
      <section className="space-y-10 py-10">
        <div className="w-full w-full space-y-10">
          <h3 className="text-[#000000] text-[35px] font-[600]">
            What if something goes wrong
          </h3>
          <div className="w-full space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[600]">
              Nigeria Emergency phone numbers
            </h4>
            <ul className="w-full border border-golden-orange md:w-2/3 lg:w-1/3">
              {EMMERGENCY_CONTACTS.map(({ type, phone }, idx: number) => (
                <li
                  key={idx}
                  className="flex items-center w-full py-[8px] px-3 justify-between"
                >
                  <span>
                    <PhoneIcon size={20} />
                  </span>
                  <div className="w-5/6 flex items-center justify-between capitalize">
                    <span className="font-[400]">{type}</span>
                    <span className="font-[400]">{phone}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="w-full grid gap-8 my-20 md:grid-cols-1 lg:grid-cols-3">
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Incorrect charges
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              Reach out to your host through our messaging system or reach out
              to Customer Service. Remember, Sojourn should only be contacted
              through our official communication channels listed on our website
              and apps. No legitimate transaction (eg. payments and/or
              reservation changes) with Sojourn will ever require you to
              specifically pay with gift cards or require you to give your
              credit card details by phone, text message or email.
            </p>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Report to Sojourn.ng
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Misconduct
            </h4>
            <ul className="font-[400] text-[#000000] text-[15px]">
              <li>
                Report it to law enforcement first: In case of abusive behaviour
                from your host or a member of staff at the property – either
                verbal or physical – please contact law enforcement officials
                immediately.
              </li>
              <li>
                Then report it to us: In the unlikely event of abusive
                behaviour, misconduct by the host or a member of staff at the
                property or other illegal activities, it’s important for us to
                know. Please report it via Customer Service to help us to
                protect you and our other travellers in future.
              </li>
            </ul>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Contact Customer Service
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Lost and found
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              If you leave something behind at the property by mistake, contact
              the host via our messaging system immediately and ask for
              assistance.
            </p>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Message your host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
