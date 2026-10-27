"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { CloseIcon, CheckIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function QuickViewModal() {
  const product = useCartStore((state) => state.quickViewProduct);
  const closeQuickView = useCartStore((state) => state.closeQuickView);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Sync default size when product changes
  React.useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
      setActiveImageIndex(0);
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 600);
  };

  return (
    <Dialog.Root open={!!product} onOpenChange={(open) => !open && closeQuickView()}>
      <AnimatePresence>
        {product && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-carbon/85 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-full max-w-3xl bg-asphalt border border-concrete/20 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden focus:outline-none"
                >
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={closeQuickView}
                    className="absolute top-5 right-5 p-2 text-concrete hover:text-fog transition-colors rounded focus-visible:outline-bordo z-10 cursor-pointer"
                    aria-label="Close product preview"
                  >
                    <CloseIcon size={20} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Image Viewer */}
                    <div className="space-y-3">
                      <div className="relative aspect-[4/5] bg-carbon border border-concrete/20 overflow-hidden">
                        <Image
                          src={product.images[activeImageIndex]}
                          alt={product.name}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-all duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="subtle">{product.monoCode}</Badge>
                        </div>
                      </div>

                      {/* Alternate thumbnail selector */}
                      <div className="flex gap-2">
                        {product.images.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            aria-pressed={activeImageIndex === idx}
                            aria-label={`View photo angle ${idx + 1}`}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative w-16 h-20 border transition-all cursor-pointer ${
                              activeImageIndex === idx
                                ? "border-bordo ring-1 ring-bordo"
                                : "border-concrete/30 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`${product.name} thumbnail ${idx + 1}`}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Product Metadata & Action */}
                    <div className="space-y-6 flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="font-mono text-[12px] text-mist uppercase tracking-widest font-medium">
                            DROP 01 // LAST TRAIN
                          </p>
                          <Dialog.Title className="font-display font-bold text-2xl text-fog tracking-tight uppercase">
                            {product.name}
                          </Dialog.Title>
                          <p className="font-mono text-xl font-bold text-fog pt-1">
                            {formatCurrency(product.price)}
                          </p>
                        </div>

                        <p className="font-body text-[14px] text-mist leading-relaxed">
                          {product.description}
                        </p>

                        {/* Technical Details */}
                        <div className="space-y-2 pt-2 border-t border-concrete/20">
                          <p className="font-mono text-[12px] text-fog uppercase tracking-wider font-semibold">
                            Specifications
                          </p>
                          <ul className="space-y-2 font-mono text-[13px] text-mist list-inside">
                            {product.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-bordo-light font-bold select-none">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Size Picker */}
                        <div className="space-y-2.5 pt-2">
                          <div className="flex justify-between items-center font-mono text-[13px]">
                            <span className="text-fog uppercase tracking-wider font-medium">Size</span>
                            <span className="text-mist">Selected: {selectedSize}</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                              <button
                                key={size}
                                type="button"
                                aria-pressed={selectedSize === size}
                                onClick={() => setSelectedSize(size)}
                                className={`min-h-[44px] min-w-[44px] px-4 py-2 font-mono text-[13px] uppercase border transition-all cursor-pointer flex items-center justify-center ${
                                  selectedSize === size
                                    ? "border-bordo bg-oxblood/60 text-fog font-bold shadow-sm ring-1 ring-bordo"
                                    : "border-concrete/30 bg-carbon text-mist hover:border-fog/50 hover:text-fog"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Add to bag button */}
                      <div className="pt-4 border-t border-concrete/20 space-y-2">
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full flex items-center justify-center gap-2 group cursor-pointer text-[14px]"
                          onClick={handleAddToCart}
                        >
                          {isAdded ? (
                            <>
                              <CheckIcon size={16} />
                              <span>Added to Bag</span>
                            </>
                          ) : (
                            <>
                              <span>Add to Bag • {formatCurrency(product.price)}</span>
                              <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                        <p className="font-mono text-[12px] text-center text-mist/80">
                          LIMITED PRODUCTION • NUMBERED PHOTOCARD INCLUDED
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

