import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { themes, categories } from '@/lib/themeData';
import ThemeCard from '@/components/ThemeCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ThemeShowcase() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredThemes = useMemo(() => {
        return themes.filter((theme) => {
            const matchesSearch =
                searchQuery === '' ||
                theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                theme.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === null || theme.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                {/* Hero Section */}
                <section className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                        Animated Background Themes
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore stunning animated backgrounds with live previews. Copy the implementation prompts and
                        bring these effects to your projects.
                    </p>
                </section>

                {/* Search and Filter Section */}
                <section className="mb-8 space-y-4">
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search themes by name or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12 text-base"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Button
                            variant={selectedCategory === null ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(null)}
                            className="rounded-full"
                        >
                            All
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </section>

                {/* Results Count */}
                {(searchQuery || selectedCategory) && (
                    <div className="text-center mb-6">
                        <Badge variant="secondary" className="text-sm">
                            {filteredThemes.length} {filteredThemes.length === 1 ? 'theme' : 'themes'} found
                        </Badge>
                    </div>
                )}

                {/* Carousel Section */}
                {filteredThemes.length > 0 ? (
                    <section className="max-w-7xl mx-auto">
                        <Carousel
                            opts={{
                                align: 'start',
                                loop: true
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {filteredThemes.map((theme) => (
                                    <CarouselItem key={theme.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <ThemeCard theme={theme} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center gap-2 mt-8">
                                <CarouselPrevious className="static translate-y-0" />
                                <CarouselNext className="static translate-y-0" />
                            </div>
                        </Carousel>
                    </section>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-xl text-muted-foreground">No themes found matching your criteria.</p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory(null);
                            }}
                            className="mt-4"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
