import { useState } from 'react'
import {
    Zap,
    Search,
    MessageCircle,
    CheckCircle2,
    ArrowRight,
    User,
    ShieldCheck,
    LayoutDashboard,
    Send,
    X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Mock Data ---

const VEHICLES = [
    {
        id: 1,
        name: "CyberTruck Raptor Elite",
        type: "Pickup",
        price: "R$ 450.000",
        match: 99,
        image: "/modern_pickup_truck_1767738458758.png",
        verified: true
    },
    {
        id: 2,
        name: "Apex Jetstream Pro",
        type: "Jetski",
        price: "R$ 125.000",
        match: 97,
        image: "/premium_jetski_1767738483841.png",
        verified: true
    },
    {
        id: 3,
        name: "Nebula S-Zero Electra",
        type: "Esportivo",
        price: "R$ 890.000",
        match: 95,
        image: "/luxury_sports_car_1767738498019.png",
        verified: true
    }
]

const LEADS = [
    { name: "Carlos Silva", status: "Pronto para fechar", compatibility: "98%" },
    { name: "Mariana Costa", status: "Agendou visita", compatibility: "95%" },
    { name: "Rafael Mendes", status: "Fez proposta", compatibility: "92%" }
]

// --- Components ---

function Header({ onToggleDashboard, showDashboard }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-neon rounded-xl flex items-center justify-center neon-glow">
                    <Zap className="text-brand-dark fill-brand-dark" size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tighter">AutoMatch <span className="text-brand-neon">AI</span></span>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-3 glass-card px-4 py-2 border-brand-neon/20">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-neon/30">
                        <img src="/influencer_avatar_curator_v2_1767738513154.png" alt="Influencer" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs">
                        <p className="font-semibold text-brand-neon">Curadoria Oficial</p>
                        <p className="text-gray-400">Victor Match</p>
                    </div>
                </div>

                <button
                    onClick={onToggleDashboard}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange text-white font-bold hover:scale-105 transition-transform orange-glow"
                >
                    {showDashboard ? <Search size={20} /> : <LayoutDashboard size={20} />}
                    {showDashboard ? "Voltar para Busca" : "Visão do Vendedor"}
                </button>
            </div>
        </header>
    )
}

function Hero() {
    const [search, setSearch] = useState('')

    return (
        <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
            >
                Não procure. A nossa IA encontra o <br />
                <span className="text-brand-neon">veículo perfeito</span> para si.
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl mx-auto relative"
            >
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-neon">
                    <Zap size={24} />
                </div>
                <input
                    type="text"
                    placeholder="Descreva o que procura (ex: Jetski para 3 pessoas até 150 mil reais)..."
                    className="w-full bg-brand-grey/50 border-2 border-brand-neon/30 rounded-3xl py-6 pl-16 pr-8 text-xl focus:outline-none focus:border-brand-neon glass-card neon-glow transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <button className="bg-brand-neon text-brand-dark px-6 py-2 rounded-2xl font-bold hover:opacity-90">
                        Analisar
                    </button>
                </div>
            </motion.div>
        </section>
    )
}

function VehicleCard({ vehicle }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-video relative overflow-hidden">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                {/* Holographic Seal */}
                <div className="absolute top-4 left-4 holographic-seal text-[10px] font-black px-2 py-1 rounded-sm text-brand-dark uppercase">
                    Segurança Verificada por IA
                </div>

                {/* Match Score */}
                <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-md border border-brand-neon/50 px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap size={12} className="text-brand-neon" />
                    <span className="text-brand-neon font-bold text-sm">{vehicle.match}% Match</span>
                </div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-4 left-4 right-4 bg-brand-neon text-brand-dark text-xs font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2"
                        >
                            <ShieldCheck size={14} />
                            Documentação Validada em 2 segs
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{vehicle.name}</h3>
                    <span className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded uppercase tracking-widest">{vehicle.type}</span>
                </div>
                <p className="text-2xl font-bold text-brand-neon mb-4">{vehicle.price}</p>

                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 font-semibold">
                    Ver Detalhes <ArrowRight size={18} />
                </button>
            </div>
        </motion.div>
    )
}

function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-80 glass-card border-brand-neon/30 overflow-hidden shadow-2xl"
                    >
                        <div className="bg-brand-neon p-4 text-brand-dark flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                    <Zap size={24} className="m-auto mt-1" />
                                </div>
                                <div>
                                    <p className="font-bold leading-tight">Agente AutoMatch AI</p>
                                    <p className="text-[10px] uppercase font-bold opacity-70">Online agora</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                        </div>

                        <div className="p-4 h-64 overflow-y-auto space-y-4 bg-brand-dark/95">
                            <div className="bg-brand-grey p-3 rounded-2xl rounded-tl-none text-sm text-gray-200">
                                Olá! Vi que parou no <span className="text-brand-neon font-bold">Apex Jetstream Pro</span>. Quer que eu lhe envie o vídeo do motor a funcionar? 🚤
                            </div>
                        </div>

                        <div className="p-4 bg-brand-grey border-t border-white/5 space-y-2">
                            <button className="w-full text-left p-2 rounded-lg bg-brand-dark hover:bg-brand-neon/20 hover:text-brand-neon text-xs font-semibold transition-colors border border-white/5">
                                Sim, enviar vídeo
                            </button>
                            <button className="w-full text-left p-2 rounded-lg bg-brand-dark hover:bg-brand-neon/20 hover:text-brand-neon text-xs font-semibold transition-colors border border-white/5">
                                Agendar visita
                            </button>
                            <button className="w-full text-left p-2 rounded-lg bg-brand-dark hover:bg-brand-neon/20 hover:text-brand-neon text-xs font-semibold transition-colors border border-white/5">
                                Fazer proposta
                            </button>
                            <div className="flex gap-2 pt-2">
                                <input type="text" placeholder="Digite..." className="flex-1 bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none" />
                                <button className="bg-brand-neon text-brand-dark p-2 rounded-lg"><Send size={16} /></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform neon-glow"
            >
                <MessageCircle size={32} />
            </button>
        </div>
    )
}

function SellerDashboard() {
    return (
        <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="pt-40 px-6 max-w-6xl mx-auto"
        >
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-bold tracking-tight">Painel do <span className="text-brand-orange">Vendedor</span></h2>
                <div className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-xl text-sm font-bold border border-brand-orange/20">
                    3 Compradores Qualificados à espera
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <CheckCircle2 className="text-brand-neon" /> Compradores Mock Qualificados
                    </h3>
                    <div className="space-y-4">
                        {LEADS.map((lead, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                        <User size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold">{lead.name}</p>
                                        <p className="text-xs text-brand-neon">{lead.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Match</p>
                                    <p className="font-black text-brand-neon">{lead.compatibility}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center neon-glow border border-brand-orange/30">
                        <Zap size={40} className="text-brand-orange" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Acelere com IA</h3>
                        <p className="text-gray-400 max-w-xs">Temos Compradores Qualificados para o seu modelo atual.</p>
                    </div>
                    <button className="w-full py-4 bg-brand-orange rounded-2xl font-black text-lg hover:scale-105 transition-transform orange-glow">
                        ANUNCIAR MEU VEÍCULO AGORA
                    </button>
                </div>
            </div>
        </motion.section>
    )
}

function App() {
    const [showDashboard, setShowDashboard] = useState(false)

    return (
        <div className="min-h-screen text-white pb-20 overflow-x-hidden">
            {/* Background decoration */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

            <Header
                showDashboard={showDashboard}
                onToggleDashboard={() => setShowDashboard(!showDashboard)}
            />

            <main>
                {!showDashboard ? (
                    <>
                        <Hero />
                        <section className="px-6 max-w-6xl mx-auto mb-20">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-bold">Principais Matchs para si</h2>
                                <div className="text-brand-neon text-sm font-bold flex items-center gap-2">
                                    IA atualizada em tempo real <div className="w-2 h-2 bg-brand-neon rounded-full animate-pulse" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {VEHICLES.map(vehicle => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                ))}
                            </div>
                        </section>
                    </>
                ) : (
                    <SellerDashboard />
                )}
            </main>

            <WhatsAppWidget />
        </div>
    )
}

export default App
