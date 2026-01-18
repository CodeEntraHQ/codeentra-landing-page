import { ExternalLink, Sparkles, ArrowRight, Zap, Package, Rocket, Code, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../../services/api';

const ProductsSection = () => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  // Icon mapping
  const getIcon = (iconName) => {
    const iconMap = {
      'Sparkles': Sparkles,
      'Package': Package,
      'Rocket': Rocket,
      'Code': Code,
      'Globe': Globe,
    };
    return iconMap[iconName] || Sparkles;
  };

  // Extract products from API response
  const products = productsData?.data || [];

  // Fallback product if API fails
  const fallbackProducts = [
    {
      id: 'examentra',
      name: 'ExamEntra',
      description: 'A comprehensive examination management platform designed to streamline the entire exam process. From creation to evaluation, ExamEntra makes exam management effortless and efficient.',
      url: 'https://examentra.homelabcraft.ovh/',
      icon: 'Sparkles',
      features: ['Easy Exam Creation', 'Automated Evaluation', 'Real-time Analytics', 'Secure Platform']
    }
  ];

  const displayProducts = isLoading || products.length === 0 ? fallbackProducts : products;

  return (
    <section id="products" className="section-padding bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider bg-green-50 text-green-800 rounded-full">
            Our Products
          </span>
          <h2 className="mb-4 font-bold text-[32px]">
            Innovative <span className="text-green-800">Solutions</span> We've Built
          </h2>
          <p className="text-muted-foreground">
            Explore our cutting-edge products designed to solve real-world problems and empower businesses.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" />
            </div>
          )}
          {displayProducts.map((product, index) => {
            const IconComponent = getIcon(product.icon);
            const gradient = 'from-green-600 to-green-700';
            const bgGradient = 'from-green-50 to-green-100';
            return (
              <div
                key={product.id}
                className="group relative animate-fade-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Card with gradient border effect */}
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${gradient} p-4 shadow-lg group-hover:scale-110 transition-transform duration-500 flex items-center justify-center`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        {/* Features */}
                        {Array.isArray(product.features) && product.features.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {product.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg group-hover:bg-white/80 transition-colors"
                              >
                                <Zap className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA Button */}
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <Button
                            className={`bg-gradient-to-r ${gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                          >
                            <span>Explore Product</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            More exciting products coming soon! Stay tuned for updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
