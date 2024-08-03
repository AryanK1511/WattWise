import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { IoMdPower } from "react-icons/io";

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 ">
        <div className="flex">
          <IoMdPower className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">Power Usage</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </nav>
    </header>
  );
}
