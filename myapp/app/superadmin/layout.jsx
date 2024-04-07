import { Toaster } from "@/components/ui/toaster";
import { SuperadminProvider } from "./_context/Superadmincontext";

export const metadata = {
    title: "Medivault - Super Admin Dashboard",
    description: "Authentication",
};

export default function RootLayout({ children }) {
    return (
        <SuperadminProvider>
            <div>
                {children}
                <Toaster />
            </div>
        </SuperadminProvider>
    );
}
