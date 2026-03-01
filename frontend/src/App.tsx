import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import ThemeShowcase from './pages/ThemeShowcase';

export default function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ThemeShowcase />
            <Toaster />
        </ThemeProvider>
    );
}
