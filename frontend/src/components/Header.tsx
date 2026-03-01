import { Sparkles } from 'lucide-react';

export default function Header() {
    return (
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <h1 className="text-xl font-bold">Theme Showcase</h1>
                    </div>
                </div>
            </div>
        </header>
    );
}
