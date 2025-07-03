import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square items-center justify-center  bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-md hover:from-yellow-300 hover:to-orange-300">
                <AppLogoIcon className="size-4 fill-white text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                {/* <span className="mb-0.5 truncate leading-tight font-semibold">Foot Street</span> */}
            </div>
        </>
    );
}
