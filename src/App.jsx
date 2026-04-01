import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, ChevronRight, MessageCircle, X, Quote, Send, Users, 
  Target, Rocket, Heart, Shield, CheckCircle2, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase'; 

const cmsData = {
  hero: {
    title: "L'Innovation pour l'Inclusion.",
    subtitle: "La DPJIC est une association à but non lucratif œuvrant pour l’inclusion sociale, économique et professionnelle des jeunes et des personnes vulnérables au Cameroun.",
    bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
  },
  vision: {
    description: "La DPJIC aspire à devenir le catalyseur principal de transformation socio-économique pour la jeunesse camerounaise. Nous créons un écosystème durable où l'innovation et l'inclusion permettent à chaque talent de s'épanouir.",
    objectives: [
      { id: "01", icon: <Heart className="text-red-500" />, title: "Assistance aux Vulnérables", desc: "Soutien direct aux enfants de la rue, déplacés internes et personnes en situation de handicap." },
      { id: "02", icon: <Rocket className="text-blue-500" />, title: "Encadrement & Formation", desc: "Programmes intensifs en entrepreneuriat, numérique et leadership pour les jeunes filles et garçons." },
      { id: "03", icon: <Shield className="text-green-500" />, title: "Autonomisation Durable", desc: "Accès aux ressources et outils pour transformer chaque jeune en un acteur économique autonome." },
      { id: "04", icon: <Target className="text-yellow-500" />, title: "Innovation Sociale", desc: "Promotion de projets locaux répondant aux défis environnementaux et sociaux du Cameroun." }
    ],
    targets: [
      { label: "Jeunes Autonomisés", value: "5000+" },
      { label: "Entreprises Sociales", value: "500+" },
      { label: "Emplois Créés", value: "10000+" },
      { label: "Régions Couvertes", value: "10+" }
    ]
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
  const [contactForm, setContactForm] = useState({ name: "", org: "", email: "", phone: "" });
  const [visionGallery, setVisionGallery] = useState([]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    if (!error && data) setComments(data);
  };
  // FONCTION POUR RÉCUPÉRER LES IMAGES DE LA GALERIE
  const fetchVisionGallery = async () => {
    const { data, error } = await supabase
      .from('vision_gallery') // Assurez-vous que le nom de la table est correct
      .select('image_url');
    if (!error && data) setVisionGallery(data);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    fetchComments();
    fetchVisionGallery(); // Appel de la fonction
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    fetchComments();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase
      .from('comments')
      .insert([{ email: newComment.email, text: newComment.text }]);
    if (!error) {
      setNewComment({ email: "", text: "" });
      fetchComments();
    }
    setIsSubmitting(false);
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('partnerships').insert([contactForm]);
    if (!error) {
      alert("Proposition envoyée !");
      setContactForm({ name: "", org: "", email: "", phone: "" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-green-600 selection:text-white">
      
      {/* HEADER */}
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
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[100vh] w-full flex items-center overflow-hidden bg-slate-900">
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
            <p className="text-2xl text-slate-200 mb-12 max-w-2xl font-medium leading-relaxed">{cmsData.hero.subtitle}</p>
            <button className="bg-[#E21F26] text-white px-12 py-5 rounded-2xl font-black flex items-center gap-3 hover:shadow-2xl transition-all">
              Nos projets <ChevronRight />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 1. VISION EXPLICITE AVEC ZONE D'IMAGES */}
      <section id="vision" className="py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
              <span className="text-[#2D8A4E] font-black uppercase tracking-[0.3em] text-sm block mb-6">
                Horizon 2030
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
                Bâtir un futur <br/>
                <span className="text-green-600 underline decoration-yellow-400">plus solidaire.</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl mb-10">
                {cmsData.vision.description}
              </p>

              {/* NOUVELLE ZONE DE DÉFILEMENT DES IMAGES */}
              <div className="relative group">
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
                  {visionGallery.length > 0 ? (
                    visionGallery.map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        className="min-w-[280px] h-48 rounded-3xl overflow-hidden shadow-lg snap-center flex-shrink-0"
                        whileHover={{ scale: 1.02 }}
                      >
                        <img src={item.image_url} alt="Action DPJIC" className="w-full h-full object-cover" />
                      </motion.div>
                    ))
                  ) : (
                    // Skeleton loader si aucune image n'est encore chargée
                    [1, 2, 3].map((n) => (
                      <div key={n} className="min-w-[280px] h-48 bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200">
                        <ImageIcon className="text-slate-300" size={32} />
                      </div>
                    ))
                  )}
                </div>
                {/* Indicateur de scroll visuel */}
                <div className="flex gap-2 mt-2">
                  <div className="h-1.5 w-10 bg-green-600 rounded-full" />
                  <div className="h-1.5 w-2 bg-slate-200 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Indicateurs de réussite Vision 2030 (Inchangés) */}
            <div className="grid grid-cols-2 gap-4">
              {cmsData.vision.targets.map((target, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group hover:bg-slate-900 transition-all duration-500">
                  <p className="text-4xl font-black text-green-600 mb-2 group-hover:text-yellow-400">{target.value}</p>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-white">{target.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cartes d'Objectifs Stratégiques (Inchangées) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cmsData.vision.objectives.map((obj) => (
              <motion.div 
                key={obj.id}
                whileHover={{ y: -10 }}
                className="relative p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group"
              >
                {/* ... contenu des cartes ... */}
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {obj.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 leading-snug">{obj.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{obj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. IMPACT */}
      <section id="impact" className="py-32 bg-slate-50 px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ImpactCard number="1000+" label="Jeunes Formés" sub="Leadership" />
          <ImpactCard number="150+" label="Projets Créés" sub="Innovation" />
          <ImpactCard number="2000+" label="Emplois" sub="Impact Direct" />
          <ImpactCard number="50+" label="Partenaires" sub="Institutions" />
        </div>
      </section>

      {/* 3. AVIS (COMMENTAIRES) */}
      <section id="commentaires" className="py-40 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <span className="text-[#E21F26] font-black uppercase tracking-[0.3em] text-sm block mb-4">Témoignages</span>
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-12">Ce qu'ils disent.</h2>
              <div className="space-y-6">
                {comments.map((c) => (
                  <div key={c.id} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 relative group">
                    <Quote className="absolute top-6 right-8 text-slate-200" size={40} />
                    <p className="text-slate-600 font-medium mb-6 italic">"{c.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400"><Users size={18} /></div>
                      <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{c.email.split('@')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100">
              <h3 className="text-3xl font-black mb-10 text-slate-900">Laissez un message.</h3>
              <form onSubmit={handleCommentSubmit} className="space-y-8">
                <input type="email" required value={newComment.email} onChange={(e) => setNewComment({...newComment, email: e.target.value})} placeholder="Votre Email" className="w-full bg-slate-50 rounded-2xl p-5 font-bold outline-none focus:ring-2 ring-green-500 transition-all" />
                <textarea required rows="4" value={newComment.text} onChange={(e) => setNewComment({...newComment, text: e.target.value})} placeholder="Votre message..." className="w-full bg-slate-50 rounded-3xl p-5 font-bold outline-none focus:ring-2 ring-green-500 transition-all resize-none" />
                <button disabled={isSubmitting} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-green-600 transition-all">
                  {isSubmitting ? "Envoi..." : "Publier l'avis"} <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTENARIAT */}
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
                <Input label="Organisation" placeholder="Structure" value={contactForm.org} onChange={(v)=>setContactForm({...contactForm, org: v})} />
                <Input label="Email" placeholder="Email" value={contactForm.email} onChange={(v)=>setContactForm({...contactForm, email: v})} />
                <Input label="Téléphone" placeholder="+237" value={contactForm.phone} onChange={(v)=>setContactForm({...contactForm, phone: v})} />
                <div className="md:col-span-2">
                  <button className="w-full bg-yellow-400 text-blue-900 py-6 rounded-2xl font-black text-xl hover:scale-[1.02] transition-all">
                    Devenir Partenaire
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-950 text-center text-slate-600 font-black text-xs tracking-[0.4em]">
        © 2026 DPJIC • TOUS DROITS RÉSERVÉS
      </footer>

      {/* CHATBOX */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-[#2D8A4E] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all"><MessageCircle size={28} /></button>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="bg-[#2D8A4E] p-6 text-white flex justify-between items-center font-bold"><span>Support</span><button onClick={() => setIsChatOpen(false)}><X size={20} /></button></div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-6 bg-slate-50 p-4 rounded-2xl">Besoin d'aide ?</p>
                <a href={`https://wa.me/${cmsData.contact.phone.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#2D8A4E] text-white py-4 rounded-2xl font-black transition-all hover:bg-blue-900">
                   WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// COMPOSANTS DE SOUTIEN
const ImpactCard = ({ number, label, sub }) => (
  <motion.div whileHover={{ y: -10 }} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50 text-center">
    <p className="text-5xl font-black text-[#E21F26] mb-2">{number}</p>
    <p className="text-slate-900 font-black uppercase tracking-widest text-sm">{label}</p>
    <p className="text-slate-400 text-xs font-bold mt-2">{sub}</p>
  </motion.div>
);

const ContactInfo = ({ icon, label, value }) => (
  <div className="flex gap-6 items-center">
    <div className="text-yellow-400">{React.cloneElement(icon, { size: 24 })}</div>
    <div><p className="text-[10px] font-black uppercase text-blue-400 tracking-widest">{label}</p><p className="font-bold text-xl">{value}</p></div>
  </div>
);

const Input = ({ label, placeholder, value, onChange }) => (
  <div className="border-b-2 border-white/20 pb-4 focus-within:border-yellow-400 transition-colors">
    <label className="text-[10px] font-black uppercase text-blue-400 tracking-widest block mb-2">{label}</label>
    <input value={value} onChange={(e)=>onChange(e.target.value)} className="bg-transparent w-full text-white font-bold outline-none placeholder:text-slate-500" placeholder={placeholder} />
  </div>
);

export default App;