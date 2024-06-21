"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  buttonText: string;
  children: React.ReactNode;
  title: string;
}

export default function LessonInformationalModal({
  buttonText,
  title,
  children,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger className="mx-auto my-3 flex w-fit rounded-3xl bg-[#721F79] p-2 font-future text-2xl font-normal text-white">
        {buttonText}
      </DialogTrigger>
      <DialogContent className="mt-10 max-h-screen min-w-[75%] overflow-y-auto border-0 bg-[#1C1C1C] pb-20 lg:w-fit">
        <DialogHeader>
          <DialogTitle className="m-2 font-clash-display text-lg font-bold text-white lg:text-3xl">
            <div className="w-full text-right text-[#44AF96]">
              <DialogTrigger className="font-semibold	">X</DialogTrigger>
            </div>
            {title}
          </DialogTitle>
          <DialogDescription className="bg-[#1C1C1C] font-poppins text-white">
            {children}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
