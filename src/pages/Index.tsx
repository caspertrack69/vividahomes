import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Hanya impor gambar yang benar-benar ada
import heroImage1 from "@/assets/hero-vivida-homes.jpg";

const houseTypes = {
  elara: {
    name: "Tipe Elara",
    specs: ["3 Kamar Tidur", "2 Kamar Mandi", "2 Carport", "Listrik 2200W"],
    description: "Unit ini dirancang untuk menghadirkan kenyamanan modern dengan pencahayaan alami berlimpah, sirkulasi udara optimal, dan tata ruang efisien. Material pilihan memastikan ketahanan dan kemudahan perawatan, menjadikannya ideal bagi keluarga aktif.",
    images: [
      "https://placehold.co/800x500/F8F9FA/1D2939?text=Tipe+Elara+Detail",
      "https://placehold.co/400x250/F8F9FA/1D2939?text=Elara+Thumbnail+1",
      "https://placehold.co/400x250/F8F9FA/1D2939?text=Elara+Thumbnail+2",
    ]
  },
  lyra: {
    name: "Tipe Lyra",
    specs: ["4 Kamar Tidur", "3 Kamar Mandi", "2 Carport", "Listrik 3500W", "Ruang Kerja", "Smart Home Ready"],
    description: "Tipe Lyra menawarkan ruang yang lebih luas dengan tambahan ruang kerja khusus dan persiapan untuk sistem smart home. Desainnya memaksimalkan produktivitas dan gaya hidup modern, cocok untuk profesional dan keluarga yang sedang berkembang.",
    images: [
      "https://placehold.co/800x500/EBF3FF/1D2939?text=Tipe+Lyra+Detail",
      "https://placehold.co/400x250/EBF3FF/1D2939?text=Lyra+Thumbnail+1",
      "https://placehold.co/400x250/EBF3FF/1D2939?text=Lyra+Thumbnail+2",
    ]
  }
};

const Index = () => {
  const [openModal, setOpenModal] = useState<null | "elara" | "lyra">(null);
  const selectedHouse = openModal ? houseTypes[openModal] : null;

  // --- LOGIKA SLIDER ---

  // Data slides dengan URL placeholder sebagai string
  const slides = [
    {
      image: heroImage1, // Ini dari import karena filenya ada
      alt: "Fasad rumah modern Vivida Homes",
      title: "Hidup Modern, Tenang, dan Terhubung di Vivida Homes",
      description: "Rumah bergaya Skandinavia dengan fasilitas premium untuk hidup yang lebih nyaman.",
      button: {
        text: "Unduh E-Brosur",
        href: "/Vivida-Homes-Brosur.pdf",
        download: true,
      },
    },
    {
      // PERBAIKAN: Langsung gunakan URL string, bukan variabel import
      image: "https://placehold.co/1280x720/F8F9FA/1D2939?text=Tipe+Elara",
      alt: "Interior Tipe Elara yang elegan",
      title: "Tipe Elara: Efisiensi dan Gaya",
      description: "Desain fungsional untuk keluarga aktif yang dinamis.",
      button: {
        text: "Lihat Tipe Elara",
        onClick: () => setOpenModal("elara"),
      },
    },
    {
      // PERBAIKAN: Langsung gunakan URL string, bukan variabel import
      image: "https://placehold.co/1280x720/EBF3FF/1D2939?text=Tipe+Lyra",
      alt: "Ruang kerja di Tipe Lyra",
      title: "Tipe Lyra: Luas dan Produktif",
      description: "Dilengkapi ruang kerja khusus dan siap untuk smart home.",
      button: {
        text: "Lihat Tipe Lyra",
        onClick: () => setOpenModal("lyra"),
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const SLIDE_DELAY = 5000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      SLIDE_DELAY
    );
    return () => {
      resetTimeout();
    };
  }, [currentIndex, slides.length]);
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div>
      <header className="border-b border-border">
        <div className="mr-container flex items-center justify-between h-16">
          <a href="/" className="font-semibold text-lg tracking-tight">Vivida Homes</a>
          <nav className="hidden md:flex gap-6 text-sm text-subtle">
            <a href="#tipe-rumah" className="hover:text-foreground transition-colors">Tipe Rumah</a>
            <a href="#fasilitas" className="hover:text-foreground transition-colors">Fitur</a>
            <a href="#cta" className="hover:text-foreground transition-colors">E-Brosur</a>
          </nav>
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-heading" className="relative">
          <div className="mr-container py-10 md:py-16">
            <div className="relative w-full overflow-hidden rounded-lg border border-border aspect-video">
              
              <div className="w-full h-full">
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: slideIndex === currentIndex ? 1 : 0 }}
                  >
                    <img
                      src={slide.image} // `src` sekarang bisa menerima variabel import atau URL string
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

              <div className="absolute inset-y-0 left-0 flex flex-col justify-center md:justify-end p-6 md:p-8 lg:p-10 w-full md:w-2/3 lg:max-w-2xl">
                <h1 id="hero-heading" className="hidden md:block text-4xl lg:text-5xl font-bold leading-tight">
                  {slides[currentIndex].title}
                </h1>
                <p className="hidden md:block mt-2 text-lg lg:text-xl text-body">
                  {slides[currentIndex].description}
                </p>

                <div className="flex justify-center md:justify-start md:mt-6">
                  <Button
                    size="lg"
                    onClick={slides[currentIndex].button.onClick}
                    asChild={!slides[currentIndex].button.onClick}
                  >
                    {slides[currentIndex].button.href ? (
                      <a href={slides[currentIndex].button.href} download={slides[currentIndex].button.download}>
                        {slides[currentIndex].button.text}
                      </a>
                    ) : (
                      <span>{slides[currentIndex].button.text}</span>
                    )}
                  </Button>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, slideIndex) => (
                  <button
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      currentIndex === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${slideIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ... Sisa konten halaman Anda ... */}
        <section id="fasilitas" aria-labelledby="features-heading" className="py-12 md:py-16">
          <div className="mr-container">
            <h2 id="features-heading" className="text-2xl font-semibold mb-6">Keunggulan Utama</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <article className="mr-card p-6">
                <h3 className="text-lg font-semibold">Desain Modern Skandinavia</h3>
                <p className="mt-2 text-body">Tata ruang fungsional, ventilasi optimal, dan cahaya alami maksimal untuk kenyamanan keluarga—hangat, rapi, mudah dirawat.</p>
              </article>
              <article className="mr-card p-6">
                <h3 className="text-lg font-semibold">Konektivitas Tanpa Batas</h3>
                <p className="mt-2 text-body">5 menit ke gerbang tol, 10 menit ke pusat bisnis—mobilitas lancar untuk kerja, sekolah, dan gaya hidup aktif.</p>
              </article>
              <article className="mr-card p-6">
                <h3 className="text-lg font-semibold">Oase Pribadi Anda</h3>
                <p className="mt-2 text-body">Satu pintu keamanan, clubhouse, jogging track tepi danau, dan siap smart home—sehat, aman, dan praktis.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="tipe-rumah" aria-labelledby="types-heading" className="py-12 md:py-16">
          <div className="mr-container">
            <h2 id="types-heading" className="text-2xl font-semibold mb-6">Pilihan Tipe Rumah</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="mr-card group">
                <img
                  src="https://placehold.co/600x400/F8F9FA/1D2939?text=Tipe+Elara"
                  alt="Tipe Elara — placeholder"
                  loading="lazy"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Tipe Elara</h3>
                  <p className="mt-1 text-xs text-subtle">LB 80 m² | LT 90 m²</p>
                  <p className="mt-3 text-2xl font-bold">Mulai dari Rp 1.2 M</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="mr-tag">Best Seller</span>
                    <span className="mr-tag">2 Lantai</span>
                  </div>
                  <div className="mt-5">
                    <Button variant="secondary" onClick={() => setOpenModal("elara")}>Lihat Detail</Button>
                  </div>
                </div>
              </article>
              <article className="mr-card group">
                <img
                  src="https://placehold.co/600x400/F8F9FA/1D2939?text=Tipe+Lyra"
                  alt="Tipe Lyra — placeholder"
                  loading="lazy"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">Tipe Lyra</h3>
                  <p className="mt-1 text-xs text-subtle">LB 120 m² | LT 120 m²</p>
                  <p className="mt-3 text-2xl font-bold">Mulai dari Rp 1.8 M</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="mr-tag">Smart Home</span>
                    <span className="mr-tag">Ruang Kerja</span>
                  </div>
                  <div className="mt-5">
                    <Button variant="secondary" onClick={() => setOpenModal("lyra")}>Lihat Detail</Button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      {selectedHouse && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-[hsl(var(--overlay)/0.6)]"
            aria-hidden="true"
            onClick={() => setOpenModal(null)}
          />
          <div className="relative h-full flex items-center justify-center p-4">
            <div
              className="mr-modal max-w-2xl w-full p-6 md:p-8 relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                aria-label="Tutup"
                onClick={() => setOpenModal(null)}
                className="absolute top-3 right-3 p-2 rounded-md text-subtle hover:bg-muted"
              >
                <X size={20} />
              </button>

              <h2 id="modal-title" className="text-xl font-semibold">
                {selectedHouse.name}
              </h2>

              <div className="mt-4">
                <img
                  src={selectedHouse.images[0]}
                  alt={`Gambar utama ${selectedHouse.name}`}
                  className="w-full h-64 object-cover rounded-md border border-border"
                />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <img
                    src={selectedHouse.images[1]}
                    alt="Thumbnail 1"
                    className="w-full h-28 object-cover rounded-md border border-border"
                  />
                  <img
                    src={selectedHouse.images[2]}
                    alt="Thumbnail 2"
                    className="w-full h-28 object-cover rounded-md border border-border"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-semibold">Spesifikasi</h3>
                <ul className="mt-2 grid grid-cols-2 gap-y-2 text-body text-sm">
                  {selectedHouse.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-semibold">Deskripsi</h3>
                <p className="mt-2 text-body text-sm">
                  {selectedHouse.description}
                </p>
              </div>

              <div className="mt-8">
                <Button size="lg" asChild>
                  <a href="https://wa.me/6285806391116?text=Halo%20Vivida%20Homes,%20saya%20ingin%20menjadwalkan%20kunjungan." target="_blank">
                    Jadwalkan Kunjungan
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-border">
        <div className="mr-container py-6 text-sm text-subtle">© {new Date().getFullYear()} Vivida Homes. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Index;