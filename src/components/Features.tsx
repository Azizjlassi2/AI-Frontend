import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Zap, Users, Code, TrendingUp, Globe, Award } from 'lucide-react';
export const Features = () => {
  const features = [{
    icon: <Rocket className="h-8 w-8" />,
    title: 'Déploiement instantané',
    description: 'Déployez vos modèles en production en quelques clics avec notre infrastructure optimisée',
    color: 'from-blue-500 to-cyan-500'
  }, {
    icon: <Shield className="h-8 w-8" />,
    title: 'Sécurité garantie',
    description: 'Vos données et modèles sont protégés par les meilleurs standards de sécurité',
    color: 'from-green-500 to-emerald-500'
  }, {
    icon: <Zap className="h-8 w-8" />,
    title: 'Performance optimale',
    description: 'Infrastructure haute performance pour des temps de réponse ultra-rapides',
    color: 'from-yellow-500 to-orange-500'
  }, {
    icon: <Users className="h-8 w-8" />,
    title: 'Communauté active',
    description: 'Rejoignez une communauté de développeurs et chercheurs passionnés',
    color: 'from-purple-500 to-pink-500'
  }, {
    icon: <Code className="h-8 w-8" />,
    title: 'API simple',
    description: 'Documentation complète et API intuitive pour une intégration facile',
    color: 'from-indigo-500 to-blue-500'
  }, {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Monétisation',
    description: 'Créez des revenus en partageant vos modèles avec la communauté',
    color: 'from-red-500 to-rose-500'
  }, {
    icon: <Globe className="h-8 w-8" />,
    title: 'Focus local',
    description: 'Modèles et datasets adaptés au contexte tunisien et arabe',
    color: 'from-teal-500 to-cyan-500'
  }, {
    icon: <Award className="h-8 w-8" />,
    title: 'Qualité certifiée',
    description: 'Tous les modèles sont vérifiés et testés par notre équipe',
    color: 'from-amber-500 to-yellow-500'
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return <section className="py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Pourquoi choisir AI+ ?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Une plateforme complète pour développer, déployer et monétiser vos
          solutions d'intelligence artificielle
        </p>
      </motion.div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => <motion.div key={index} variants={itemVariants} whileHover={{
          y: -8,
          transition: {
            duration: 0.2
          }
        }} className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </motion.div>)}
      </motion.div>
    </div>
  </section>;
};