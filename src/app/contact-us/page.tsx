"use client";

import Spinner from "@/components/svgs/Spinner";
import Footer from "@/components/ui/footer";
import { contactUs } from "@/http/api";
import { ContactUsType } from "@/types/emails";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const defaultValues = {
  from: "",
  message: "",
  fullName: "",
  subject: "",
};

export default () => {
  const [state, setState] = useState<ContactUsType>(defaultValues);

  const mutation = useMutation({
    mutationKey: ["send-contact-us-email"],
    mutationFn: contactUs,
    onSuccess() {
      setState(defaultValues);
      toast("Email sent successfully", {
        closeButton: true,
      });
    },

    onError() {
      toast("Email was not sent", {
        closeButton: true,
      });
    },
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!state.from || !state.fullName || !state.message || !state.subject) {
      return;
    }
    mutation.mutate(state);
  }

  return (
    <>
      <div className="section-contact-header">
        <div className="container-regular-about p-0">
          <div
            data-w-id="75900ed7-623c-10e4-caa5-54120fc026a0"
            className="w-layout-grid header-title-grid about-one"
          >
            <div
              id="w-node-_75900ed7-623c-10e4-caa5-54120fc026a1-b7cd893c"
              className="header-content"
            >
              <h2 className="heading-about  about-three font-sans">
                Contact Us
              </h2>
            </div>
            <div
              id="w-node-_75900ed7-623c-10e4-caa5-54120fc026a4-b7cd893c"
              className="header-subheading-wrap"
            ></div>
            <h3
              id="w-node-_75900ed7-623c-10e4-caa5-54120fc026a5-b7cd893c"
              className="lower-contact  about-three font-sans"
            >
              If you have any questions or concerns regarding these Terms and
              Conditions, please contact us
            </h3>
          </div>
          <div
            data-w-id="75900ed7-623c-10e4-caa5-54120fc026a7"
            className="header-bottom-wrap about-one"
          ></div>
        </div>
        <div
          data-w-id="75900ed7-623c-10e4-caa5-54120fc026b6"
          className="about-header-bg about-one"
        ></div>
        <section className="combine-section_team3">
          <div className="sojj-contact-head">
            <div className="combine-padding-section-medium-2">
              <div className="uui-text-align-center-copy">
                <div className="uui-max-width-large align-center">
                  <h2 className="sojourn_head font-sans">Get in touch</h2>
                </div>
              </div>
              <div className="combine-container-small-2">
                <div className="combine-text-align-center-2">
                  <div className="soj-contsub font-sans">
                    If you have any questions or concerns regarding these Terms
                    and Conditions, please contact us
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="uui-section_contact05">
          <div className="uui-page-padding-4">
            <div className="uui-container-large-4">
              <div className="uui-padding-vertical-xhuge-4">
                <section className="uui-section_testimonial08">
                  <div className="uui-page-padding-4">
                    <div className="uui-container-large-4"></div>
                  </div>
                </section>
                <div className="w-layout-grid uui-contact05_component">
                  <div className="uui-contact05_content">
                    <div className="uui-contact05_form-wrapper w-form">
                      <form
                        onSubmit={onSubmit}
                        id="wf-form-Contact-05-form"
                        name="wf-form-Contact-05-form"
                        data-name="Contact 05 form"
                        method="post"
                        className="uui-contact05_form"
                        data-wf-page-id="663cc5b081e30522b7cd893c"
                        data-wf-element-id="7ac554bc-9531-36ed-c5cf-1a5c4bbcfa10"
                      >
                        <div className="uui-form-field-wrapper">
                          <label
                            htmlFor="Contact-05-name"
                            className="uui-field-label font-sans"
                          >
                            Name
                          </label>
                          <input
                            className="uui-form_input w-input font-sans text-[16px]"
                            maxLength={256}
                            name="subject"
                            data-name="Contact 05 name"
                            placeholder="Subject"
                            type="text"
                            onChange={handleChange}
                            value={state.subject}
                            id="Contact-05-name"
                            required
                          />
                        </div>
                        <div className="uui-form-field-wrapper">
                          <label
                            htmlFor="Contact-05-email"
                            className="uui-field-label font-sans"
                          >
                            Email
                          </label>
                          <input
                            className="uui-form_input w-input font-sans text-[16px]"
                            maxLength={256}
                            name="from"
                            data-name="Contact 05 email"
                            placeholder="Email"
                            type="email"
                            value={state.from}
                            onChange={handleChange}
                            id="Contact-05-email"
                            required
                          />
                        </div>
                        <div className="uui-form-field-wrapper">
                          <label
                            htmlFor="Contact-05-name-2"
                            className="uui-field-label font-sans"
                          >
                            Name
                          </label>
                          <input
                            className="uui-form_input w-input font-sans text-[16px]"
                            maxLength={256}
                            name="fullName"
                            data-name="Contact 05 Name 2"
                            placeholder="Full name"
                            type="text"
                            value={state.fullName}
                            onChange={handleChange}
                            id="Contact-05-name-2"
                            required
                          />
                        </div>
                        <div className="uui-form-field-wrapper">
                          <label
                            htmlFor="Contact-05-message"
                            className="uui-field-label font-sans"
                          >
                            Message
                          </label>
                          <textarea
                            id="Contact-05-message"
                            name="message"
                            value={state.message}
                            onChange={handleChange}
                            maxLength={5000}
                            data-name="Contact 05 message"
                            placeholder="Type your message..."
                            required
                            className="uui-form_input text-area w-input font-sans"
                          ></textarea>
                        </div>
                        <div
                          id="w-node-_7ac554bc-9531-36ed-c5cf-1a5c4bbcfa24-b7cd893c"
                          className="uui-form-button-wrapper"
                        >
                          <button
                            type="submit"
                            data-wait="Please wait..."
                            id="w-node-_7ac554bc-9531-36ed-c5cf-1a5c4bbcfa25-b7cd893c"
                            className="button-primary-big w-button font-sans text-[16px] bg-primary flex items-center justify-center"
                          >
                            {mutation.isPending ? (
                              <Spinner color="white" size={20} />
                            ) : (
                              <span className="text-white">Send</span>
                            )}
                          </button>
                        </div>
                      </form>
                      <div className="success-message-2 w-form-done">
                        <div className="success-text font-sans">
                          Thank you! Your submission has been received!
                        </div>
                      </div>
                      <div className="error-message-2 w-form-fail">
                        <div className="error-text font-sans">
                          Oops! Something went wrong while submitting the form.
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bfdad9e09e3e003f92016_diff.png"
                    loading="lazy"
                    id="w-node-_1416ef46-01b1-7bc2-408f-2c508ab6e9fb-b7cd893c"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 86vw, 39vw"
                    alt=""
                    srcSet="
                    https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bfdad9e09e3e003f92016_diff-p-500.png 500w,
                    https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bfdad9e09e3e003f92016_diff.png       654w
                  "
                  />
                  <div
                    id="w-node-_7ac554bc-9531-36ed-c5cf-1a5c4bbcfa2c-b7cd893c"
                    className="uui-contact05_image-wrapper"
                  >
                    <div className="uui-testimonial08_image-wrapper">
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bc90f7bb9ef0d59af349f_feature-image-01.jpg"
                        loading="lazy"
                        id="w-node-_2db75a8e-35a6-ded6-7b42-8704ddbe0168-b7cd893c"
                        alt="Feature image"
                        className="uui-testimonial08_image"
                      />
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bc90e7bb9ef0d59af341e_feature-image-03.jpg"
                        loading="lazy"
                        id="w-node-_2db75a8e-35a6-ded6-7b42-8704ddbe0169-b7cd893c"
                        alt="Feature image"
                        className="uui-testimonial08_image"
                      />
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bc90f7bb9ef0d59af344a_feature-image-04.jpg"
                        loading="lazy"
                        id="w-node-_2db75a8e-35a6-ded6-7b42-8704ddbe016a-b7cd893c"
                        alt="Feature image"
                        className="uui-testimonial08_image"
                      />
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bc90f7bb9ef0d59af3442_feature-image-05.jpg"
                        loading="lazy"
                        id="w-node-_2db75a8e-35a6-ded6-7b42-8704ddbe016b-b7cd893c"
                        alt="Feature image"
                        className="uui-testimonial08_image"
                      />
                      <img
                        src="https://assets-global.website-files.com/663cc5b081e30522b7cd88ac/664bc90f7bb9ef0d59af347c_feature-image-02.jpg"
                        loading="lazy"
                        id="w-node-_2db75a8e-35a6-ded6-7b42-8704ddbe016c-b7cd893c"
                        alt="Feature image"
                        className="uui-testimonial08_image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
