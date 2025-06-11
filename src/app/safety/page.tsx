import Footer from "@/components/ui/footer";
import PartnersSafety from "@/components/ui/partners-safety";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TravellersSafety from "@/components/ui/travellers-safety";

export default () => {
  return (
    <div className="w-full">
      <div className="w-full px-7 sm:px-20 max-w-[1400px] mx-auto">
        <Tabs
          defaultValue="account"
          className="w-full flex flex-col items-start"
        >
          <TabsList className="flex bg-transparent items-center justify-between py-10">
            <TabsTrigger
              className="w-5/6 focus-visible:ring-0 focus-visible:ring-offset-0 text-black border-b-2 border-b-transparent data-[state=active]:border-b-golden-orange data-[state=active]:text-golden-orange focus-visible:p-0 focus-visible:m-0 sm:w-[110px]"
              value="account"
            >
              Travellers
            </TabsTrigger>
            <TabsTrigger
              className="w-5/6 text-black focus-visible:ring-0 focus-visible:ring-offset-0  border-b-2 border-b-transparent data-[state=active]:border-b-golden-orange data-[state=active]:text-golden-orange  focus-visible:p-0 focus-visible:m-0 sm:w-[110px]"
              value="password"
            >
              Hosts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <TravellersSafety />
          </TabsContent>
          <TabsContent value="password">
            <PartnersSafety />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
