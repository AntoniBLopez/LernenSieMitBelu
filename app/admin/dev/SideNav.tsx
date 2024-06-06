import NavLinks from '@/app/admin/dev/NavLinks';

export default function SideNav() {
  return (
    <div className="flex h-fit flex-col px-3 py-10 md:px-2">
      <div className="flex flex-row space-x-2 justify-center">
        <NavLinks />
      </div>
    </div>
  );
}
