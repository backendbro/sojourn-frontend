import Image from "next/image";

export default () => {
  return (
    <div className="w-full">
      <div className="space-y-6">
        <h1 className="text-[45px] font-[700]">Safety tips for partners</h1>
        <p className="text-[24px] text-[#000000]">
          Tips to ensure that you and your property are protected
        </p>
        <p className="text-[24px] text-[#000000]">
          We take our partners' safety seriously at Sojourn. We strive to help
          you welcome high quality guests: we have an in-depth security process
          which includes verification and fraud checks.
        </p>
        <p className="text-[24px] text-[#000000]">
          It’s always important to be prepared, and that’s why we also encourage
          you to take precautions for your personal safety as a host. Here are
          some tips to ensure your hosting experience goes smoothly.
        </p>
      </div>
      <div className="w-full grid gap-8 my-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Questions about hosting?
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              Our Partner Hub has answers to your most pressing questions. It
              covers everything from how to find reservation information to how
              to update your property’s availability. Through tutorials, guides
              and videos, this platform is where you’ll find the help you need
              to manage your partnership with Sojourn.
            </p>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              View Partner Hub
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
              COVID-19 resources
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              We’ve prepared some useful guidelines and tools to support you in
              mitigating potential health risks and to help safeguard the
              wellbeing of staff and guests at your property.
            </p>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Covid-19 Resources
            </button>
          </div>
        </div>
      </div>
      <section className="space-y-10 py-10">
        <h3 className="text-[#000000] text-[35px] font-[600]">
          Stay safe as a host
        </h3>
        <div className="w-full min-h-[500px] grid grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-2">
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
                Set clear expectations
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                When you’re setting up your host profile, be clear and
                informative about the features of your property and the
                surrounding area. If you are renting out your private home, you
                may want to welcome guests on arrival and to show them around.
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700]  mb-4">
                Get to know who is coming
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                Use our messaging system to talk to your guests prior to their
                stay. This is an opportunity to give both you and your guests
                peace of mind and to provide extra information (such as how to
                check in). Don’t be afraid to ask questions about the number of
                guests coming, the purpose of their trip, or if it’s their first
                time renting a property. We strongly advise you not to give out
                your personal contact information to a guest until you’ve met –
                try to keep all communication within our platform.
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700]  mb-4">
                Establish house rules
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
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700]  mb-4">
                Set your guest requirements
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
      <div className="space-y-6 py-10">
        <h3 className="text-[#000000] text-[35px] font-[600]">
          Keep your guests safe
        </h3>
        <p className="text-[15px] text-[#000000]">
          Here are some suggestions to prepare your property for your guests’
          safety. Remember, you may need to take additional precautions
          depending on individual circumstances.
        </p>
        <ul className="w-full font-[400] text-[#000000] text-[15px] sm:w-1/2">
          <li>
            If you are renting out your home, inform your neighbours prior to
            accepting guests.
          </li>
          <li>
            Provide your guests important local information like the telephone
            numbers of emergency services, and food and drinking water
            regulations.
          </li>
        </ul>
      </div>
      <div className="w-full grid gap-8 my-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Fire and CO Prevention
            </h4>
            <ul className="font-[400] text-[#000000] text-[15px]">
              <li>
                Make sure your emergency exit is visible, that there is nothing
                obstructing it and that it is outlined in your property
                evacuation plan.
              </li>
              <li>
                Keep a fire extinguisher in an easily accessible place and check
                it regularly. Install smoke and CO detectors on all floors, and
                consider a sprinkler system.
              </li>
              <li>
                Make sure your gas cookers, water heaters and other electricity
                appliances are regularly cleaned and checked. Also make sure the
                valve to shut off the gas is easily accessible.
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Electrical safety and hazards
            </h4>
            <ul className="font-[400] text-[#000000] text-[15px]">
              <li>Cover unused electrical outlets with safety caps.</li>
              <li>
                Check your appliances regularly for faulty switches, plugs and
                frayed cord
              </li>
              <li>
                Replace cord and wires once they get old, and keep them
                uncovered, away from other items.
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Childproofing
            </h4>
            <ul className="font-[400] text-[#000000] text-[15px]">
              <li>
                Install child-safety locks and removable gates for doors,
                windows, drawers, appliances and any falling hazards.
              </li>
              <li>
                Double-check banisters and railings of all stairs, balconies,
                porches and walkways to ensure that they’re sturdy and
                well-mounted.
              </li>
              <li>
                Provide your guests with contact information for local emergency
                rooms and paediatric centres.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="space-y-10 py-10">
        <h3 className="text-[#000000] text-[35px] font-[600]">
          Keep your property safe
        </h3>
        <div className="w-full min-h-[500px] grid gap-10 md:grid-cols-1  lg:grid-cols-2">
          <div className="w-full h-full flex flex-col space-y-6">
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700] mb-4">
                Prepare your property
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                Put valuable or particularly personal belongings in a safe place
                if you are renting out your private home. If you want additional
                reassurance that your property is protected and guest
                expectations are managed, you can also set up a damage deposit
                policy.
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-[#000000] text-[24px] font-[700]  mb-4">
                Check your insurance
              </h4>
              <p className="font-[400] text-[#000000] text-[15px]">
                The chances of guests damaging your property are extremely low
                but it’s smart to insure yourself against the unexpected.
                Regular homeowner insurance doesn’t always cover short-term
                rentals to others, so contact your insurance provider to check
                if you need additional coverage.
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
      <div className="w-full grid gap-8 my-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Guest misconduct
            </h4>
            <ul className="font-[400] text-[#000000] text-[15px]">
              <li>
                Report it to law enforcement first: In case of abusive behaviour
                from a guest, either verbal or physical, please contact law
                enforcement officials immediately. Please hold onto any police
                reports or other documents you may receive, this may be helpful
                for the future of your case.
              </li>
              <li>
                Then report it to us: In the unlikely event of abusive
                behaviour, misconduct by the guest or other illegal activities,
                it’s important for us to know. Please report it to us so we can
                help to protect you and our other partners in future.
              </li>
            </ul>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Report to Sojourn.ng
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Keeping your damage deposit
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              If you’ve already collected a damage deposit, you are within your
              rights to keep it in cases where the damage is proven to be caused
              by the guest.
            </p>
            <button className="outline-none border px-4 py-2 font-[600] rounded-3xl border-golden-orange">
              Contact Customer Service
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <h4 className="text-[#000000] text-[24px] font-[700]">
              Disaster relief efforts
            </h4>
            <p className="font-[400] text-[#000000] text-[15px]">
              We are constantly looking into new ways to support our partners
              and guests when things go wrong. Our team works with government
              officials and organisations all around the world to support relief
              efforts on the ground. Whenever there is a natural disaster or
              severe, security-related event, Sojourn will assess the impact the
              event has had on you as part of our crisis response. You can
              expect us to contact you to determine if you are OK (and are still
              able to welcome guests).
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
