import Image from "next/image";
import type { FC } from "react";

import type { HomePageBannerProps } from "./LearnWeb3Banner";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export interface PartnerBannerProps extends HomePageBannerProps {
  imgSrc: string;
}

export const PartnerBanner: FC<PartnerBannerProps> = ({ href, imgSrc }) => {
  return (
    <Card className="banner flex-col-reverse lg:flex-row">
      <div className="mb-8">
        <CardHeader className="flex-row justify-center">
          <CardTitle className="title">Partner with D_D Academy</CardTitle>
        </CardHeader>
        <CardContent className="description max-w-2xl p-1 pb-12 md:pb-1">
          <p>
            Developer DAO is a community of builders creating a better internet.
            Help us educate the next generation.
          </p>
        </CardContent>
        <div className=" flex justify-center">
          <Button
            asChild
            className="button-rounded text-black hover:bg-[#721F79] hover:text-white"
          >
            <a href={href} target="_blank">
              reach out!
            </a>
          </Button>
        </div>
      </div>
      <div className="mx-8 mt-8 max-w-sm md:m-auto">
        <div className="flex flex-col items-center md:flex-row">
          <Image
            src={imgSrc}
            width={100}
            height={100}
            alt="partner"
            className="mb-4 h-auto max-h-28 w-24 rounded-full lg:mr-[50px]"
          />
          <div className="separator mb-4" />
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              "/partners/pokt.png",
              "/partners/zerion.png",
              "/partners/api3-logo.png",
              "/partners/scroll.png",
            ].map((logoPath, i) => (
              <Image
                key={i}
                src={logoPath}
                width={175}
                height={25}
                alt="partner"
                className={`${i === 2 ? "max-h-16" : "max-h-10"} w-auto ${i === 0 ? "mb-4" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PartnerBanner;
