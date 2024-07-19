import {NewButton} from "@/app/(dashborard)/_components/sidebar/new-button";
import {List} from "@/app/(dashborard)/_components/sidebar/list";

export const Sidebar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-800 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
      <List/>
      <NewButton/>
    </aside>
  )
}