"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { APIProduct } from "@/types/products";
import { cn } from "@/lib/utils";
import { getProducts } from "@/lib/apiServices/product.service";

interface SearchSuggestionsProps {
  className?: string;
}

export function SearchSuggestions({ className }: SearchSuggestionsProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<APIProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useCallback((query: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (query.trim().length >= 1) {
        setIsLoading(true);
        try {
          const response = await getProducts({
            search: query,
            pageSize: 8,
          });

          if (response.success && response.data) {
            if ("data" in response.data && Array.isArray(response.data.data)) {
              setSuggestions(response.data.data);
            } else {
              setSuggestions([]);
            }
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Search error:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
  }, []);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (productId: string) => {
    router.push(`/products/${productId}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Prevent default behavior that might cause scrolling
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent scrolling when pressing keys
    if (["ArrowUp", "ArrowDown", "Enter", " "].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Fix for the scrolling issue - prevent page scroll when typing
  useEffect(() => {
    const handleScroll = (e: Event) => {
      // If suggestions are shown and user is typing, prevent any programmatic scroll
      if (
        showSuggestions &&
        searchQuery &&
        document.activeElement === inputRef.current
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [showSuggestions, searchQuery]);

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          className={cn(
            "pl-10 pr-10 py-2 w-full text-sm bg-slate-50/80 dark:bg-slate-800/80",
            "border border-slate-200 dark:border-slate-700 rounded-full",
            "focus:bg-white dark:focus:bg-slate-800 transition-all duration-300",
            "focus:ring-2 focus:ring-[#38b6ff]/20 focus:border-[#38b6ff]",
            "dark:focus:ring-[#38b6ff]/30 dark:focus:border-[#38b6ff]",
            "outline-none" // Remove default outline that might cause visual shifts
          )}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions &&
        searchQuery.length >= 1 && ( // Changed to 1 character
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-[1000] max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#38b6ff] border-t-transparent"></div>
                  Searching...
                </div>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                  Found {suggestions.length} products
                </div>
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      handleSuggestionClick((product?.id).toString())
                    }
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-md overflow-hidden">
                      {(product.images && product.images.length > 0) ? (
                        <img
                          src={
                            product.images[0] ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-600 rounded-md">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            No image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-[#38b6ff] transition-colors">
                        {product.name}
                      </h4>
                      {product.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-1">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {product.base_price && (
                          <p className="text-sm font-semibold text-[#38b6ff]">
                            ${product.base_price}
                          </p>
                        )}
                        {product.category && (
                          <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery.trim().length >= 2 ? (
              <div className="p-6 text-center">
                <div className="text-slate-400 dark:text-slate-500 mb-2">
                  <Search className="h-8 w-8 mx-auto opacity-50" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No products found for "
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {searchQuery}
                  </span>
                  "
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Try different keywords or check the spelling
                </p>
              </div>
            ) : searchQuery.trim().length === 1 ? (
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Type more characters to get better results
              </div>
            ) : null}
          </div>
        )}
    </div>
  );
}
