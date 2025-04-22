import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose, // To close the dialog
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, Download, Lock } from 'lucide-react'; // Import icons
import Link from 'next/link';

interface ReceiptDetails {
  amount: number;
  refNumber: string;
  vendorName: string;
  paymentMethod: string;
  paymentTime: string; // Consider using Date object if needed
  sender: string;
}

interface PaymentStatusDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  status: 'success' | 'error';
  details: ReceiptDetails;
  onRetry?: () => void; // Optional retry handler for error state
  onDone?: () => void; // Optional done handler for success state
}

const PaymentStatusDialog: React.FC<PaymentStatusDialogProps> = ({
  isOpen,
  onOpenChange,
  status,
  details,
  onRetry,
  onDone
}) => {
  const isSuccess = status === 'success';

  const iconBgColor = isSuccess ? 'bg-teal-100' : 'bg-red-100';
  const iconColor = isSuccess ? 'text-teal-600' : 'text-red-600';
  const IconComponent = isSuccess ? CheckCircle2 : XCircle;
  const title = isSuccess ? 'Payment Successful!' : 'Payment Error!';
  const description = isSuccess
    ? 'Your request has been sent to the vendor for approval.'
    : 'Oops! Looks like your transaction did not go through. Try again in 5 mins';
  const receiptBgColor = isSuccess ? 'bg-teal-50' : 'bg-red-50'; // Lighter shades
  const statusBgColor = isSuccess ? 'bg-[#27AE60]' : 'bg-red-500';
  const statusTextColor = 'text-white';
  const primaryButtonText = isSuccess ? 'Done' : 'Retry';
  const primaryButtonBg = isSuccess ? 'bg-[#E09F3E]' : 'bg-[#E09F3E]'; // Both seem to use the same color
  const primaryButtonHoverBg = isSuccess ? 'hover:bg-[#d08f2e]' : 'hover:bg-[#d08f2e]';
  const primaryButtonTextColor = 'text-[#0E2F3C]';

  const handlePrimaryAction = () => {
    if (isSuccess && onDone) {
      onDone();
    } else if (!isSuccess && onRetry) {
      onRetry();
    }
    onOpenChange(false); // Close dialog after action
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[752px] p-0 overflow-hidden"> {/* Match width from Figma */}
        <DialogHeader className="pt-10 pb-6 px-10 flex flex-col items-center text-center gap-4">
          <div className={`w-20 h-20 rounded-full ${iconBgColor} flex items-center justify-center mb-2`}>
            <IconComponent size={48} className={iconColor} />
          </div>
          <DialogTitle className={`text-3xl font-bold font-bricolage ${isSuccess ? 'text-[#0E2F3C]' : 'text-red-600'}`}>
            {title}
          </DialogTitle>
          <DialogDescription className="text-lg text-[#4F4F4F] font-manrope">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Receipt Section */}
        <div className={`p-5 mx-10 rounded-2xl ${receiptBgColor}`}> {/* Padding & margin based on Figma */}
          <div className="flex flex-col gap-3">
            {/* Amount & Status Row */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#0E2F3C] font-manrope">Amount</p>
                <p className="text-lg font-bold text-[#0E2F3C] font-manrope">₦{details.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-[#0E2F3C] font-manrope text-right mb-1">Payment Status</p>
                <span className={`px-3 py-1 rounded-md text-sm font-semibold ${statusBgColor} ${statusTextColor}`}>
                  {isSuccess ? 'Success' : 'Error'}
                </span>
              </div>
            </div>

            <Separator className="bg-[#828282]" />

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-manrope">
              <div>
                <p className="text-[#0E2F3C]">Ref Number</p>
                <p className="text-[#0E2F3C] font-bold text-right">{details.refNumber}</p>
              </div>
               <div>
                <p className="text-[#0E2F3C]">Vendor Name</p>
                <p className="text-[#0E2F3C] font-bold text-right">{details.vendorName}</p>
              </div>
               <div>
                <p className="text-[#0E2F3C]">Payment Method</p>
                <p className="text-[#0E2F3C] font-bold text-right">{details.paymentMethod}</p>
              </div>
               <div>
                <p className="text-[#0E2F3C]">Payment Time</p>
                <p className="text-[#0E2F3C] font-bold text-right">{details.paymentTime}</p>
              </div>
               <div>
                <p className="text-[#0E2F3C]">Sender</p>
                <p className="text-[#0E2F3C] font-bold text-right">{details.sender}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center justify-center gap-4 px-10 pt-6 pb-10">
          <Button className="bg-[#0E2F3C] text-white hover:bg-[#1c4a5f] rounded-lg h-[56px] w-full sm:w-[344px] font-manrope font-extrabold text-base">
            <Download size={18} className="mr-2" /> Get PDF Receipt
          </Button>
          <Button
            onClick={handlePrimaryAction}
            className={`${primaryButtonBg} ${primaryButtonTextColor} ${primaryButtonHoverBg} rounded-lg h-[56px] w-full sm:w-[344px] font-manrope font-extrabold text-base`}
          >
            {primaryButtonText}
          </Button>
        </DialogFooter>
        <div className="text-center pb-6">
           <p className="text-base text-[#0E2F3C] font-manrope">
             Having trouble with your payment?{' '}
             <Link href="/help" className="underline font-bold">Let us know</Link>
           </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentStatusDialog;
