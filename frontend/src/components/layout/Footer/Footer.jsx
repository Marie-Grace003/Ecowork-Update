export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-bold text-gray-800">EcoWork</p>
            <p className="text-gray-400 text-xs">GreenSpace Paris 11ème — Plateforme éco-responsable</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-[#32b1c2] text-sm transition-all">
              Confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-[#32b1c2] text-sm transition-all">
              Conditions
            </a>
            <a href="#" className="text-gray-400 hover:text-[#32b1c2] text-sm transition-all">
              Contact
            </a>
          </div>
          <p className="text-gray-300 text-xs text-center md:text-right">
            © 2026 EcoWork · Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  )
}