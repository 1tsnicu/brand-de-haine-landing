"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { brandCopy } from "@/content/copy";

export function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Enter a valid nocturnal frequency (e.g. name@domain.com).");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Simulate network submission
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <section
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-carbon border-b border-concrete/15 overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Soft background oxblood glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(46,10,18,0.35)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      {/* Structured Card Frame */}
      <div className="relative z-10 max-w-3xl mx-auto bg-[#121417] border border-concrete/25 p-8 sm:p-12 shadow-2xl space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-concrete/25 bg-carbon text-[12px] font-mono tracking-widest text-mist uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-bordo animate-pulse" />
          <span>{brandCopy.newsletter.tag}</span>
        </div>

        <h2
          id="newsletter-heading"
          className="font-display font-black text-2xl sm:text-4xl text-fog uppercase tracking-tight"
        >
          {brandCopy.newsletter.title}
        </h2>

        <p className="font-mono text-[14px] text-mist max-w-md mx-auto leading-relaxed">
          {brandCopy.newsletter.body}
        </p>

        {status === "success" ? (
          <div
            role="status"
            className="p-5 border border-bordo/60 bg-oxblood/40 max-w-md mx-auto text-center space-y-2 animate-fadeIn"
          >
            <div className="flex items-center justify-center gap-2 text-fog font-mono text-[13px] font-bold uppercase">
              <CheckIcon size={16} className="text-bordo-light" />
              <span>{brandCopy.newsletter.successTitle}</span>
            </div>
            <p className="font-mono text-[12px] text-mist">
              {brandCopy.newsletter.successBody}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-md mx-auto space-y-3"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={brandCopy.newsletter.inputPlaceholder}
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "newsletter-error" : undefined}
                disabled={status === "loading"}
                className={`flex-1 px-4 py-3 bg-carbon border font-mono text-[13px] text-fog placeholder:text-mist/60 focus:outline-none transition-colors ${
                  status === "error"
                    ? "border-bordo focus:border-bordo-light"
                    : "border-concrete/30 focus:border-fog/70"
                }`}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 shrink-0 cursor-pointer text-[13px]"
              >
                <span>{status === "loading" ? brandCopy.newsletter.submittingButton : brandCopy.newsletter.submitButton}</span>
                <ArrowRightIcon size={14} />
              </Button>
            </div>

            {status === "error" && (
              <p
                id="newsletter-error"
                role="alert"
                className="font-mono text-[12px] text-bordo-light text-left font-medium"
              >
                {errorMessage}
              </p>
            )}

            <p className="font-mono text-[12px] text-mist/80 text-left">
              {brandCopy.newsletter.reassurance}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

