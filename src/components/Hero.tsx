import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code, Database, Zap } from 'lucide-react';
export const Hero = () => {
  return <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
    {/* Animated background grid */}
    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
    {/* Animated gradient orbs */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{
      animationDelay: '1s'
    }} />
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center">
          {/* Badge */}
          <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.2
          }} className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">
              Plateforme IA 100% tunisienne
            </span>
          </motion.div>
          {/* Main heading */}
          <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3,
            duration: 0.8
          }} className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            L'intelligence artificielle
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              à portée de main
            </span>
          </motion.h1>
          {/* Subtitle */}
          <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4,
            duration: 0.8
          }} className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Partagez, déployez et monétisez vos modèles d'IA. Rejoignez la
            communauté des développeurs et chercheurs tunisiens en IA.
          </motion.p>
          {/* CTA Buttons */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5,
            duration: 0.8
          }} className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/login" className="group px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105">
              Commencer gratuitement
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/models" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center justify-center">
              Explorer les modèles
            </Link>
          </motion.div>
          {/* Stats */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6,
            duration: 0.8
          }} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
              <div className="text-sm text-blue-200">Modèles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">10K+</div>
              <div className="text-sm text-blue-200">Utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">250+</div>
              <div className="text-sm text-blue-200">Datasets</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Floating cards */}
      <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8,
        duration: 1
      }} className="mt-20 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{
            y: -5
          }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">API Puissante</h3>
            <p className="text-blue-100 text-sm">
              Intégrez facilement nos modèles dans vos applications
            </p>
          </motion.div>
          <motion.div whileHover={{
            y: -5
          }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Datasets Locaux</h3>
            <p className="text-blue-100 text-sm">
              Accédez à des datasets tunisiens et arabes de qualité
            </p>
          </motion.div>
          <motion.div whileHover={{
            y: -5
          }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="h-12 w-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Déploiement Rapide</h3>
            <p className="text-blue-100 text-sm">
              Déployez vos modèles en production en quelques minutes
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
    {/* Bottom wave */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
      </svg>
    </div>
  </section>;
};