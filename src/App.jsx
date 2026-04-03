import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { 
  ChevronRight, MessageCircle, Users, Lightbulb, TrendingUp, Heart, Menu, X, CheckCircle2, Briefcase, Award, Globe, Quote,
  Mail, Phone, MapPin, Share2,Link as LinkIcon, Hash,
  Send, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const cmsData = {
  heroSlides: [
    {
      title: "L'Innovation au service de l'Inclusion",
      subtitle: "La DPJIC est une association à but non lucratif œuvrant pour l’inclusion sociale, économique et professionnelle des jeunes.",
      image: "/slide1.png"
    },
    {
      title: "Autonomisation des Jeunes",
      subtitle: "Promouvoir l'entrepreneuriat à travers l'innovation, la formation et l'action communautaire.",
      image: "/slide2.png"
    },
    {
      title: "Redonner une chance à chaque vie",
      subtitle: "Parce que chaque personne mérite dignité et opportunité, nous œuvrons au quotidien pour les plus vulnérables.",
      image: "/slide3.png"
    }
  ],
  mission: {
    title: "Notre Mission",
    description: "DPJIC est une association humanitaire dédiée à la transformation de la jeunesse camerounaise. Nous croyons au pouvoir de l'innovation, de la collaboration et de l'autonomisation pour créer un avenir meilleur.",
    cards: [
      {
        title: "Cadre d'Opportunités",
        desc: "Créer un espace collaboratif où les jeunes innovateurs peuvent se rencontrer, partager des idées et construire ensemble des solutions durables.",
        icon: <Users className="text-blue-600" size={24} />,
        gradient: "from-blue-50 to-indigo-50"
      },
      {
        title: "Innovation Sociale",
        desc: "Promouvoir l'innovation sociale en encourageant les jeunes à développer des projets qui répondent aux défis sociaux et environnementaux.",
        icon: <Lightbulb className="text-yellow-600" size={24} />,
        gradient: "from-yellow-50 to-orange-50"
      },
      {
        title: "Autonomisation Économique",
        desc: "Soutenir l'entrepreneuriat et l'autonomisation durable de la jeunesse à travers la formation, le mentorat et l'accès aux ressources.",
        icon: <TrendingUp className="text-green-600" size={24} />,
        gradient: "from-green-50 to-emerald-50"
      },
      {
        title: "Inclusion Socioprofessionnelle",
        desc: "Œuvrer pour l'inclusion des personnes vulnérables dans les opportunités professionnelles et le développement économique.",
        icon: <Heart className="text-red-600" size={24} />,
        gradient: "from-red-50 to-rose-50"
      }
    ]
  },
  objectifs: {
    title: "Objectifs Stratégiques",
    description: "Nous travaillons sur des piliers fondamentaux pour transformer la vie des jeunes et créer un impact durable dans les communautés camerounaises.",
    items: [
      {
        id: "01",
        title: "Assistance des Personnes Vulnérables",
        desc: "Fournir une assistance directe et un soutien aux enfants de la rue, personnes âgées, handicapés, déplacés internes et réfugiés."
      },
      {
        id: "02",
        title: "Encadrement et Formation",
        desc: "Offrir une formation de qualité aux jeunes innovateurs pour développer leurs compétences entrepreneuriales et techniques."
      },
      {
        id: "03",
        title: "Autonomisation Durable",
        desc: "Créer les conditions pour que chaque jeune devienne autonome économiquement avec un accès réel aux opportunités."
      },
      {
        id: "04",
        title: "Innovation et Entrepreneuriat",
        desc: "Encourager la création d'entreprises sociales répondant aux besoins locaux et créatrices d'emplois durables."
      },
      {
        id: "05",
        title: "Inclusion Socioprofessionnelle",
        desc: "Faciliter l'accès au monde professionnel pour les personnes marginalisées en promouvant l'égalité des chances."
      }
    ]
  },
  impact: {
    title: "Notre Impact & Transformation",
    subtitle: "Découvrez comment DPJIC transforme des vies et crée des opportunités pour la jeunesse camerounaise.",
    stats: [
      { label: "Jeunes Autonomisés", value: "500+", desc: "Bénéficiaires de nos programmes", icon: <Users size={20}/> },
      { label: "Entreprises Créées", value: "150+", desc: "Par nos membres entrepreneurs", icon: <Briefcase size={20}/> },
      { label: "Emplois Créés", value: "2000+", desc: "Directement et indirectement", icon: <TrendingUp size={20}/> },
      { label: "Projets Sociaux", value: "50+", desc: "Impactant les communautés", icon: <Heart size={20}/> }
    ],
    realisations: [
      {
        tag: "Formation",
        title: "Formation Professionnelle",
        date: "1000+ jeunes formés",
        desc: "Plus de 1000 jeunes formés en compétences entrepreneuriales et techniques pour dynamiser l'économie locale.",
        image: "r1.jpeg",
        icon: <Users size={14} className="text-orange-400" />
      },
      {
        tag: "Accompagnement",
        title: "Mentorat et Accompagnement",
        date: "200+ Mentors",
        desc: "Un réseau de mentors expérimentés guidant les jeunes innovateurs dans la réussite de leurs projets.",
        image: "/r2.jpeg",
        icon: <Award size={14} className="text-orange-400" />
      },
      {
        tag: "Entrepreneuriat",
        title: "Accès aux Ressources",
        date: "Financement & Outils",
        desc: "Facilitation d'accès au financement et aux outils essentiels pour le développement des entrepreneurs.",
        image: "r3.png",
        icon: <Briefcase size={14} className="text-orange-400" />
      },
      {
        tag: "Social",
        title: "Inclusion Sociale",
        date: "Programmes spécifiques",
        desc: "Actions dédiées pour l'intégration et le soutien des personnes vulnérables et marginalisées.",
        image: "/r4.jpg",
        icon: <Globe size={14} className="text-orange-400" />
      }
    ]
  },
  vision2030: {
    title: "Vision pour 2030",
    desc: "Nous aspirons à devenir le catalyseur principal de transformation socio-économique pour la jeunesse camerounaise, en créant un écosystème durable d'innovation.",
    points: [
      "5000+ jeunes autonomisés",
      "500+ entreprises sociales",
      "10000+ emplois créés",
      "Présence dans 10+ régions"
    ]
  },
};

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % cmsData.heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [dbComments, setDbComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({ email: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments') // Nom de ta table
        .select('*')
        .order('created_at', { ascending: false }) // Les plus récents en premier
        .limit(4); // <--- On change 6 par 4 ici

      if (error) throw error;
      setDbComments(data || []);
    } catch (error) {
      console.error("Erreur de récupération:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.email || !newComment.text) return alert("Veuillez remplir tous les champs");

    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('comments')
        .insert([
          { email: newComment.email, text: newComment.text }
        ]);

      if (error) throw error;

      // Réinitialiser le formulaire et rafraîchir la liste
      setNewComment({ email: '', text: '' });
      fetchComments(); // Relance la récupération des 4 derniers commentaires
    } catch (error) {
      console.error("Erreur:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img 
              src="/logo.png" 
              alt="Logo DPJIC" 
              className="w-10 h-10 object-contain rounded-xl shadow-md"
            />
            
            <span className="font-black text-2xl tracking-tighter text-blue-900">
              DPJIC
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-10 font-bold text-[13px] text-slate-500 uppercase tracking-widest">
            {["Accueil", "Mission", "Objectifs", "Impact", "Avis", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <button className="hidden sm:flex bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-bold items-center gap-2 hover:bg-blue-700 transition-all shadow-md">
            <a 
              href="https://wa.me/237675936892?text=Bonjour%20DPJIC,%20je%20souhaite%20faire%20un%20don%20pour%20soutenir%20vos%20actions%20envers%20les%20jeunes%20et%20les%20personnes%20vulnérables."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-bold items-center gap-2 hover:bg-blue-700 transition-all shadow-md"
            >
              <MessageCircle size={16} /> Faire un don
            </a>
          </button>
          <button className="lg:hidden p-2 text-blue-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-[85vh] mt-[70px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
          key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}  transition={{ duration: 1 }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
            <img src={cmsData.heroSlides[currentSlide].image} className="w-full h-full object-cover" alt="Slide" />
            <div className="absolute inset-0 z-30 flex items-center px-6 md:px-12">
              <div className="max-w-4xl text-white">
                <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-4xl md:text-8xl font-black leading-none mb-6 uppercase tracking-tighter italic">
                  {cmsData.heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg md:text-2xl text-white/80 mb-10 font-medium max-w-2xl leading-relaxed">
                  {cmsData.heroSlides[currentSlide].subtitle}
                </motion.p>
                <button 
                  onClick={() => {
                    document.getElementById("mission").scrollIntoView({ behavior: "smooth" });
                  }} 
                  className="bg-white text-blue-900 px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                  Découvrir
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* MISSION SECTION (Style m.jpeg) */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-black text-blue-900 mb-8 tracking-tighter uppercase italic">Notre Mission</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">{cmsData.mission.description}</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-slate-100 mx-10 mb-5"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {cmsData.mission.cards.map((card, idx) => (
              <div key={idx} className="group p-10 md:p-14 rounded-[45px] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-3xl font-black text-blue-900 mb-4 tracking-tight">{card.title}</h3>
                <p className="text-lg text-slate-500 leading-relaxed font-medium mb-10">{card.desc}</p>
                <div className="h-2 w-20 bg-gradient-to-r from-blue-600 to-orange-400 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIFS STRATÉGIQUES (Style ultra-moderne) */}
      <section id="objectifs" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-blue-900 mb-8 italic uppercase tracking-tighter">Objectifs Stratégiques</h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">{cmsData.objectifs.description}</p>
          </div>

          <div className="space-y-6">
            {cmsData.objectifs.items.map((obj, i) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={i} 
                className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden border border-white hover:border-blue-50"
              >
                {/* Numéro en fond */}
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-9xl font-black text-slate-50/80 pointer-events-none select-none">
                  {obj.id}
                </span>

                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100 relative z-10">
                  <CheckCircle2 size={24} />
                </div>

                <div className="flex-1 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black text-blue-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                    {obj.title}
                  </h3>
                  <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium max-w-4xl">
                    {obj.desc}
                  </p>
                </div>

                <div className="hidden md:flex w-14 h-14 rounded-full border border-slate-100 items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ChevronRight size={28} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION IMPACT - LES CHIFFRES */}
      <section id="impact" className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 italic uppercase tracking-tighter">{cmsData.impact.title}</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">{cmsData.impact.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {cmsData.impact.stats.map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-[30px] bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-4xl md:text-6xl font-black text-orange-400 mb-2">{stat.value}</div>
                <div className="text-lg font-bold mb-1">{stat.label}</div>
                <div className="text-sm text-blue-200 opacity-80">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RÉALISATIONS CLÉS - STYLE CAMTEL NEWS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-blue-900 mb-12 tracking-tight italic uppercase">Réalisations Clés</h2>
          
          {/* Grid ajustée pour 4 éléments : 1 col mobile / 2 col tablette / 4 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsData.impact.realisations.map((item, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-slate-100">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                    {item.tag}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold mb-3 uppercase tracking-tighter">
                    {item.icon} {item.date}
                  </div>
                  <h3 className="text-lg font-black text-blue-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1 font-medium">
                    {item.desc}
                  </p>
                  <button className="flex items-center gap-2 text-blue-600 font-bold text-xs group/btn mt-auto">
                    Détails <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION 2030 - STYLE ABOUT US CAMTEL */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-8 italic uppercase tracking-tighter">
                Vision pour 2030
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
                {cmsData.vision2030.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cmsData.vision2030.points.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-50 text-blue-900 font-bold text-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-400" /> {p}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visuel Inspiré de l'image 00:40:29 */}
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" alt="Vision" className="w-full aspect-[4/3] object-cover" />
              </div>
              {/* Badge flottant type Camtel */}
              <div className="absolute -bottom-10 -left-10 z-20 bg-blue-600 text-white p-8 rounded-[30px] shadow-2xl hidden md:block">
                <div className="text-5xl font-black mb-1">10+</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Régions du Cameroun</div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION COMMENTAIRES DYNAMIQUE */}
      <section id="avis" className="py-24 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-6 italic uppercase tracking-tighter">
                Vos Retours
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                "Impact direct mesuré à travers la voix de notre communauté."
              </p>
            </div>
            <Quote size={80} className="text-blue-100 hidden md:block" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => (
                <div key={n} className="h-64 bg-slate-200 animate-pulse rounded-[40px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dbComments.length > 0 ? dbComments.map((comment, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={comment.id} 
                  className="bg-white p-10 rounded-[40px] shadow-xl shadow-slate-200/50 border border-white flex flex-col h-full hover:border-blue-100 transition-all"
                >
                  <div className="flex items-center gap-4 mb-8">
                    {/* Initiale de l'email comme avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {comment.email ? comment.email[0].toUpperCase() : 'U'}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-blue-900 text-sm truncate w-full">{comment.email}</h4>
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                        {new Date(comment.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-lg leading-relaxed italic flex-1">
                    "{comment.text}"
                  </p>
                  
                  <div className="mt-8 flex gap-1 items-center">
                    <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
                    <div className="h-1 w-1 bg-orange-400 rounded-full"></div>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-400 font-medium italic">Aucun témoignage disponible pour le moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {/* SECTION FORMULAIRE D'AVIS */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-slate-50 rounded-[45px] p-8 md:p-12 border border-slate-100 shadow-sm">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-black text-blue-900 uppercase italic mb-4">Laissez votre avis</h3>
              <p className="text-slate-500 font-medium">Votre retour nous aide à améliorer l'impact de la DPJIC.</p>
            </div>

            <form onSubmit={handleAddComment} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-blue-900 mb-2 ml-4">
                  Votre Email
                </label>
                <input 
                  type="email"
                  required
                  placeholder="exemple@domaine.cm"
                  className="w-full px-6 py-4 rounded-2xl border-none bg-white shadow-inner text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={newComment.email}
                  onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-blue-900 mb-2 ml-4">
                  Votre Message
                </label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Partagez votre expérience avec nous..."
                  className="w-full px-6 py-4 rounded-3xl border-none bg-white shadow-inner text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                  value={newComment.text}
                  onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg ${
                  isSubmitting 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Publier mon avis'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER COMPLET - DPJIC */}
      <footer id="contact" className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            
            {/* Colonne 1: À Propos & Logo */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo DPJIC" className="w-10 h-10 object-contain rounded-xl shadow-md" />
                <div className="leading-none">
                  <span className="block font-black text-2xl tracking-tighter uppercase italic">DPJIC</span>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Jeunes Innovateurs</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Dynamique Pacifique des Jeunes Innovateurs Camerounais - Transformant la jeunesse par l'innovation et l'autonomisation durable.
              </p>
              <div className="flex gap-4 pt-4">
                {/* Réseaux Sociaux */}
                {[
                  { icon: <Share2 size={18} />, link: "#", color: "hover:bg-blue-600" },
                  { icon: <LinkIcon size={18} />, link: "#", color: "hover:bg-pink-600" },
                  { icon: <Hash size={18} />, link: "#", color: "hover:bg-sky-500" },
                  { 
                    icon: <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>, 
                    link: "#", 
                    color: "hover:bg-slate-800" 
                  } // Icône TikTok simplifiée
                ].map((social, i) => (
                  <a key={i} href={social.link} className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all ${social.color} border border-white/10`}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Colonne 2: Liens Rapides */}
            <div>
              <h4 className="text-lg font-black uppercase italic mb-8 border-b border-blue-600 pb-2 inline-block">Liens Rapides</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                {["Notre Mission", "Nos Objectifs", "Notre Impact", "Rejoindre"].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                      <ChevronRight size={14} className="text-blue-600" /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3: Ressources */}
            <div>
              <h4 className="text-lg font-black uppercase italic mb-8 border-b border-blue-600 pb-2 inline-block">Ressources</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                {["Blog", "Événements", "Formations", "Partenaires"].map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                      <ChevronRight size={14} className="text-blue-600" /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 4: Contact Infos */}
            <div>
              <h4 className="text-lg font-black uppercase italic mb-8 border-b border-blue-600 pb-2 inline-block">Contact</h4>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase text-slate-500 mb-1">Localisation</span>
                    <span className="text-sm font-bold text-slate-200">Yaoundé, Cameroun</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase text-slate-500 mb-1">Appelez-nous</span>
                    <a href="tel:+237675936892" className="text-sm font-bold text-slate-200 hover:text-blue-400">+237 675 936 892</a>
                  </div>
                </li>
                <li className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase text-slate-500 mb-1">Email</span>
                    <a href="mailto:dpjicameroun18@yahoo.com" className="text-sm font-bold text-slate-200 hover:text-blue-400 break-all">dpjicameroun18@yahoo.com</a>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-center md:text-left">
              © 2026 DPJIC • Innover pour transformer le 237
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            </div>
          </div>
        </div>
      </footer>

      {/* SIDEBAR MOBILE */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-6 flex flex-col"
          >
            <div className="flex justify-end mb-10">
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-blue-900">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 text-2xl font-black text-blue-900 uppercase italic">
              {["Accueil", "Mission", "Objectifs", "Impact", "Avis", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item === 'Avis' ? 'temoignages' : item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
            
            <div className="mt-auto border-t pt-10">
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
               <a 
                href="https://wa.me/237675936892?text=Bonjour%20DPJIC,%20je%20souhaite%20faire%20un%20don%20pour%20soutenir%20vos%20actions%20envers%20les%20jeunes%20et%20les%20personnes%20vulnérables."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-bold items-center gap-2 hover:bg-blue-700 transition-all shadow-md"
              >
                <MessageCircle size={16} /> Faire un don
              </a>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;