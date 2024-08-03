import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { IoMdPower } from "react-icons/io";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 ">
        <div className="flex">
          <Image alt="random" src="/images/logo.png" width={50} height={50} />
          <span className="ml-2 text-3xl font-semibold pt-2">
            <span className="text-customGold">Watt</span>
            <span className="text-customGreen">Wise</span>
          </span>
        </div>
      </nav>
    </header>
  );
}
