import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Anel de Ouro Solitário', 
    price: 1250, 
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80', 
    category: 'Anéis',
    description: 'Design clássico em ouro 18k com diamante selecionado.'
  },
  { 
    id: '2', 
    name: 'Colar de Pérolas Heritage', 
    price: 2100, 
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80', 
    category: 'Colares',
    description: 'Pérolas naturais colhidas à mão com fecho em ouro.'
  },
  { 
    id: '3', 
    name: 'Brincos de Diamante Eclipse', 
    price: 890, 
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80', 
    category: 'Brincos',
    description: 'Elegância minimalista para momentos inesquecíveis.'
  }
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'hero', 'products', 'jewelry-section'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-sans">
      {/* Navigation - Restored original aesthetic */}
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-7xl rounded-full glass-effect z-50 flex items-center justify-between px-8 py-3 transition-all duration-300 ${
          isScrolled ? 'top-2 py-2 bg-surface-container-lowest/90' : 'bg-surface-container-lowest/80'
        } border border-on-surface-variant/10 shadow-[0_20px_50px_rgba(3,39,32,0.05)]`}
      >
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">auto_stories</span>
            <span className="text-primary font-bold text-xl tracking-tighter uppercase font-serif">Grand Lecture</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'hero' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'}`}
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'products' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'}`}
            >
              Coleções
            </button>
            <a href="#" className="text-sm text-on-surface-variant font-medium hover:text-primary transition-colors">História</a>
            <a href="#" className="text-sm text-on-surface-variant font-medium hover:text-primary transition-colors">Manifesto</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-bold shadow-lg hover:bg-primary/90 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Carrinho ({cartCount})</span>
            </button>
          </div>
          <button className="lg:hidden p-2 text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section - Restored original content */}
        <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E5E9E7] -z-10 arch-mask"></div>
          
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold tracking-tight">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Heritage Jewelry Collection 2024
              </div>
              
              <h1 className="text-6xl md:text-8xl font-serif text-primary leading-[0.9] tracking-tighter">
                Poesia <br /> <span className="italic font-normal opacity-80">Eternizada</span>
              </h1>
              
              <p className="text-xl text-on-surface-variant max-w-md leading-relaxed font-medium opacity-90">
                Uma experiência de luxo onde a herança artesanal encontra o design contemporâneo e a visão poética.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold shadow-xl hover:shadow-2xl hover:bg-primary/95 transition-all flex items-center gap-2 group"
                >
                  Comprar Agora
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button className="px-8 py-4 rounded-full border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all">
                  Conheça a História
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-primary/10">
                <div>
                  <div className="text-3xl font-serif text-primary">450+</div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1 opacity-60">Peças Únicas</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-primary">24k</div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1 opacity-60">Ouro Puro</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-primary">Paris</div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1 opacity-60">Origem</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80" 
                  alt="Jewelry" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="p-6 rounded-3xl glass-effect text-white">
                    <p className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest">Peça Especial</p>
                    <h3 className="text-2xl font-serif">Colar Aurora em Ouro 24k</h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold">R$ 4.250</span>
                      <button className="p-3 rounded-full bg-white text-primary hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={() => setIsVideoOpen(true)}
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full glass-effect flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xl">
                  <span className="material-symbols-outlined text-4xl">play_arrow</span>
                </div>
                <div className="absolute inset-0 border-2 border-primary/20 border-dashed rounded-full animate-[spin_10s_linear_infinite]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker Section */}
        <section className="bg-primary py-8 overflow-hidden">
          <div className="flex whitespace-nowrap animate-ticker">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                <span className="text-on-primary text-xl font-serif italic opacity-80">Edição Limitada</span>
                <span className="text-on-primary/30 text-5xl">★</span>
                <span className="text-on-primary text-xl font-serif italic opacity-80">Artesanato Parisiense</span>
                <span className="text-on-primary/30 text-5xl">★</span>
                <span className="text-on-primary text-xl font-serif italic opacity-80">Ouro Certificado</span>
                <span className="text-on-primary/30 text-5xl">★</span>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="space-y-4">
                <div className="text-primary font-bold text-sm tracking-widest uppercase opacity-60">As Coleções</div>
                <h2 className="text-5xl font-serif text-primary tracking-tighter">Obras Colecionáveis</h2>
              </div>
              <div className="flex gap-4">
                {['Tudo', 'Anéis', 'Colares', 'Brincos'].map((tab) => (
                  <button key={tab} className={`px-6 py-2 rounded-full border border-primary/10 text-sm font-bold transition-all hover:bg-primary hover:text-on-primary ${tab === 'Tudo' ? 'bg-primary text-on-primary' : 'text-on-primary-fixed-variant'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {PRODUCTS.map((prod) => (
                <div key={prod.id} className="group">
                  <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-fub-light/10 mb-8 cursor-pointer">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                      <button className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:bg-primary hover:text-on-primary">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                      <button 
                        onClick={() => setSelectedProduct(prod)}
                        className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:bg-primary hover:text-on-primary"
                      >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                    </div>
                    
                    <button 
                      onClick={addToCart}
                      className="absolute bottom-6 left-6 right-6 py-4 rounded-2xl bg-white/90 backdrop-blur-md text-primary font-bold shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-primary hover:text-on-primary"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <p className="text-primary/50 text-xs font-bold uppercase tracking-widest">{prod.category}</p>
                    <h3 className="text-2xl font-serif text-primary px-4">{prod.name}</h3>
                    <p className="text-primary font-bold opacity-80">R$ {prod.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Section */}
        <section id="jewelry-section" className="py-32 px-6">
          <div className="max-w-7xl mx-auto rounded-[60px] bg-primary relative overflow-hidden p-12 md:p-24">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-on-primary rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-on-primary rounded-full"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10 text-on-primary">
              <div className="space-y-10">
                <span className="material-symbols-outlined text-7xl text-on-primary/40">diamond</span>
                <h2 className="text-5xl md:text-7xl font-serif leading-tight">Excelência em Cada <span className="italic block mt-2">Pequeno Detalhe.</span></h2>
                <p className="text-xl text-on-primary/70 leading-relaxed max-w-lg">Nossos artesãos dominam técnicas ancestrais de ourivesaria para criar joias que resistem ao teste do tempo e transcendem gerações.</p>
                <div className="flex items-center gap-6">
                  <button className="px-10 py-5 rounded-full bg-white text-primary font-bold shadow-2xl hover:scale-105 transition-all">Nossas Oficinas</button>
                  <button className="text-on-primary font-bold border-b-2 border-on-primary/20 pb-1 hover:border-on-primary transition-all">Processo de Criação</button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[80px] overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-700">
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" alt="Process" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-[40px] bg-surface-container-lowest p-6 text-primary flex flex-col justify-between shadow-2xl rotate-6 animate-pulse">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Artesanato</p>
                  <div className="text-4xl font-serif">100%</div>
                  <p className="text-sm font-medium">Feito à Mão em Paris</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 border-b border-primary/5 pb-12">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-4xl">auto_stories</span>
            <span className="text-primary font-bold text-3xl tracking-tighter uppercase font-serif">Grand Lecture</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-primary/60 uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Pinterest</a>
            <a href="#" className="hover:text-primary transition-colors">Journal</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-primary/40 uppercase tracking-widest">
          <p>© 2024 Maison Grand Lecture. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
          </div>
        </div>
      </footer>

      {/* Modals for Interactivity */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] max-w-4xl w-full overflow-hidden shadow-2xl relative z-10 grid md:grid-cols-2"
            >
              <div className="aspect-[4/5]">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
              </div>
              <div className="p-12 space-y-6 flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <p className="text-primary/50 text-xs font-bold uppercase tracking-widest">{selectedProduct.category}</p>
                <h3 className="text-4xl font-serif text-primary leading-tight">{selectedProduct.name}</h3>
                <p className="text-on-surface-variant leading-relaxed">{selectedProduct.description}</p>
                <div className="text-2xl font-bold text-primary">R$ {selectedProduct.price.toLocaleString()}</div>
                <button 
                  onClick={() => {
                    addToCart();
                    setSelectedProduct(null);
                  }}
                  className="w-full py-5 rounded-full bg-primary text-on-primary font-bold shadow-xl hover:bg-primary/95 transition-all"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isVideoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative z-10 w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-colors z-20"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-6">
                <span className="material-symbols-outlined text-8xl animate-pulse">movie</span>
                <p className="text-2xl font-serif italic">Carregando a essência de Grand Lecture...</p>
                <p className="text-sm opacity-60">Prepare-se para o volume 01</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
