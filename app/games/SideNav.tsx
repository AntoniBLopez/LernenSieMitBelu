import NavLinks from '@/app/games/NavLinks';

export default function SideNav() {
  return (
    <div className="flex flex-col h-fit w-full pt-5">
      <div className="flex flex-col w-full space-y-2 md:flex-row md:space-y-0 md:gap-2 justify-center">
        <NavLinks />
      </div>
    </div>
  );
}
