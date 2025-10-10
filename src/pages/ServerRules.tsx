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
              Sentience AI Server
            </CardTitle>
            <p className="text-emerald-300 font-mono text-lg">70.55.144.65:7779</p>
            <Badge className="mx-auto mt-2 bg-emerald-500/20 text-emerald-300 border-emerald-400">
              Hardcore PvE Ruleset
            </Badge>
            <p className="text-slate-400 text-sm mt-4">
              Last updated: 24 August 2025
            </p>
          </CardHeader>
        </Card>

        {/* Core Principles */}
        <Card className="mb-6 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-slate-200">
              <Shield className="h-6 w-6 text-emerald-400" />
              Core Principles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-300 font-medium text-center text-lg">
                "Environment and AI are the only enemies, not other players."
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-400/20">
                <p className="text-emerald-300 font-semibold">Play Fair</p>
                <p className="text-slate-400 text-sm">Honest gameplay</p>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                <p className="text-blue-300 font-semibold">Respect Others</p>
                <p className="text-slate-400 text-sm">Community first</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4">
              <p className="text-red-300 text-center">
                <strong>Important:</strong> Staff decisions are final, and any violation can jump straight to permaban if severe enough.
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
                Conduct and Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-slate-300 text-sm"><span className="font-semibold text-blue-300">1.1</span> Any language is welcome, but do not flood chat with repeated messages or walls of text.</p>
                <p className="text-slate-300 text-sm"><span className="font-semibold text-blue-300">1.2</span> Political or religious debates, racism, hate speech, harassment, griefing and impersonating staff are forbidden.</p>
                <p className="text-slate-300 text-sm"><span className="font-semibold text-blue-300">1.3</span> Trades between players are allowed and encouraged. Use global chat or Discord trade rooms.</p>
                <p className="text-slate-300 text-sm"><span className="font-semibold text-blue-300">1.4</span> Spam in VoIP (music, screaming) is not allowed.</p>
              </div>
              <Separator className="bg-slate-600/50" />
              <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-slate-200 font-semibold text-sm mb-2">Strike Ladder:</p>
                <div className="space-y-1 text-xs">
                  <p className="text-slate-300">• first hit – warning</p>
                  <p className="text-slate-300">• second hit – 24 h ban</p>
                  <p className="text-slate-300">• third hit – 7 d ban</p>
                  <p className="text-slate-300">• fourth hit – wipe of gear or base plus ban length chosen by staff</p>
                  <p className="text-red-300">• any extreme offense can be an instant permaban</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PvE Gameplay */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-slate-200">
                <Shield className="h-5 w-5 text-emerald-400" />
                PvE Gameplay
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.1</span> Turrets and mines must stay inside your walls, and walls must be completely closed for them to be allowed.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.2</span> No base raiding, no intentional player killing. Turrets may kill intruders, attack at your own risk.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.3</span> Do not unlock or destroy another player's door.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.4</span> Chests outside a locked-door room are free loot. Want safety? Put them behind a door AND LOCK IT.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.5</span> Do not leave items scattered on a trader's floor. Clean up or the staff will.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.6</span> You may move, return or steal a dead player's gear. Fair game.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-emerald-300">2.7</span> Combat logging is forbidden. Logging off or relogging to avoid death, combat, or AI pursuit is considered exploit abuse.</p>
            </CardContent>
          </Card>

          {/* Vehicles */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-slate-200">
                <Car className="h-5 w-5 text-purple-400" />
                Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.1</span> Each player may own one motorized land vehicle and one motorized water vehicle. Squads with 2+ players get one additional ground vehicle.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.2</span> Locked vehicles are sacred if doors are closed. Any attempt to steal or tamper with one is bannable.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.3</span> Vehicles left unused for 7 days despawn automatically.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.4</span> Logging out with a vehicle inside a trader zone is forbidden.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-purple-300">3.5</span> The server does not reimburse vehicles lost to glitches, accidents or explosions. Park wisely!</p>
            </CardContent>
          </Card>

          {/* Building */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-slate-200">
                <Building className="h-5 w-5 text-orange-400" />
                Building
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-300 text-sm"><span className="font-semibold text-orange-300">4.1</span> One flag per player, maximum 300 build parts per flag.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-orange-300">4.2</span> Prefab structures are allowed. No percentage cap, but do not block loot spawns, mission POIs or roads.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-orange-300">4.3</span> No floating pieces, honeycomb spam or other exploit builds.</p>
              <p className="text-slate-300 text-sm"><span className="font-semibold text-orange-300">4.4</span> The game already enforces terrain limits. Staff may delete illegal structures without warning.</p>
            </CardContent>
          </Card>
        </div>

        {/* Support */}
        <Card className="mb-8 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-slate-200">
              <HelpCircle className="h-6 w-6 text-cyan-400" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-slate-300"><span className="font-semibold text-cyan-300">5.1</span> Stuck in terrain or found a locked spawn vehicle? Open a support ticket on Discord and include video or screenshots.</p>
            <p className="text-slate-300"><span className="font-semibold text-cyan-300">5.2</span> Bug reports and evidence of rule breaks also go through the ticket system.</p>
            <p className="text-slate-300"><span className="font-semibold text-cyan-300">5.3</span> Staff volunteers work in their free time. Be patient and polite.</p>
          </CardContent>
        </Card>

        {/* Penalty Matrix */}
        <Card className="mb-8 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-slate-200">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              Penalty Matrix
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
                          {penalty.type}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-slate-300 text-sm mb-1">
                            <strong>Examples:</strong> {penalty.example}
                          </p>
                          <p className="text-slate-200 text-sm">
                            <strong>Action:</strong> {penalty.action}
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
                <strong>Note:</strong> Staff may escalate any case if damage to gameplay or community is high.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Closing Message */}
        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-400/20 backdrop-blur-sm text-center">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-200 mb-4">
              Welcome to Sentience AI
            </h3>
            <p className="text-slate-300 mb-4">
              Enjoy the challenge, respect your fellow survivors, and the AI will do the rest.
            </p>
            <Button
              onClick={() => window.open('https://discord.gg/7xY9s6HH7J', '_blank')}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400 text-emerald-300"
              variant="outline"
            >
              Join Our Discord Community
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServerRules;
