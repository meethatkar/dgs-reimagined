"use client";
import React from "react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextArea";
import ContactInfoItem from "./ContactInfoItem";
import Button from "@/components/ui/Button";
import Checkmark from "../../../../public/icons/Checkmark";
import Phone from "../../../../public/icons/Phone";
import Pin from "../../../../public/icons/Pin";
import Mail from "../../../../public/icons/Mail";

const ContactSection = () => {
  return (
    <section id="contact" className="w-full py-20 lg:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-tight">
            Let&apos;s discuss your <br />
            <span className="italic font-light text-neutral-500">
              dream home.
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: The Form */}
          <div className="w-full lg:w-7/12 bg-white p-6 sm:p-10 rounded-[2rem] border border-neutral-200 shadow-lg shadow-neutral-200/50">
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput name="name" placeholder="Full Name" />
                <FormInput type="tel" name="phone" placeholder="Phone Number" />
              </div>
              <FormInput
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <FormTextarea name="message" placeholder="How can we help you?" />

              {/* Custom Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer mt-2 group">
                <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 rounded border-2 border-neutral-300 group-hover:border-primary transition-colors">
                  <input
                    type="checkbox"
                    required
                    className="peer absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <Checkmark className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity z-10" />
                  <div className="absolute inset-0 bg-primary scale-0 peer-checked:scale-100 transition-transform origin-center rounded-[2px]" />
                </div>
                <span className="text-sm text-neutral-600 select-none">
                  I hereby authorize to send notifications on SMS, calls, RCS
                </span>
              </label>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="mt-6 w-full font-bold tracking-widest text-sm uppercase py-4 rounded-xl"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Column: Contact Information Cards */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 justify-center">
            <ContactInfoItem
              title="Talk"
              value={`+91 9136431541\n+91 9136441541`}
              icon={<Phone className="w-6 h-6" />}
            />

            <ContactInfoItem
              title="Meet"
              value="DGS house, 1st floor, Sheetal Krupa, Aarey Road, Walawalkar Street, Goregaon (E), Mumbai - 400063"
              icon={<Pin className="w-6 h-6" />}
            />

            <ContactInfoItem
              title="Write"
              value="info@dgsgroup.co.in"
              icon={<Mail className="w-6 h-6" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
