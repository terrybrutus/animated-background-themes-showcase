import { useState } from 'react';
import { Copy, Check, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import type { Theme } from '@/lib/themeData';
import ThemePreview from './ThemePreview';

interface ThemeCardProps {
    theme: Theme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(theme.prompt);
            setCopied(true);
            toast.success('Prompt copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('Failed to copy prompt');
        }
    };

    return (
        <>
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50">
                <CardHeader className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{theme.name}</CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                            {theme.category}
                        </Badge>
                    </div>
                    <CardDescription>{theme.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                    {/* Preview Container */}
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted/20">
                        <ThemePreview theme={theme} />
                        <Button
                            size="icon"
                            variant="secondary"
                            className="absolute top-2 right-2 h-8 w-8 opacity-80 hover:opacity-100"
                            onClick={() => setIsExpanded(true)}
                        >
                            <Maximize2 className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1">
                        {theme.keywords.slice(0, 3).map((keyword) => (
                            <Badge key={keyword} variant="outline" className="text-xs">
                                {keyword}
                            </Badge>
                        ))}
                        {theme.keywords.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{theme.keywords.length - 3}
                            </Badge>
                        )}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button onClick={handleCopy} className="w-full" variant="outline">
                        {copied ? (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Prompt
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {/* Expanded View Dialog */}
            <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
                <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                            <span>{theme.name}</span>
                            <Badge variant="secondary">{theme.category}</Badge>
                        </DialogTitle>
                        <DialogDescription>{theme.description}</DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 space-y-4 overflow-hidden">
                        {/* Expanded Preview */}
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted/20">
                            <ThemePreview theme={theme} />
                        </div>

                        {/* Prompt Section */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold">Implementation Prompt</h3>
                                <Button onClick={handleCopy} size="sm" variant="outline">
                                    {copied ? (
                                        <>
                                            <Check className="mr-2 h-3 w-3" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="mr-2 h-3 w-3" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                            </div>
                            <ScrollArea className="h-32 rounded-md border border-border/50 bg-muted/20 p-4">
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{theme.prompt}</p>
                            </ScrollArea>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
