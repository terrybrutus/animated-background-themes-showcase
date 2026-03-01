import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border/40 backdrop-blur-sm bg-background/80 mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="text-center text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-1">
                        © 2025. Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> using{' '}
                        <a
                            href="https://caffeine.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            caffeine.ai
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
