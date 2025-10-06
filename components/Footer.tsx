import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-dark-light">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">Vigilante Shield</h3>
            <p className="text-gray-400 text-sm">
              Privacy-first security platform for journalists, activists, and high-risk individuals.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <div className="flex flex-col gap-2">
              <Link href="/link-analyzer" className="text-gray-400 hover:text-white text-sm transition-colors">
                Link Analyzer
              </Link>
              <Link href="/guides" className="text-gray-400 hover:text-white text-sm transition-colors">
                Security Guides
              </Link>
              <Link href="/threats" className="text-gray-400 hover:text-white text-sm transition-colors">
                Threat Intelligence
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <div className="flex flex-col gap-2">
              <Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
                FAQ
              </Link>
              <a 
                href="https://www.eff.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                EFF
              </a>
              <a 
                href="https://www.accessnow.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Access Now
              </a>
              <a 
                href="https://citizenlab.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Citizen Lab
              </a>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="text-white font-semibold mb-4">Privacy</h3>
            <p className="text-gray-400 text-sm mb-2">
              We collect zero personal data.
            </p>
            <p className="text-gray-400 text-sm">
              All analysis is anonymized and no activity logs are kept.
            </p>
          </div>
        </div>

        <div className="border-t border-dark-light pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Vigilante Shield. Privacy-first security platform.
            </p>
            <p className="text-gray-400 text-sm">
              Built with <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">Cosmic</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}