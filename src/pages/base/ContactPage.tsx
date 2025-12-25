import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



/**
 * 
export function ContactPage() {


  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/contact/us`, {
        username,
        email,
        subject,
        message
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        setSuccess("Message Envoyé avec success !")
        setLoading(false)
        setSubject('')
        setMessage('')
      }

    }
    catch (err) {
      navigate("/500");
    }
  }

  return <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Contactez-nous
      </h1>
   
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <MailIcon className="h-6 w-6 text-blue-600 mb-3" />
    <h3 className="text-lg font-semibold mb-2">Email</h3>
    <p className="text-gray-600">contact@aiplus.tn</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <PhoneIcon className="h-6 w-6 text-blue-600 mb-3" />
    <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
    <p className="text-gray-600">+216 XX XXX XXX</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <MapPinIcon className="h-6 w-6 text-blue-600 mb-3" />
    <h3 className="text-lg font-semibold mb-2">Adresse</h3>
    <p className="text-gray-600">Tunis, Tunisie</p>
  </div>
</div>
<div className="bg-white rounded-xl shadow-sm p-8">
  {success && (
    <div className="mb-6 p-4 text-green-700 bg-green-100 rounded-lg flex justify-between items-center">
      <span>{success}</span>
      <button
        onClick={() => setSuccess('')}
        className="text-green-700 font-bold hover:underline"
      >
        X
      </button>
    </div>
  )}

  <h2 className="text-2xl font-semibold mb-6">
    Envoyez-nous un message
  </h2>
  <form className="space-y-6" onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom
        </label>
        <input type="text"
          required
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input type="email" id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Sujet
      </label>
      <input type="text" id="subject"
        required
        value={subject}
        onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Message
      </label>
      <textarea rows={6} id="message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
    </div>
    <div className="pt-8 border-t border-gray-200">
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          <MailIcon className="h-5 w-5 mr-2" />
        )}
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </div>
  </form>
</div>
    </div >
  </div >

}

*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/contact/us`, {
        username: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        withCredentials: true,
      });
      if (response.status === 201 || response.status === 200) {
        setIsSubmitted(true)
        setIsSubmitting(false)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }

    }
    catch (err) {
      setIsSubmitted(true)
      setIsSubmitting(false)
      // navigate("/500");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const contactInfo = [{
    icon: <Mail className="h-6 w-6" />,
    title: 'Email',
    value: 'contact@aiplus.tn',
    link: 'mailto:contact@aiplus.tn',
    color: 'from-blue-500 to-cyan-500'
  }, {
    icon: <Phone className="h-6 w-6" />,
    title: 'Téléphone',
    value: '+216 XX XXX XXX',
    link: 'tel:+216XXXXXXXX',
    color: 'from-green-500 to-emerald-500'
  }, {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Adresse',
    value: 'Tunis, Tunisie',
    color: 'from-purple-500 to-pink-500'
  }, {
    icon: <Clock className="h-6 w-6" />,
    title: 'Horaires',
    value: 'Lun - Ven: 9h - 18h',
    color: 'from-orange-500 to-red-500'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    {/* Hero Section */}
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center max-w-3xl mx-auto">
          <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.2,
            type: 'spring'
          }} className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <MessageSquare className="h-8 w-8" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-blue-100">
            Notre équipe est là pour répondre à toutes vos questions
          </p>
        </motion.div>
      </div>
    </div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Contact Info Cards */}
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
      }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {contactInfo.map((info, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1,
          duration: 0.5
        }} whileHover={{
          y: -5
        }} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${info.color} text-white mb-4`}>
            {info.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {info.title}
          </h3>
          {info.link ? <a href={info.link} className="text-gray-600 hover:text-blue-600 transition-colors">
            {info.value}
          </a> : <p className="text-gray-600">{info.value}</p>}
        </motion.div>)}
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Envoyez-nous un message
          </h2>
          {isSubmitted ? <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} className="text-center py-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Message envoyé !
            </h3>
            <p className="text-gray-600">
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </motion.div> : <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Votre nom" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="votre@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sujet
              </label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Sujet de votre message" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Votre message..." />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
              {isSubmitting ? <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                Envoi en cours...
              </> : <>
                Envoyer le message
                <Send className="ml-2 h-5 w-5" />
              </>}
            </button>
          </form>}
        </motion.div>
        {/* Info Section */}
        <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="space-y-8">
          {/* FAQ Quick Links */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Questions fréquentes</h3>
            <p className="text-blue-100 mb-6">
              Trouvez rapidement des réponses à vos questions les plus
              courantes
            </p>
            <div className="space-y-3">
              <a href="/docs" className="block p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all">
                <h4 className="font-semibold mb-1">Documentation</h4>
                <p className="text-sm text-blue-100">
                  Guides complets et ressources
                </p>
              </a>
              <a href="/faq/subscriptions" className="block p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all">
                <h4 className="font-semibold mb-1">Abonnements</h4>
                <p className="text-sm text-blue-100">
                  Tout sur les plans et la facturation
                </p>
              </a>
              <a href="/api" className="block p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all">
                <h4 className="font-semibold mb-1">API</h4>
                <p className="text-sm text-blue-100">
                  Documentation technique de l'API
                </p>
              </a>
            </div>
          </div>
          {/* Support Info */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Support technique
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe de support est disponible pour vous aider avec tous
              vos besoins techniques
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Temps de réponse
                  </h4>
                  <p className="text-sm text-gray-600">
                    Moins de 24h en moyenne
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Support prioritaire
                  </h4>
                  <p className="text-sm text-gray-600">
                    Disponible pour les plans Pro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>;
}
