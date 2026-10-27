"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { brandConfig } from "@/config/brand";
import { formatCurrency } from "@/lib/utils";
import { CloseIcon, PlusIcon, MinusIcon, BagIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalCount = useCartStore((state) => state.getTotalCount());

  return (
    <Dialog.Root open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <AnimatePresence>
        {isDrawerOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-carbon/80 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* Slide-in Drawer */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-asphalt border-l border-concrete/20 flex flex-col justify-between shadow-2xl focus:outline-none"
              >
                {/* Header */}
                <div className="p-6 border-b border-concrete/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Dialog.Title className="font-display font-bold text-lg tracking-tight text-fog uppercase">
                      Bag
                    </Dialog.Title>
                    <span className="font-mono text-[13px] text-mist font-medium">
                      [{totalCount} {totalCount === 1 ? "ITEM" : "ITEMS"}]
                    </span>
                  </div>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="p-2 text-mist hover:text-fog transition-colors rounded focus-visible:outline-bordo cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Close cart drawer"
                    >
                      <CloseIcon size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="px-6 py-3 bg-carbon/90 border-b border-concrete/15 space-y-2">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="text-mist uppercase tracking-wide">
                      {subtotal >= 80
                        ? "FREE NOCTURNAL SHIPPING UNLOCKED"
                        : `ADD ${formatCurrency(80 - subtotal)} MORE FOR FREE SHIPPING`}
                    </span>
                    <span className="text-fog font-bold">€80 THRESHOLD</span>
                  </div>
                  <div className="w-full h-1.5 bg-asphalt rounded-full overflow-hidden border border-concrete/20">
                    <div
                      className="h-full bg-bordo transition-all duration-500 ease-out"
                      style={{ width: `${Math.min(100, (subtotal / 80) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Body / Items list */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16 text-concrete space-y-4">
                      <BagIcon size={40} className="stroke-[1.25] text-concrete/50" />
                      <p className="font-mono text-sm uppercase tracking-wider text-fog">
                        Your bag is empty
                      </p>
                      <p className="font-mono text-xs text-concrete max-w-xs">
                        Browse Drop 01 to add pieces from the nocturnal collection.
                      </p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className="flex gap-4 pb-6 border-b border-concrete/15 last:border-b-0"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-24 bg-carbon border border-concrete/20 rounded-none overflow-hidden shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display font-medium text-sm text-fog">
                                {item.product.name}
                              </h3>
                              <p className="font-mono text-sm text-fog font-bold">
                                {formatCurrency(item.product.price * item.quantity)}
                              </p>
                            </div>
                            <p className="font-mono text-[12px] text-mist mt-1">
                              SIZE: {item.size} • {item.product.monoCode}
                            </p>
                          </div>

                          {/* Quantity control */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-concrete/25 bg-carbon">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center text-mist hover:text-fog transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <MinusIcon size={12} />
                              </button>
                              <span className="font-mono text-[13px] px-2.5 text-fog font-medium">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center text-mist hover:text-fog transition-colors"
                                aria-label="Increase quantity"
                              >
                                <PlusIcon size={12} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id, item.size)}
                              className="font-mono text-[12px] text-mist hover:text-bordo-light transition-colors underline uppercase py-1 px-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer / Summary */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-concrete/15 bg-carbon/50 space-y-4">
                    <div className="space-y-2 font-mono text-[13px]">
                      <div className="flex justify-between text-mist">
                        <span>SUBTOTAL</span>
                        <span className="text-fog font-medium">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-mist">
                        <span>SHIPPING</span>
                        <span className="text-fog font-medium">
                          {subtotal >= 80 ? "FREE" : formatCurrency(12)}
                        </span>
                      </div>
                      <div className="flex justify-between text-mist">
                        <span>PHOTOCARD</span>
                        <span className="text-bordo-light font-bold">INCLUDED (FREE)</span>
                      </div>
                      <div className="pt-2.5 border-t border-concrete/20 flex justify-between text-base font-bold text-fog">
                        <span>TOTAL</span>
                        <span>
                          {formatCurrency(subtotal >= 80 ? subtotal : subtotal + 12)}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2 group cursor-pointer text-[14px]"
                      onClick={() => {
                        alert(
                          `[QUIET HOURS MOCK CHECKOUT]\n\nThank you for ordering Drop 01!\nTotal: €${subtotal}\nStatus: Simulation mode (no real payment taken).`
                        );
                      }}
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <p className="font-mono text-[12px] text-center text-mist/80">
                      ENCRYPTED NOCTURNAL CHECKOUT • 14-DAY RETURNS
                    </p>
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

