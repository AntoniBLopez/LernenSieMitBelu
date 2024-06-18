import NavLinks from '@/app/(ui)/games/NavLinks';

export default function SideNav() {
  return (
    <div className="flex flex-col h-fit w-full pt-5">
      <div className="flex flex-col w-full space-y-2 laptop:flex-row laptop:space-y-0 laptop:gap-2 justify-center">
        <NavLinks />
      </div>
    </div>
  );
}
