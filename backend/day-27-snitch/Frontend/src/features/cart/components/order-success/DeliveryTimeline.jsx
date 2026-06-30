import React from "react";

const DeliveryTimeline = () => {
  const steps = [
    { label: "Order Confirmed", active: true, done: true },
    { label: "Preparing", active: false, done: false },
    { label: "Quality Inspection", active: false, done: false },
    { label: "Packaging", active: false, done: false },
    { label: "Shipment", active: false, done: false },
    { label: "Delivered", active: false, done: false },
  ];

  return (
    <div className="w-full py-12 border-b border-charcoal-800/60 animate-reveal" style={{ animationDelay: "100ms" }}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left column: Editorial subtitle */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start">
          <span className="font-sans text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold mb-2">
            Status
          </span>
          <h3 className="font-display text-2xl font-light text-charcoal-200 tracking-wide">
            Delivery Timeline
          </h3>
          <p className="font-sans text-xs text-charcoal-400 font-light mt-4 max-w-xs leading-relaxed">
            Follow the journey of your order from curation to delivery. Each stage represents our commitment to quality.
          </p>
        </div>

        {/* Right column: Interactive Premium Timeline */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center">
          {/* Horizontal layout for desktop, vertical stack for mobile */}
          <div className="relative hidden md:flex items-center justify-between w-full pt-4 pb-8">
            {/* Background thin line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-charcoal-800/60" />
            
            {/* Active track segment */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-gold-400/80 transition-all duration-1000" style={{ width: "20%" }} />

            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center z-10 flex-1">
                {/* Step indicator: Square/line node, no circles */}
                <div
                  className={`w-3 h-3 border rotate-45 transition-all duration-500
                    ${step.done 
                      ? "bg-gold-400 border-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                      : "bg-charcoal-950 border-charcoal-800"
                    }`}
                >
                  {step.done && (
                    <div className="w-1 h-1 bg-charcoal-950 absolute inset-0 m-auto" />
                  )}
                </div>

                {/* Step label */}
                <span
                  className={`absolute top-8 font-sans text-[9px] uppercase tracking-widest text-center whitespace-nowrap transition-colors duration-300
                    ${step.active || step.done
                      ? "text-gold-400 font-medium"
                      : "text-charcoal-500"
                    }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Vertical layout for mobile devices */}
          <div className="flex md:hidden flex-col gap-8 relative pl-6 border-l border-charcoal-800/60">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-center gap-4">
                {/* Step node on vertical line */}
                <div
                  className={`w-3 h-3 border rotate-45 absolute -left-7.5 transition-all duration-500
                    ${step.done 
                      ? "bg-gold-400 border-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                      : "bg-charcoal-950 border-charcoal-800"
                    }`}
                >
                  {step.done && (
                    <div className="w-1 h-1 bg-charcoal-950 absolute inset-0 m-auto" />
                  )}
                </div>

                <span
                  className={`font-sans text-xs uppercase tracking-wider transition-colors duration-300
                    ${step.active || step.done
                      ? "text-gold-400 font-medium"
                      : "text-charcoal-400"
                    }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTimeline;
