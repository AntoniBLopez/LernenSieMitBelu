import NavLinks from '@/app/admin/dev/NavLinks';

export default function SideNav() {
  return (
    <div className="flex flex-col h-fit w-full px-3 py-10 md:px-2">
      <div className="flex flex-col w-full space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-center">
        <NavLinks />
      </div>
    </div>
  );
}
