import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, ChevronRight, TrendingUp, Heart, Briefcase, 
  GraduationCap, MessageCircle, X, Quote, Send, User, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// IMPORT DU CLIENT SUPABASE
import { supabase } from './lib/supabase'; 

const cmsData = {
  hero: {
    title: "L'Innovation pour l'Inclusion.",
    subtitle: "La DPJIC est une association à but non lucratif œuvrant pour l’inclusion sociale, économique et professionnelle des jeunes et des personnes vulnérables au Cameroun.",
    bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
  },
  vision: {
    image1: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80",
    image2: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
    description: "Née du constat de la marginalisation croissante et du chômage massif, la DPJIC s'unit pour apporter des solutions durables aux défis de notre génération."
  },
  contact: {
    phone: "+237 675 936 892",
    email: "contact@dpjic.org"
  }
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ email: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // État pour le formulaire de contact
  const [contactForm, setContactForm] = useState({ name: "", org: "", email: "", phone: "" });

  // 1. CHARGEMENT DES DONNÉES DEPUIS LA BD
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    
    if (!error && data) setComments(data);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    fetchComments(); // Appel initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. ENVOI DU COMMENTAIRE À LA BD
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.email || !newComment.text) return;

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('comments')
      .insert([{ email: newComment.email, text: newComment.text }]);

    if (!error) {
      setNewComment({ email: "", text: "" });
      fetchComments(); // Rafraîchir la liste
    }
    setIsSubmitting(false);
  };

  // 3. ENVOI DU PARTENARIAT À LA BD
  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('partnerships')
      .insert([contactForm]);

    if (!error) {
      alert("Proposition envoyée !");
      setContactForm({ name: "", org: "", email: "", phone: "" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-green-600 selection:text-white">
      
      {/* 1. HEADER */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-4" : "bg-transparent py-8"
      }`}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center p-1 border border-slate-100">
               <img src="/logo-dpjic.png" alt="Logo DPJIC" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-2xl tracking-tighter leading-none ${isScrolled ? "text-blue-900" : "text-white"}`}>DPJIC</span>
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] mt-1 ${isScrolled ? "text-green-600" : "text-yellow-400"}`}>Cameroun</span>
            </div>
          </div>
          
          <div className={`hidden lg:flex gap-12 font-bold text-[13px] uppercase tracking-[0.15em] ${isScrolled ? "text-slate-600" : "text-white/90"}`}>
            <a href="#vision" className="hover:text-green-600 transition-colors">Vision</a>
            <a href="#impact" className="hover:text-green-600 transition-colors">Impact</a>
            <a href="#commentaires" className="hover:text-green-600 transition-colors">Avis</a>
            <a href="#contact" className="hover:text-green-600 transition-colors">Partenariat</a>
          </div>
          <div className="w-20 lg:hidden"></div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative h-[110vh] w-full flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img src={cmsData.hero.bgImage} className="w-full h-full object-cover opacity-40 scale-105" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/40 to-transparent" />
        </div>
        <div className="relative z-20 max-w-[1440px] mx-auto w-full px-8 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-yellow-400" />
              <span className="text-white text-sm font-black uppercase tracking-[0.4em]">Bâtisseur de Paix et de Progrès</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-10 text-white leading-[0.95] tracking-tighter uppercase">
              L'Innovation <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">pour l'Inclusion</span>
            </h1>
            <p className="text-2xl text-slate-200 mb-12 max-w-2xl font-medium leading-relaxed opacity-90">{cmsData.hero.subtitle}</p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-[#E21F26] text-white px-12 py-5 rounded-2xl font-black flex items-center gap-3 hover:shadow-2xl transition-all group">
                Découvrir nos projets <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. IMPACT SECTION */}
      <section id="impact" className="py-32 bg-white relative z-10 -mt-24 px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ImpactCard number="1000+" label="Jeunes Formés" sub="Leadership et Entrepreneuriat" />
          <ImpactCard number="150+" label="Projets Créés" sub="Par nos jeunes innovateurs" />
          <ImpactCard number="2000+" label="Emplois Créés" sub="Directement et indirectement" />
          <ImpactCard number="50+" label="Partenaires" sub="ONG, Communes et Institutions" />
        </div>
      </section>

      {/* 4. COMMENTAIRES (LIAISON DB) */}
      <section id="commentaires" className="py-40 bg-slate-50 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <span className="text-[#E21F26] font-black uppercase tracking-[0.3em] text-sm block mb-4">Témoignages</span>
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-12">Ce qu'ils disent de nous.</h2>
              <div className="space-y-6">
                {comments.map((c, index) => (
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} key={c.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative group">
                    <Quote className="absolute top-6 right-8 text-slate-100 group-hover:text-green-100 transition-colors" size={40} />
                    <p className="text-slate-600 font-medium mb-6 italic">"{c.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><Users size={18} /></div>
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{c.email.split('@')[0]}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Membre</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100">
              <h3 className="text-3xl font-black text-slate-900 mb-2">Laissez un message.</h3>
              <form onSubmit={handleCommentSubmit} className="space-y-8 mt-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Votre Email</label>
                  <input type="email" required value={newComment.email} onChange={(e) => setNewComment({...newComment, email: e.target.value})} placeholder="nom@exemple.com" className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold outline-none focus:ring-2 ring-green-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Votre Commentaire</label>
                  <textarea required rows="4" value={newComment.text} onChange={(e) => setNewComment({...newComment, text: e.target.value})} placeholder="Votre expérience..." className="w-full bg-slate-50 border-none rounded-3xl p-5 font-bold outline-none focus:ring-2 ring-green-500 transition-all resize-none" />
                </div>
                <button disabled={isSubmitting} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-xl">
                  {isSubmitting ? "Envoi..." : "Publier mon avis"} <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISION */}
      <section id="vision" className="py-40 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="text-[#2D8A4E] font-black uppercase tracking-[0.3em] text-sm block mb-6">Notre Raison d'Être</span>
            <h2 className="text-6xl font-black text-slate-900 mb-10 leading-tight">Transformer les défis en opportunités locales.</h2>
            <p className="text-xl text-slate-600 mb-12 font-medium">{cmsData.vision.description}</p>
            <div className="space-y-8">
              <ValueBar title="Autonomisation Durable" desc="Favoriser l'indépendance financière." />
              <ValueBar title="Paix & Cohésion" desc="Bâtir une société solidaire." />
              <ValueBar title="Innovation Sociale" desc="Encourager la créativité." />
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-8">
             <img src={cmsData.vision.image1} className="rounded-[3rem] shadow-2xl w-full h-[500px] object-cover" alt="V1" />
             <div className="pt-20 space-y-8">
                <div className="bg-yellow-400 p-10 rounded-[2.5rem] text-blue-900 shadow-xl font-black italic text-4xl">2030</div>
                <img src={cmsData.vision.image2} className="rounded-[3rem] shadow-2xl w-full h-[400px] object-cover" alt="V2" />
             </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT (LIAISON DB) */}
      <section id="contact" className="py-40 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12">
          <div className="bg-slate-900 rounded-[4rem] p-16 md:p-24 text-white flex flex-col lg:flex-row gap-20 shadow-2xl">
            <div className="lg:w-1/3">
              <h2 className="text-5xl font-black mb-8 italic">Rejoindre l'Action.</h2>
              <div className="space-y-10">
                <ContactInfo icon={<Mail />} label="Email" value={cmsData.contact.email} />
                <ContactInfo icon={<Phone />} label="WhatsApp" value={cmsData.contact.phone} />
              </div>
            </div>
            <div className="lg:w-2/3">
              <form onSubmit={handlePartnerSubmit} className="grid md:grid-cols-2 gap-10">
                <Input label="Nom Complet" placeholder="Nom" value={contactForm.name} onChange={(v)=>setContactForm({...contactForm, name: v})} />
                <Input label="Organisation" placeholder="Entreprise" value={contactForm.org} onChange={(v)=>setContactForm({...contactForm, org: v})} />
                <Input label="Email" placeholder="Email" value={contactForm.email} onChange={(v)=>setContactForm({...contactForm, email: v})} />
                <Input label="Téléphone" placeholder="+237" value={contactForm.phone} onChange={(v)=>setContactForm({...contactForm, phone: v})} />
                <div className="md:col-span-2">
                  <button className="w-full bg-yellow-400 text-blue-900 py-6 rounded-2xl font-black text-xl hover:scale-[1.02] transition-all">
                    Envoyer ma proposition
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CHATBOX */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="bg-[#2D8A4E] p-6 text-white flex justify-between items-center font-bold">
                <span>Support DPJIC</span>
                <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-6 bg-slate-50 p-4 rounded-2xl">Bonjour ! Besoin d'aide ?</p>
                <a href={`https://wa.me/${cmsData.contact.phone.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#2D8A4E] text-white py-4 rounded-2xl font-black">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-[#2D8A4E] text-white rounded-full flex items-center justify-center shadow-2xl"><MessageCircle size={28} /></button>
      </div>

      <footer className="py-12 bg-slate-950 text-center text-slate-600 font-black text-xs tracking-[0.4em]">
        © 2026 DPJIC • TOUS DROITS RÉSERVÉS
      </footer>
    </div>
  );
};

// --- COMPOSANTS ---
const ImpactCard = ({ number, label, sub }) => (
  <motion.div whileHover={{ y: -10 }} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50 text-center">
    <p className="text-5xl font-black text-[#E21F26] mb-2">{number}</p>
    <p className="text-slate-900 font-black uppercase tracking-widest text-sm">{label}</p>
    <p className="text-slate-400 text-xs font-bold mt-2">{sub}</p>
  </motion.div>
);

const ValueBar = ({ title, desc }) => (
  <div className="flex gap-8 group">
    <div className="w-1.5 h-auto bg-yellow-400 rounded-full group-hover:bg-green-600 transition-colors" />
    <div>
      <h4 className="font-black text-slate-900 mb-1 uppercase tracking-widest text-sm">{title}</h4>
      <p className="text-slate-500 text-lg font-medium">{desc}</p>
    </div>
  </div>
);

const ContactInfo = ({ icon, label, value }) => (
  <div className="flex gap-6 items-center">
    <div className="text-yellow-400">{React.cloneElement(icon, { size: 28 })}</div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">{label}</p>
      <p className="font-bold text-xl">{value}</p>
    </div>
  </div>
);

const Input = ({ label, placeholder, value, onChange }) => (
  <div className="border-b-2 border-white/20 pb-4 focus-within:border-yellow-400 transition-colors">
    <label className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-2">{label}</label>
    <input 
      value={value} 
      onChange={(e)=>onChange(e.target.value)} 
      className="bg-transparent w-full text-white font-bold outline-none placeholder:text-white/10" 
      placeholder={placeholder} 
    />
  </div>
);

export default App;