import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Github, Linkedin, Facebook, Instagram } from '../icons/SocialIcons';
import { Magnetic } from './Effects';

interface ContactSectionProps {
  darkTheme: boolean;
}

interface Social {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface SocialButtonProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  darkTheme: boolean;
}

const socials: Social[] = [
  { href: 'https://github.com/awand795', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/in/awanda', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://facebook.com/awandd6', label: 'Facebook', icon: Facebook },
  { href: 'https://instagram.com/adnawaa', label: 'Instagram', icon: Instagram },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const SocialButton = memo(({ href, label, icon: Icon, darkTheme }: SocialButtonProps) => (
  <Magnetic>
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-mono tracking-wider uppercase transition-all duration-300
        ${darkTheme
          ? 'bg-[#0f1013]/60 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800 hover:shadow-lg'
          : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 hover:shadow-sm'
        }
      `}
    >
      <Icon size={14} />
      {label}
    </motion.a>
  </Magnetic>
));

const ContactSection = ({ darkTheme }: ContactSectionProps) => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full grid lg:grid-cols-2 gap-12 items-start"
      >
        {/* Left Column: CTA & Socials */}
        <motion.div variants={fadeUp}>
          <p className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-3 ${darkTheme ? 'text-indigo-400' : 'text-indigo-600'}`}>
            // CONNECT WITH ME
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-gradient mb-6">
            {t('contact.title')}
          </h2>
          <p className={`text-base leading-relaxed mb-8 max-w-md ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {t('contact.cta')}
          </p>
          
          <div className="flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <SocialButton key={s.label} {...s} darkTheme={darkTheme} />
            ))}
          </div>
        </motion.div>

        {/* Right Column: Contact Details Cards */}
        <motion.div 
          variants={fadeUp}
          className={`rounded-3xl border p-6 flex flex-col gap-4
            ${darkTheme ? 'bg-[#0f1013]/25 border-neutral-900' : 'bg-neutral-50/50 border-neutral-200/80'}`}
        >
          {/* Email */}
          <motion.a
            href="mailto:awand795@gmail.com"
            whileHover={{ x: 4 }}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group
              ${darkTheme ? 'bg-[#0f1013]/30 border-neutral-900 hover:border-neutral-800' : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'}`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-primary">
              <Mail size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">EMAIL ADDRESS</p>
              <p className={`text-sm font-semibold transition-colors group-hover:text-indigo-400 ${darkTheme ? 'text-neutral-200' : 'text-neutral-850'}`}>
                awand795@gmail.com
              </p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+6282362851796"
            whileHover={{ x: 4 }}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group
              ${darkTheme ? 'bg-[#0f1013]/30 border-neutral-900 hover:border-neutral-800' : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'}`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-accent">
              <Phone size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">PHONE NUMBER</p>
              <p className={`text-sm font-semibold transition-colors group-hover:text-emerald-400 ${darkTheme ? 'text-neutral-200' : 'text-neutral-850'}`}>
                +62 823-6285-1796
              </p>
            </div>
          </motion.a>

          {/* Location */}
          <div
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
              ${darkTheme ? 'bg-[#0f1013]/30 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'}`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-secondary">
              <MapPin size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">LOCATION</p>
              <p className={`text-sm font-semibold ${darkTheme ? 'text-neutral-250' : 'text-neutral-800'}`}>
                {t('contact.location')}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className={`py-8 border-t mt-20 ${darkTheme ? 'border-neutral-900' : 'border-neutral-200'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-colors 
              ${darkTheme ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-650 hover:text-indigo-805'}`}
          >
            <ArrowUp size={14} />
            {t('footer.backToTop')}
          </button>
          <p className={`text-xs font-mono tracking-wide ${darkTheme ? 'text-neutral-600' : 'text-neutral-450'}`}>
            © {new Date().getFullYear()} Awanda. {t('footer.builtWith')}
          </p>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
