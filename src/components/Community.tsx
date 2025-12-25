import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, BookOpen, Award, ArrowRight } from 'lucide-react';
export const Community = () => {
  const stats = [{
    icon: <Users className="h-8 w-8" />,
    value: '10,000+',
    label: 'Membres actifs'
  }, {
    icon: <MessageCircle className="h-8 w-8" />,
    value: '50,000+',
    label: 'Messages échangés'
  }, {
    icon: <BookOpen className="h-8 w-8" />,
    value: '500+',
    label: 'Projets partagés'
  }, {
    icon: <Award className="h-8 w-8" />,
    value: '100+',
    label: 'Événements organisés'
  }];
  return <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
    {/* Background decorations */}
    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Rejoignez notre communauté
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          Connectez-vous avec des développeurs, chercheurs et passionnés d'IA
          en Tunisie
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1,
          duration: 0.5
        }} className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
            {stat.icon}
          </div>
          <div className="text-3xl md:text-4xl font-bold mb-2">
            {stat.value}
          </div>
          <div className="text-blue-100">{stat.label}</div>
        </motion.div>)}
      </div>

      <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.4,
        duration: 0.6
      }} className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à commencer votre aventure IA ?
          </h3>
          <p className="text-lg text-blue-100 mb-8">
            Créez votre compte gratuitement et accédez à tous nos modèles et
            datasets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
              Créer un compte gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/about" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 inline-flex items-center justify-center">
              En savoir plus
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>;
};