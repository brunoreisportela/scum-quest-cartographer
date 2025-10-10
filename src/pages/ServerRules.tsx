import { ArrowLeft, Shield, Users, Car, Building, HelpCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '@/components/LanguageToggle';

const ServerRules = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const penaltyMatrix = [
    {
      type: 'Minor',
      example: 'chat flood, loud VoIP',
      action: 'warning or 24 h ban',
      color: 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300'
    },
    {
      type: 'Major',
      example: 'vehicle theft attempt, door raid, racist slur, exploit abuse, combat logging',
      action: '7 d ban or longer',
      color: 'bg-orange-500/20 border-orange-400/50 text-orange-300'
    },
    {
      type: 'Critical',
      example: 'duping ring, repeated exploits after ban, staff impersonation, severe harassment',
      action: 'immediate permaban',
      color: 'bg-red-500/20 border-red-400/50 text-red-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-slate-400 hover:text-slate-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('serverRules.backToQuests')}
              </Button>
              <div className="text-xl sm:text-2xl font-bold text-slate-200">{t('serverRules.title')}</div>
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-slate-400 font-medium">
              {t('serverRules.tagline')}
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-3 sm:p-4 lg:p-6">
        {/* Server Info Header */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-400/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-slate-200 mb-2">
              {t('serverRules.serverName')}
            </CardTitle>
            <p className="text-emerald-300 font-mono text-lg">70.55.144.65:7779</p>
            <Badge className="mx-auto mt-2 bg-emerald-500/20 text-emerald-300 border-emerald-400">
              {t('serverRules.ruleset')}
            </Badge>
            <p className="text-slate-400 text-sm mt-4">
              {t('serverRules.lastUpdated')}
            </p>
          </CardHeader>
        </Card>

        {/* Core Principles */}
        <Card className="mb-6 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-slate-200">
              <Shield className="h-6 w-6 text-emerald-400" />
              {t('serverRules.corePrinciples')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-300 font-medium text-center text-lg">
                "{t('serverRules.coreQuote')}"
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-400/20">
                <p className="text-emerald-300 font-semibold">{t('serverRules.playFair')}</p>
                <p className="text-slate-400 text-sm">{t('serverRules.playFairDesc')}</p>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                <p className="text-blue-300 font-semibold">{t('serverRules.respectOthers')}</p>
                <p className="text-slate-400 text-sm">{t('serverRules.respectOthersDesc')}</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4">
              <p className="text-red-300 text-center">
                <strong>{t('serverRules.important')}</strong> {t('serverRules.importantNote')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rules Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conduct and Chat */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-slate-200">
                <Users className="h-5 w-5 text-blue-400" />
                {t('serverRules.conductAndChat')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-slate-300 text-sm"><span className="font-semibold text-blue-300">1.1</span> {t('serverRules.rule1_1')}</p>
                <p className="text-slate-300 text-sm"><span className="font-semibold text-blue-300">1.2</span> {t('serverRules.rule1_2')}</p>
                <p className="text-slate-300 text-sm"><span className="font-semibold text-blue-300">1.3</span> {t('serverRules.rule1_3')}</p>
                <p className="text-slate-300 text-sm"><span className="font-semibold text-blue-300">1.4</span> {t('serverRules.rule1_4')}</p>
              </div>
              <Separator className="bg-slate-600/50" />
              <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-slate-200 font-semibold text-sm mb-2">{t('serverRules.strikeLadder')}</p>
                <div className="space-y-1 text-xs">
                  <p className="text-slate-300">• {t('serverRules.firstHit')}</p>
                  <p className="text-slate-300">• {t('serverRules.secondHit')}</p>
                  <p className="text-slate-300">• {t('serverRules.thirdHit')}</p>
                  <p className="text-slate-300">• {t('serverRules.fourthHit')}</p>
                  <p className="text-red-300">• {t('serverRules.extremeOffense')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PvE Gameplay */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-slate-200">
                <Shield className="h-5 w-5 text-emerald-400" />
                {t('serverRules.pveGameplay')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.1</span> {t('serverRules.rule2_1')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.2</span> {t('serverRules.rule2_2')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.3</span> {t('serverRules.rule2_3')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.4</span> {t('serverRules.rule2_4')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.5</span> {t('serverRules.rule2_5')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.6</span> {t('serverRules.rule2_6')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.7</span> {t('serverRules.rule2_7')}</p>
            </CardContent>
          </Card>

          {/* Vehicles */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-slate-200">
                <Car className="h-5 w-5 text-purple-400" />
                {t('serverRules.vehicles')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.1</span> {t('serverRules.rule3_1')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.2</span> {t('serverRules.rule3_2')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.3</span> {t('serverRules.rule3_3')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.4</span> {t('serverRules.rule3_4')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.5</span> {t('serverRules.rule3_5')}</p>
            </CardContent>
          </Card>

          {/* Building */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-slate-200">
                <Building className="h-5 w-5 text-orange-400" />
                {t('serverRules.building')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-300 text-sm"><span className="font-semibold text-orange-300">4.1</span> {t('serverRules.rule4_1')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-orange-300">4.2</span> {t('serverRules.rule4_2')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-orange-300">4.3</span> {t('serverRules.rule4_3')}</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-orange-300">4.4</span> {t('serverRules.rule4_4')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Support */}
        <Card className="mb-8 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-slate-200">
              <HelpCircle className="h-6 w-6 text-cyan-400" />
              {t('serverRules.support')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-slate-300"><span className="font-semibold text-cyan-300">5.1</span> {t('serverRules.rule5_1')}</p>
            <p className="text-slate-300"><span className="font-semibold text-cyan-300">5.2</span> {t('serverRules.rule5_2')}</p>
            <p className="text-slate-300"><span className="font-semibold text-cyan-300">5.3</span> {t('serverRules.rule5_3')}</p>
          </CardContent>
        </Card>

        {/* Penalty Matrix */}
        <Card className="mb-8 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-slate-200">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              {t('serverRules.penaltyMatrix')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="space-y-4">
                {penaltyMatrix.map((penalty, index) => (
                  <Card key={index} className={`border-2 ${penalty.color}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <Badge className={`w-fit ${penalty.color} font-semibold`}>
                          {t(`serverRules.${penalty.type.toLowerCase()}`)}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-slate-300 text-sm mb-1">
                            <strong>{t('serverRules.examples')}</strong> {penalty.example}
                          </p>
                          <p className="text-slate-200 text-sm">
                            <strong>{t('serverRules.action')}</strong> {penalty.action}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
              <p className="text-slate-300 text-sm text-center">
                <strong>{t('serverRules.note')}</strong> {t('serverRules.penaltyNote')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Closing Message */}
        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-400/20 backdrop-blur-sm text-center">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-200 mb-4">
              {t('serverRules.welcomeTitle')}
            </h3>
            <p className="text-slate-300 mb-4">
              {t('serverRules.welcomeMessage')}
            </p>
            <Button
              onClick={() => window.open('https://discord.gg/7xY9s6HH7J', '_blank')}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400 text-emerald-300"
              variant="outline"
            >
              {t('serverRules.joinDiscord')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServerRules;
