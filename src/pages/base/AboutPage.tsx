import { Rocket, Target, Users, Shield } from "lucide-react";
export function AboutPage() {
  const values = [{
    icon: <Rocket className="h-8 w-8 text-blue-600" />,
    title: "Innovation",
    description: "Repousser les limites de l'IA pour créer un impact positif"
  }, {
    icon: <Target className="h-8 w-8 text-blue-600" />,
    title: "Excellence",
    description: "Fournir des solutions d'IA de haute qualité et performantes"
  }, {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Communauté",
    description: "Favoriser la collaboration et le partage des connaissances"
  }, {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Confiance",
    description: "Garantir la sécurité et la confidentialité des données"
  }];
  return <div className="min-h-screen bg-white">
    {/* Hero Section */}
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Notre Mission
          </h1>
          <p className="text-xl text-gray-600">
            Démocratiser l'accès à l'intelligence artificielle en Tunisie et
            créer un écosystème d'innovation technologique florissant.
          </p>
        </div>
      </div>
    </div>
    {/* Values Section */}
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => <div key={index} className="text-center">
            <div className="flex justify-center mb-4">{value.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>)}
        </div>
      </div>
    </div>
    {/* Story Section */}
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Notre Histoire
          </h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              AI+ est née de la vision de créer une plateforme qui rassemble
              les meilleurs talents en IA de Tunisie. Notre objectif est de
              faciliter l'accès aux technologies d'IA et de promouvoir
              l'innovation locale.
            </p>
            <p className="mb-4">
              Depuis notre création, nous avons collaboré avec des chercheurs,
              des développeurs et des entreprises pour construire un
              écosystème d'IA robuste et dynamique.
            </p>
            <p>
              Aujourd'hui, nous sommes fiers de soutenir la prochaine
              génération d'innovateurs en IA et de contribuer au développement
              technologique de la Tunisie.
            </p>
          </div>
        </div>
      </div>
    </div>



  </div>;
}