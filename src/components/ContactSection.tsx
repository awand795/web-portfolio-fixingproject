import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Github, Linkedin, Facebook, Instagram } from '../icons/SocialIcons';

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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const SocialButton = memo(({ href, label, icon: Icon, darkTheme }: SocialButtonProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ y: -6, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    className={`
      flex items-center justify-center w-14 h-14 rounded-full
      border transition-all duration-300
      ${darkTheme
        ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-400 hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]'
        : 'bg-black/5 border-black/10 text-slate-500 hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-600'
      }
    `}
  >
    <Icon size={22} />
  </motion.a>
));

const ContactSection = ({ darkTheme }: ContactSectionProps) => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp} className="mb-12">
          <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${darkTheme ? 'text-violet-400' : 'text-violet-600'}`}>
            Contact
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-gradient mb-4">
            {t('contact.title')}
          </h2>
          <p className={`text-lg ${darkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('contact.cta')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <motion.a
            href="mailto:awand795@gmail.com"
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group col-span-full sm:col-span-1 ${darkTheme ? 'bg-white/[0.03] border-white/[0.07] hover:bg-violet-500/10 hover:border-violet-500/30' : 'bg-white border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-md'}`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-primary">
              <Mail size={20} className="text-white" />
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>Email</p>
              <p className={`font-semibold text-sm ${darkTheme ? 'text-slate-200 group-hover:text-violet-300' : 'text-slate-800 group-hover:text-violet-700'} transition-colors`}>
                awand795@gmail.com
              </p>
            </div>
          </motion.a>

          <motion.a
            href="tel:+6282362851796"
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group ${darkTheme ? 'bg-white/[0.03] border-white/[0.07] hover:bg-cyan-500/10 hover:border-cyan-500/30' : 'bg-white border-slate-200 hover:border-cyan-300 shadow-sm hover:shadow-md'}`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-accent">
              <Phone size={20} className="text-white" />
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>Phone</p>
              <p className={`font-semibold text-sm ${darkTheme ? 'text-slate-200' : 'text-slate-800'}`}>
                +62 823-6285-1796
              </p>
            </div>
          </motion.a>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${darkTheme ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-white border-slate-200 shadow-sm'}`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-secondary">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>Location</p>
              <p className={`font-semibold text-sm ${darkTheme ? 'text-slate-200' : 'text-slate-800'}`}>
                {t('contact.location')}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
          {socials.map((s) => (
            <SocialButton key={s.label} {...s} darkTheme={darkTheme} />
          ))}
        </motion.div>
      </motion.div>

      <footer className={`py-8 border-t mt-20 ${darkTheme ? 'border-white/[0.06]' : 'border-slate-200'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${darkTheme ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-800'}`}
          >
            <ArrowUp size={16} />
            {t('footer.backToTop')}
          </button>
          <p className={`text-sm ${darkTheme ? 'text-slate-600' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} Awanda. {t('footer.builtWith')}
          </p>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
