import Link from "next/link";

import LearnWeb3Banner from "@/components/LearnWeb3Banner";
import PartnerBanner from "@/components/PartnerBanner";
import { Icons } from "@/components/Icons";

export default async function HomePage() {
  return (
    <>
      <section className="academy-grid app-container">
        <div className="academy-grid-col-1">
          <div className="hidden justify-center md:flex">
            <div className="text-bttf-lg">
              <h1>
                Learn
                <br />
                web3__
                <br />
                with
                <br />
                friends
              </h1>
            </div>
          </div>
          <div className="description max-w-[495px]">
            <p>Become a web3 developer with Developer DAO.</p>
          </div>
          <div className="hidden w-full items-center justify-center md:flex">
            <Link href="/#learn-web3" className="hover:cursor-pointer">
              <Icons.scroll className="h-16 w-16" />
            </Link>
          </div>
        </div>
        <div className="dd-nft">
          <div className="flex h-full items-end justify-center md:hidden">
            <div className="text-bttf-lg">
              <h1>learn</h1>
              <h1>web3__</h1>
              <h1>with</h1>
              <h1>friends</h1>
            </div>
          </div>
        </div>
      </section>
      <section id="learn-web3" className="main-container lg:pt-16">
        <LearnWeb3Banner href="/tracks" />
      </section>
      <section id="partners" className="main-container pb-4 pt-16">
        <PartnerBanner
          href="https://airtable.com/appDMMIARfSeiovpk/shrZExypPetXEx6Ox"
          imgSrc="/dd_logo.svg"
        />
      </section>
    </>
  );
}
